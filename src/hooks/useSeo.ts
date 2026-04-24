import { useEffect } from "react";

type SeoOptions = {
  title: string;
  description?: string;
  canonical?: string; // path or absolute URL
  image?: string; // absolute URL preferred
  type?: "website" | "article";
};

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attrs).forEach(([k, v]) => {
      if (k !== "content") el!.setAttribute(k, v);
    });
    document.head.appendChild(el);
  }
  if (attrs.content) el.setAttribute("content", attrs.content);
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Lightweight SEO hook: title, description, canonical, OG, Twitter.
 * Keep titles < 60 chars and descriptions < 160 chars.
 */
export const useSeo = ({ title, description, canonical, image, type = "website" }: SeoOptions) => {
  useEffect(() => {
    document.title = title.length > 60 ? `${title.slice(0, 57)}...` : title;

    if (description) {
      const desc = description.length > 160 ? `${description.slice(0, 157)}...` : description;
      upsertMeta('meta[name="description"]', { name: "description", content: desc });
      upsertMeta('meta[property="og:description"]', { property: "og:description", content: desc });
      upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: desc });
    }

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    if (canonical) {
      const href = canonical.startsWith("http") ? canonical : `${origin}${canonical}`;
      upsertLink("canonical", href);
      upsertMeta('meta[property="og:url"]', { property: "og:url", content: href });
    }

    if (image) {
      const imgHref = image.startsWith("http") ? image : `${origin}${image}`;
      upsertMeta('meta[property="og:image"]', { property: "og:image", content: imgHref });
      upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imgHref });
    }
  }, [title, description, canonical, image, type]);
};
