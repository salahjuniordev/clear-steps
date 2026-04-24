import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2, ArrowRight, BookOpen, AlertTriangle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  getArticleBySlug,
  getRelatedArticles,
  type ArticleCategory,
} from "@/data/articles";
import { useLanguage, type Lang } from "@/i18n/LanguageContext";

const categoryColor = (cat: ArticleCategory) => {
  switch (cat) {
    case "Alerte": return "bg-warning/10 text-warning ring-warning/20";
    case "Prévention": return "bg-primary/10 text-primary ring-primary/20";
    case "Nutrition": return "bg-success/10 text-success ring-success/20";
    case "Témoignage": return "bg-accent/10 text-accent ring-accent/20";
    case "Recherche": return "bg-info/10 text-info ring-info/20";
  }
};

const formatDateLocale = (iso: string, lang: Lang) =>
  new Date(iso).toLocaleDateString(lang === "FR" ? "fr-FR" : "en-US", {
    day: "numeric", month: "long", year: "numeric",
  });

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useLanguage();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (article) {
      document.title = `${article.title} · AfyaPulse`;
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    } else {
      document.title = `${t("article.notFound")} · AfyaPulse`;
    }
  }, [article, t]);

  if (!article) {
    return (
      <main id="main" className="min-h-screen bg-hero">
        <div className="container-tight py-20 text-center">
          <h1 className="text-3xl font-bold text-primary">{t("article.notFound")}</h1>
          <p className="mt-3 text-foreground/70">{t("article.notFoundText")}</p>
          <Button asChild variant="hero" className="mt-6">
            <Link to="/blog">{t("article.back")}</Link>
          </Button>
        </div>
      </main>
    );
  }

  const related = getRelatedArticles(article);

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.excerpt,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({ title: t("article.linkCopied"), description: t("article.linkCopiedDesc") });
      }
    } catch {
      // user cancelled
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    inLanguage: lang === "FR" ? "fr" : "en",
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: "AfyaPulse" },
    keywords: article.tags.join(", "),
  };

  return (
    <main id="main" className="min-h-screen bg-hero">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="container-tight py-10 sm:py-14">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-primary transition-smooth"
        >
          <ArrowLeft className="h-4 w-4" /> {t("article.back")}
        </Link>

        <header className="mt-8 max-w-3xl mx-auto text-center">
          <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${categoryColor(article.category)}`}>
            {t(`cat.${article.category}`)}
          </span>
          <h1 className="mt-5 text-3xl sm:text-5xl font-bold text-primary leading-[1.1]">
            {article.title}
          </h1>
          <p className="mt-5 text-lg text-foreground/70 leading-relaxed">{article.excerpt}</p>
          <div className="mt-7 flex items-center justify-center gap-5 text-sm text-foreground/60 flex-wrap">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatDateLocale(article.publishedAt, lang)}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {article.readMinutes} {t("article.minRead")}</span>
            {article.region && (
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {article.region}</span>
            )}
          </div>
        </header>

        <div className="mt-10 max-w-4xl mx-auto aspect-[21/9] rounded-3xl relative overflow-hidden ring-1 ring-border shadow-elevated bg-secondary">
          <img
            src={article.cover}
            alt={article.title}
            loading="eager"
            width={1280}
            height={800}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" aria-hidden />
        </div>

        <div className="mt-8 max-w-2xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-gradient text-primary-foreground font-bold">
              {article.author.split(" ").map((p) => p[0]).slice(0, 2).join("")}
            </span>
            <div>
              <div className="text-sm font-semibold text-primary">{article.author}</div>
              {article.authorRole && <div className="text-xs text-foreground/60">{article.authorRole}</div>}
            </div>
          </div>
          <Button onClick={handleShare} variant="soft" size="sm" aria-label={t("article.shareAria")}>
            <Share2 className="h-4 w-4" /> {t("article.share")}
          </Button>
        </div>

        <div className="mt-10 max-w-2xl mx-auto">
          {article.content.map((block, i) => {
            if (block.type === "h2") {
              return <h2 key={i} className="mt-10 mb-4 text-2xl sm:text-3xl font-bold text-primary leading-tight">{block.text}</h2>;
            }
            if (block.type === "h3") {
              return <h3 key={i} className="mt-8 mb-3 text-xl font-semibold text-primary">{block.text}</h3>;
            }
            if (block.type === "quote") {
              return (
                <blockquote key={i} className="my-8 border-l-4 border-primary-glow bg-secondary/40 rounded-r-2xl p-6 text-lg italic text-primary leading-relaxed">
                  « {block.text} »
                </blockquote>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="my-5 space-y-2.5">
                  {block.items?.map((item, j) => (
                    <li key={j} className="flex gap-3 text-foreground/80 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-glow shrink-0" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return <p key={i} className="my-5 text-foreground/80 leading-relaxed text-[1.05rem]">{block.text}</p>;
          })}

          <div className="mt-12 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/10">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-warning/10 ring-1 ring-warning/20 p-5 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" aria-hidden />
            <p className="text-sm text-foreground/80">{t("article.disclaimer")}</p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-tight pb-20">
          <div className="border-t border-border pt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">{t("article.related")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.slug}`}
                  className="group rounded-2xl bg-card ring-1 ring-border shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-smooth overflow-hidden block"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-secondary">
                    <img
                      src={a.cover}
                      alt={a.title}
                      loading="lazy"
                      width={1280}
                      height={800}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-3 left-3 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 backdrop-blur bg-card/90 ${categoryColor(a.category)}`}>
                      {t(`cat.${a.category}`)}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-primary leading-snug group-hover:text-primary-glow transition-smooth">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-xs text-foreground/60 inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {a.readMinutes} {t("article.minRead")} · {formatDateLocale(a.publishedAt, lang)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button asChild variant="soft" size="lg">
                <Link to="/blog">{t("article.allArticles")} <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogArticle;
