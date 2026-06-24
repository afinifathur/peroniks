import type { Metadata } from "next";
import { MillCertificateClient } from "./mill-certificate-client";

export const metadata: Metadata = {
  title: "Mill Certificate Verification | PERONIKS",
  description: "Verify material authenticity using Heat Number traceability and MTC 3.1 certification records.",
  alternates: { canonical: "/mill-certificate" },
};

export const dynamic = "force-static";

export default function MillCertificatePage() {
  return <MillCertificateClient />;
}
