import { privacyPolicy } from "@/content/legal";
import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";

export const metadata = legalMetadata(privacyPolicy);

export default function Page() {
  return <LegalPage doc={privacyPolicy} />;
}
