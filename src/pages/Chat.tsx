import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import jsPDF from "jspdf";
import {
  ArrowLeft,
  Send,
  Sparkles,
  MessageCircle,
  AlertTriangle,
  Loader2,
  Trash2,
  Mic,
  MicOff,
  Square,
  Pencil,
  Download,
  FileText,
  FileDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const STORAGE_KEY = "afyapulse_chat_history";

const suggestions = [
  "Quels sont les symptômes du paludisme ?",
  "Comment prévenir le choléra à Douala ?",
  "Que faire en cas de forte fièvre chez un enfant ?",
  "Différence entre typhoïde et paludisme ?",
];

// Web Speech API typings (browser-provided)
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

const getSpeechRecognition = (): (new () => SpeechRecognitionLike) | null => {
  if (typeof window === "undefined") return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
};

const Welcome = ({ onPick }: { onPick: (s: string) => void }) => (
  <div className="text-center max-w-2xl mx-auto py-10">
    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-gradient text-primary-foreground mx-auto shadow-elevated">
      <Sparkles className="h-7 w-7" />
    </span>
    <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-primary">
      Bonjour 👋 Je suis ton assistant santé.
    </h2>
    <p className="mt-3 text-foreground/70">
      Pose-moi une question sur les symptômes, la prévention ou les maladies courantes en Afrique francophone.
    </p>
    <div className="mt-8 grid sm:grid-cols-2 gap-3 text-left">
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onPick(s)}
          className="rounded-xl bg-card ring-1 ring-border p-4 text-sm text-foreground/80 hover:ring-primary hover:shadow-soft hover:-translate-y-0.5 transition-smooth"
        >
          {s}
        </button>
      ))}
    </div>
  </div>
);

