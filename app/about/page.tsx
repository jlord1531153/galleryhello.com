import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/article-layout";
import { getCategories } from "@/lib/collections";
import { getContactEmail } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Gallery Hello",
  description:
    "Gallery Hello is a curated gallery of AI portraits — sweet & sultry, office, qipao and JK fashion. Learn what you'll find, how we curate, and how to get in touch.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const contactEmail = getContactEmail();
  const categories = getCategories();

  return (
    <ArticleLayout eyebrow="About" title="About Gallery Hello">
      <p>
        Gallery Hello is a curated gallery of AI portraits. We collect finished
        collections around a single visual idea — a lighting approach, a
        styling direction, a colour story — and present them as something
        worth spending time with.
      </p>
      <p>
        Every image published on this site is{" "}
        <strong>AI-generated content</strong> created for demonstration
        purposes. Nothing here is a photograph of a real person, and no image
        depicts a real individual.
      </p>

      <h2>What You&apos;ll Find</h2>
      <p>
        The catalogue is organised into a small number of categories, each
        with its own visual logic:
      </p>
      <ul>
        {categories.map((category) => (
          <li key={category.key}>
            <strong>{category.label}</strong> — {category.description}
          </li>
        ))}
      </ul>

      <h2>Our Approach</h2>
      <p>
        We keep the catalogue deliberately small. Rather than publishing
        everything that comes through, we select a limited number of
        collections each month and present them with a short written
        introduction, a public preview, and enough context to understand the
        intent behind the set.
      </p>
      <p>
        Each collection is published as a complete unit — a cover, a set of
        public preview images, and a description of the direction — so that
        browsing stays focused on the work itself rather than on volume.
      </p>

      <h2>Get in Touch</h2>
      {contactEmail ? (
        <p>
          Questions, feedback or a collection you would like us to look at? We
          read every message. You can reach us at{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      ) : (
        <p>
          A contact address will be published here once it is confirmed. In
          the meantime, every page on the site remains fully browsable.
        </p>
      )}
    </ArticleLayout>
  );
}
