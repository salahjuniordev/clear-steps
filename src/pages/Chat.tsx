import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Send, Sparkles, MessageCircle, AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    document.title = "Chatbot santé AI · AfyaPulse";
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
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

  return (
    <main id="main" className="min-h-screen bg-hero">
      <div className="container-tight py-10 sm:py-14">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-primary transition-smooth">
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </Link>
          {messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clear} aria-label="Effacer la conversation">
              <Trash2 className="h-4 w-4" /> Nouvelle conversation
            </Button>
          )}
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
                  <li
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
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

          {/* Composer */}
          <form onSubmit={handleSubmit} className="mt-5">
            <label htmlFor="chat-input" className="sr-only">Pose ta question santé</label>
            <div className="flex gap-2 items-end rounded-2xl bg-card ring-1 ring-border p-2 shadow-soft focus-within:ring-primary transition-smooth">
              <Textarea
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Décris tes symptômes ou pose une question santé…"
                rows={1}
                className="flex-1 border-0 bg-transparent resize-none min-h-[44px] max-h-40 focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={isLoading}
                aria-label="Message à l'assistant"
              />
              <Button
                type="submit"
                variant="hero"
                size="icon"
                disabled={isLoading || !input.trim()}
                aria-label="Envoyer le message"
                className="h-11 w-11 shrink-0"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <p className="mt-2 text-xs text-foreground/50 text-center">
              Entrée pour envoyer · Maj+Entrée pour saut de ligne
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Chat;
