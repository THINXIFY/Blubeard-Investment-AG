import { legalNotice } from "@/content/legal";
import { legalMetadata } from "@/components/legal/LegalPage";
import { ImpressumPage } from "@/components/legal/ImpressumPage";

export const metadata = legalMetadata(legalNotice);

export default function Page() {
  return <ImpressumPage />;
}
