import { termsOfUse } from "@/content/legal";
import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";

export const metadata = legalMetadata(termsOfUse);

export default function Page() {
  return <LegalPage doc={termsOfUse} />;
}
