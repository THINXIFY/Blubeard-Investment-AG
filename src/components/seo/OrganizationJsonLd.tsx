import { site } from "@/lib/site";

/** schema.org Organization — verified company facts only. */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    identifier: { "@type": "PropertyValue", propertyID: "UID", value: site.registry.uid },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
  };

  return (
    <script
      type="application/ld+json"
      // Static values we control; "<" is escaped to keep the script block safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
