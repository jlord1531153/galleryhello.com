import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/article-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Gallery Hello handles information when you browse the site — the data this site actually collects, the cookies it actually sets, and how to contact us.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <ArticleLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="November 22, 2026"
    >
      <p>
        This policy explains what information Gallery Hello collects when you
        visit{" "}
        <strong>galleryhello.com</strong>, what we do with it, and what we do
        not do with it. It is written to match the site as it actually
        operates today.
      </p>

      <h2>Summary</h2>
      <p>
        Gallery Hello is a read-only, public gallery. There are no accounts, no
        login, no payments, no unlock mechanism, and no comment or submission
        forms. We do not ask you to create an account, and we do not ask for
        personal information in order to browse the site.
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you visit the site, our hosting and network providers record
        standard technical request data in server logs. This typically
        includes:
      </p>
      <ul>
        <li>Your IP address</li>
        <li>The date and time of the request</li>
        <li>The page or resource that was requested</li>
        <li>The referring page and browser type</li>
      </ul>
      <p>
        This data is used for operational purposes only — serving pages,
        preventing abuse, and diagnosing faults. We do not use it to build
        advertising profiles.
      </p>

      <h2>Cookies and Local Storage</h2>
      <p>
        The site does not set advertising cookies, does not run third-party
        advertising trackers, and does not use behavioural analytics. The
        pages you browse are readable without accepting anything.
      </p>
      <p>
        If you use the category filter on the Explore page, the selected
        category is reflected in the page URL. This is a normal browser
        address rather than a stored cookie, and clearing it changes nothing
        about your access to the site.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        Fonts and images are served from infrastructure operated by our
        hosting and content-delivery providers. As with any website, the
        provider of that infrastructure processes technical request data such
        as your IP address in order to deliver the files to you.
      </p>
      <p>
        We do not embed third-party advertising, social media widgets, or
        tracking pixels on this site.
      </p>

      <h2>AI-Generated Content</h2>
      <p>
        All imagery published on Gallery Hello is AI-generated. The images do
        not depict real people, and no personal data was used to create them.
        Because the content is synthetic, it does not collect or expose any
        information about the individuals it depicts.
      </p>

      <h2>Personal Information We Do Not Hold</h2>
      <p>
        Because there is no account system, no checkout, no unlock flow and no
        mailing list on this site, we do not hold your name, email address,
        payment details, purchase history, or any unlock or task-completion
        records.
      </p>

      <h2>Children</h2>
      <p>
        The site is a general-audience gallery and is not directed at children
        under 13. We do not knowingly collect personal information from
        children.
      </p>

      <h2>Your Rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct
        or delete personal information held about you. Because we do not
        operate accounts or collect personal information through the site
        itself, there is generally no personal data connected to your visit.
        Technical request data held in server logs is retained only for a
        limited period for security and operational purposes.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        If the site gains features that collect information — for example
        accounts or an unlock service — this policy will be updated before
        that feature goes live, and the &quot;Last updated&quot; date at the top
        of this page will change.
      </p>

      <h2>Contact</h2>
      <p>
        A contact address will be published on this page once it is
        confirmed. If you have a privacy question in the meantime, you can
        find the site owner&apos;s contact details on the{" "}
        <a href="/about">About page</a>.
      </p>
    </ArticleLayout>
  );
}
