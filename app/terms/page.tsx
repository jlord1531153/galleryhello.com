import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/article-layout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use Gallery Hello — how the site works, the nature of its AI-generated content, copyright and fair use, external links, and disclaimers.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <ArticleLayout
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="November 22, 2026"
    >
      <p>
        These terms govern your use of{" "}
        <strong>galleryhello.com</strong> (the &quot;Site&quot;). By browsing the
        Site you agree to them. If you do not agree, please stop using the
        Site.
      </p>

      <h2>What the Site Is</h2>
      <p>
        Gallery Hello is a free, public, read-only gallery of curated visual
        collections. You can browse the catalogue, open collection pages and
        view the publicly published preview images. There is currently no
        account system, no paid access, no subscription, and no unlock or
        offerwall mechanism on the Site.
      </p>

      <h2>AI-Generated Content</h2>
      <p>
        All imagery published on the Site is AI-generated content created for
        demonstration purposes. The images do not depict real people and do
        not represent the appearance, likeness or work of any actual
        individual. Any resemblance to real persons, places or artworks is
        coincidental.
      </p>
      <p>
        Descriptions, titles and written introductions to each collection are
        editorial text written for the Site.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        The Site&apos;s design, layout, written content, collection
        introductions and the AI-generated imagery published on it are owned
        by the Site operator and protected by applicable intellectual property
        laws. The names and logos of any third-party tools or models used in
        the creation process remain the property of their respective owners.
      </p>

      <h3>Fair Use and Limited Use</h3>
      <p>
        You may view the Site and its content for personal, non-commercial use.
        You may not:
      </p>
      <ul>
        <li>
          Republish, redistribute or resell the Site&apos;s content without
          written permission.
        </li>
        <li>
          Scrape, mirror or systematically copy the catalogue for the purpose
          of republishing it.
        </li>
        <li>
          Present the Site&apos;s content as your own or imply endorsement by
          the Site operator.
        </li>
        <li>
          Use automated systems to place a disproportionate load on the Site
          or interfere with other visitors&apos; access to it.
        </li>
      </ul>
      <p>
        If you would like to use the content in a way not listed above, ask
        for permission first.
      </p>

      <h2>External Links</h2>
      <p>
        The Site may from time to time link to third-party websites or
        resources. These links are provided for convenience and reference
        only. The Site operator does not control, endorse, or accept
        responsibility for the content, privacy practices, availability, or
        accuracy of any third-party site. Following an external link is at
        your own risk.
      </p>

      <h2>Acceptable Use</h2>
      <p>
        You agree not to use the Site in a way that breaks the law, infringes
        the rights of others, interferes with the Site&apos;s operation, or
        attempts to gain unauthorised access to any part of the Site or its
        underlying infrastructure.
      </p>

      <h2>Disclaimer of Warranties</h2>
      <p>
        The Site is provided on an &quot;as is&quot; and &quot;as available&quot;
        basis. The Site operator makes no warranties of any kind, express or
        implied, regarding the Site or its content — including any implied
        warranties of merchantability, fitness for a particular purpose, or
        non-infringement. The Site operator does not warrant that the Site
        will be available, uninterrupted, or free of error, nor that any
        content will be accurate or complete.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, the Site operator shall not be
        liable for any indirect, incidental, special, consequential or
        punitive damages, or any loss of profits, data, goodwill or other
        intangible losses, arising out of or in connection with your use of
        the Site or inability to use the Site.
      </p>

      <h2>Indemnity</h2>
      <p>
        You agree to indemnify and hold harmless the Site operator from any
        claim or demand, including reasonable legal fees, arising out of your
        use of the Site or your breach of these terms.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        These terms may be updated as the Site changes. The &quot;Last
        updated&quot; date at the top of this page reflects the most recent
        revision. Continuing to browse the Site after a change means you
        accept the updated terms.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws applicable at the Site
        operator&apos;s place of residence, without regard to conflict-of-law
        provisions.
      </p>

      <h2>Contact</h2>
      <p>
        A contact address will be published on this page once it is
        confirmed. If you have a question about these terms in the meantime,
        you can find the site owner&apos;s contact details on the{" "}
        <a href="/about">About page</a>.
      </p>
    </ArticleLayout>
  );
}
