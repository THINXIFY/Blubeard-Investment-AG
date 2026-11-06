import { site } from "@/lib/site";

/** Copy for the Request Private Documents feature. */
export const documentsRequest = {
  button: "Request Private Documents",
  panel: {
    eyebrow: "Private Documents",
    heading: "Documents, on Verified Request.",
    description: `Verify your email address with a one-time code and we will send ${site.name}’s documents directly to your inbox.`,
    note: "One-time code · Delivered by email",
  },
  dialog: {
    eyebrow: "Private Documents",
    steps: [
      { title: "Verify email", short: "Verify email" },
      { title: "Enter code", short: "Enter code" },
      { title: "Receive documents", short: "Documents" },
    ],
    assurances: ["One-time code", "Sent only to your verified address", "Delivered as PDF"],
    privacy: "Your email address is used only to verify this request and deliver the documents.",
  },
} as const;