const Chat = () => {
  const [messages, setMessages] = useState<Msg[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Msg[]) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const interimBaseRef = useRef<string>("");

  useEffect(() => {
    document.title = "Chatbot santé AI · AfyaPulse";
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => () => {
    abortRef.current?.abort();
    recognitionRef.current?.stop();
  }, []);

  /** Send a message. If `historyOverride` is provided, replaces conversation history before sending. */
  const send = async (text: string, historyOverride?: Msg[]) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const baseHistory = historyOverride ?? messages;
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...baseHistory, userMsg];
    setMessages(next);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) {
          toast({ title: "Trop de requêtes", description: "Patiente quelques secondes puis réessaie.", variant: "destructive" });
        } else if (resp.status === 402) {
          toast({ title: "Crédits AI épuisés", description: "Ajoute des crédits dans Settings → Workspace → Usage.", variant: "destructive" });
        } else {
          toast({ title: "Erreur", description: "Impossible de joindre l'assistant.", variant: "destructive" });
        }
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, nl);
          textBuffer = textBuffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            streamDone = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error(err);
        toast({ title: "Erreur réseau", description: "Vérifie ta connexion et réessaie.", variant: "destructive" });
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const clear = () => {
    abortRef.current?.abort();
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  /** Stop streaming response — keeps whatever has been received so far. */
  const stopStreaming = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
    toast({ title: "Réponse interrompue", description: "Le texte partiel a été conservé." });
  };

  /** Edit & resend last user message: removes last user + assistant pair, refills input. */
  const editLastUser = () => {
    if (isLoading) {
      toast({ title: "Patiente", description: "Attends la fin de la réponse ou clique sur Stop." });
      return;
    }
    let lastUserIdx = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "user") { lastUserIdx = i; break; }
    }
    if (lastUserIdx === -1) return;
    const lastUserContent = messages[lastUserIdx].content;
    setMessages(messages.slice(0, lastUserIdx));
    setInput(lastUserContent);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(lastUserContent.length, lastUserContent.length);
    });
  };

  /** Toggle voice dictation using the browser's free Web Speech API (FR-FR). */
  const toggleMic = () => {
    const SR = getSpeechRecognition();
    if (!SR) {
      toast({
        title: "Dictée non supportée",
        description: "Ton navigateur ne supporte pas la reconnaissance vocale. Essaie Chrome ou Edge.",
        variant: "destructive",
      });
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }
    try {
      const recognition = new SR();
      recognition.lang = "fr-FR";
      recognition.interimResults = true;
      recognition.continuous = true;
      interimBaseRef.current = input ? input.trimEnd() + " " : "";

      recognition.onresult = (event: any) => {
        let finalText = "";
        let interimText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalText += transcript;
          else interimText += transcript;
        }
        if (finalText) {
          interimBaseRef.current = (interimBaseRef.current + finalText).replace(/\s+/g, " ");
        }
        setInput((interimBaseRef.current + interimText).trimStart());
      };
      recognition.onerror = (e: any) => {
        console.error("Speech recognition error", e);
        if (e?.error === "not-allowed") {
          toast({ title: "Microphone bloqué", description: "Autorise l'accès au micro dans ton navigateur.", variant: "destructive" });
        } else if (e?.error !== "aborted" && e?.error !== "no-speech") {
          toast({ title: "Erreur de dictée", description: e?.error ?? "Réessaie.", variant: "destructive" });
        }
      };
      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };
      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
      inputRef.current?.focus();
    } catch (err) {
      console.error(err);
      toast({ title: "Impossible de démarrer la dictée", variant: "destructive" });
    }
  };

  /** Export conversation as TXT or PDF. */
  const buildPlainText = () => {
    const date = new Date().toLocaleString("fr-FR");
    const header = `AfyaPulse — Conversation avec l'assistant santé\n${date}\n${"=".repeat(60)}\n\n`;
    const body = messages
      .map((m) => `${m.role === "user" ? "Toi" : "Assistant"} :\n${m.content}\n`)
      .join("\n" + "-".repeat(40) + "\n\n");
    const footer = `\n\n${"=".repeat(60)}\nRappel : ces informations ne remplacent pas un avis médical.\nUrgences SAMU Cameroun : 15 / 999\n`;
    return header + body + footer;
  };

  const exportTxt = () => {
    if (messages.length === 0) {
      toast({ title: "Conversation vide", description: "Pose une question avant d'exporter." });
      return;
    }
    const blob = new Blob([buildPlainText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `afyapulse-conversation-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    if (messages.length === 0) {
      toast({ title: "Conversation vide", description: "Pose une question avant d'exporter." });
      return;
    }
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 48;
    const maxW = pageW - margin * 2;
    let y = margin;

    const ensureSpace = (need: number) => {
      if (y + need > pageH - margin) {
        doc.addPage();
        y = margin;
      }
    };

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(13, 87, 64);
    doc.text("AfyaPulse — Conversation santé", margin, y);
    y += 22;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(new Date().toLocaleString("fr-FR"), margin, y);
    y += 18;
    doc.setDrawColor(220);
    doc.line(margin, y, pageW - margin, y);
    y += 18;

    // Messages
    messages.forEach((m) => {
      const isUser = m.role === "user";
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(isUser ? 13 : 26, isUser ? 87 : 110, isUser ? 64 : 122);
      ensureSpace(18);
      doc.text(isUser ? "Toi" : "Assistant AfyaPulse", margin, y);
      y += 14;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(30);
      const lines = doc.splitTextToSize(m.content || "", maxW);
      lines.forEach((line: string) => {
        ensureSpace(14);
        doc.text(line, margin, y);
        y += 14;
      });
      y += 10;
    });

    // Footer disclaimer
    ensureSpace(40);
    doc.setDrawColor(220);
    doc.line(margin, y, pageW - margin, y);
    y += 14;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(
      "Ces informations ne remplacent pas un avis médical. Urgences SAMU Cameroun : 15 / 999.",
      margin,
      y,
      { maxWidth: maxW },
    );

    doc.save(`afyapulse-conversation-${Date.now()}.pdf`);
  };

  const hasUserMsg = messages.some((m) => m.role === "user");

  return (
    <main id="main" className="min-h-screen bg-hero">
      <div className="container-tight py-10 sm:py-14">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-primary transition-smooth">
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </Link>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" aria-label="Exporter la conversation">
                    <Download className="h-4 w-4" /> Exporter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={exportPdf}>
                    <FileDown className="h-4 w-4 mr-2" /> PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={exportTxt}>
                    <FileText className="h-4 w-4 mr-2" /> TXT
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {messages.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clear} aria-label="Effacer la conversation">
                <Trash2 className="h-4 w-4" /> Nouvelle conversation
              </Button>
            )}
          </div>
        </div>

        <div className="mt-6 max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-primary ring-1 ring-primary/10">
              <MessageCircle className="h-3.5 w-3.5" /> Assistant santé · FR / EN · 24/7
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-primary">Chatbot AfyaPulse</h1>
          </div>

          {/* Disclaimer */}
          <div className="rounded-2xl bg-warning/10 ring-1 ring-warning/20 p-4 flex gap-3 mb-5">
            <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" aria-hidden />
            <p className="text-sm text-foreground/80">
              Cet assistant fournit des informations générales et ne remplace pas un avis médical.
              En cas d'urgence, appelle le <strong className="text-warning">SAMU 15 / 999</strong>.
            </p>
          </div>

          {/* Conversation */}
          <div
            ref={scrollRef}
            className="rounded-3xl bg-card ring-1 ring-border shadow-soft p-5 sm:p-7 min-h-[480px] max-h-[60vh] overflow-y-auto"
            role="log"
            aria-live="polite"
            aria-label="Conversation avec l'assistant santé"
          >
            {messages.length === 0 ? (
              <Welcome onPick={(s) => send(s)} />
            ) : (
              <ul className="space-y-5">
                {messages.map((m, i) => (
                  <li key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary-gradient text-primary-foreground rounded-br-sm"
                          : "bg-secondary text-foreground rounded-bl-sm"
                      }`}
                    >
                      {m.role === "assistant" ? (
                        <div className="prose prose-sm max-w-none prose-headings:text-primary prose-strong:text-primary prose-a:text-primary-glow">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content || "…"}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{m.content}</p>
                      )}
                    </div>
                  </li>
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <li className="flex justify-start">
                    <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3 text-sm flex items-center gap-2 text-foreground/60">
                      <Loader2 className="h-4 w-4 animate-spin" /> L'assistant réfléchit…
                    </div>
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Action row above composer */}
          {hasUserMsg && (
            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={editLastUser}
                disabled={isLoading}
                aria-label="Modifier et renvoyer le dernier message"
              >
                <Pencil className="h-3.5 w-3.5" /> Modifier le dernier message
              </Button>
            </div>
          )}

          {/* Composer */}
          <form onSubmit={handleSubmit} className="mt-3">
            <label htmlFor="chat-input" className="sr-only">Pose ta question santé</label>
            <div
              className={`flex gap-2 items-end rounded-2xl bg-card ring-1 p-2 shadow-soft transition-smooth ${
                isListening ? "ring-warning" : "ring-border focus-within:ring-primary"
              }`}
            >
              <Textarea
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={isListening ? "🎙️ Parle, je t'écoute…" : "Décris tes symptômes ou pose une question santé…"}
                rows={1}
                className="flex-1 border-0 bg-transparent resize-none min-h-[44px] max-h-40 focus-visible:ring-0 focus-visible:ring-offset-0"
                aria-label="Message à l'assistant"
              />

              {/* Mic button */}
              <Button
                type="button"
                variant={isListening ? "destructive" : "soft"}
                size="icon"
                onClick={toggleMic}
                aria-label={isListening ? "Arrêter la dictée vocale" : "Dicter ma question au micro"}
                aria-pressed={isListening}
                className={`h-11 w-11 shrink-0 ${isListening ? "animate-pulse" : ""}`}
                title={isListening ? "Arrêter la dictée" : "Dicter au micro"}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>

              {/* Send / Stop button */}
              {isLoading ? (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={stopStreaming}
                  aria-label="Arrêter la réponse en cours"
                  className="h-11 w-11 shrink-0"
                  title="Stop"
                >
                  <Square className="h-4 w-4 fill-current" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="hero"
                  size="icon"
                  disabled={!input.trim()}
                  aria-label="Envoyer le message"
                  className="h-11 w-11 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
            <p className="mt-2 text-xs text-foreground/50 text-center">
              Entrée pour envoyer · Maj+Entrée pour saut de ligne · 🎙️ Micro pour dicter
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Chat;
