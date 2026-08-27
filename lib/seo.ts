import type { Metadata } from "next";
import { content } from "@/lib/content";

const fallbackSiteUrl = "https://elmentortrader.com";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || fallbackSiteUrl;

export const seo = {
  title: "El Mentor Trader | Curso de Opções Binárias + Sala de Sinais",
  titleTemplate: "%s | El Mentor Trader",
  description:
    "Formação completa em Opções Binárias com El Mentor Trader: método do zero ao lucro, gestão de risco, mindset e sala de sinais ao vivo para operar com consistência.",
  keywords: [
    "El Mentor Trader",
    "curso opções binárias",
    "sala de sinais",
    "trading",
    "opções binárias",
    "curso de trading",
    "sinais ao vivo",
    "gestão financeira trading",
  ],
  ogImage: "/images/mentor-shiver-glow.png",
  locale: "pt_BR",
} as const;

export function buildMetadata(): Metadata {
  const { brand } = content;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.title,
      template: seo.titleTemplate,
    },
    description: seo.description,
    keywords: [...seo.keywords],
    applicationName: brand.name,
    authors: [{ name: brand.name }],
    creator: brand.name,
    publisher: brand.name,
    category: "education",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: seo.locale,
      url: siteUrl,
      siteName: brand.name,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: seo.ogImage,
          width: 1024,
          height: 1536,
          alt: `${brand.name} — formação em opções binárias`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
  };
}

export function buildJsonLd() {
  const { brand, modules, mentor, footer } = content;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: brand.name,
        url: siteUrl,
        logo: `${siteUrl}/images/mentor-shiver-glow.png`,
        description: seo.description,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: brand.name,
        description: seo.description,
        inLanguage: "pt-BR",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#course` },
        inLanguage: "pt-BR",
      },
      {
        "@type": "Course",
        "@id": `${siteUrl}/#course`,
        name: "Formação completa em Opções Binárias",
        description: modules.description,
        provider: {
          "@type": "Person",
          name: mentor.name,
          description: mentor.bio,
        },
        educationalLevel: "Beginner to Advanced",
        inLanguage: "pt-BR",
        teaches: modules.items.map((item) => item.title),
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#mentor`,
        name: mentor.name,
        description: mentor.bio,
        jobTitle: "Trader e mentor de Opções Binárias",
        image: `${siteUrl}${mentor.image}`,
      },
      {
        "@type": "WebPageElement",
        name: "Aviso de risco",
        text: footer.riskWarning,
      },
    ],
  };
}
