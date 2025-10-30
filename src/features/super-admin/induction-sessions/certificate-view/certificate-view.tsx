"use client";

import { CertificateTemplate } from "@/components/certificate/certificate-template";
import { Button } from "@/components/ui/button";

import { useFetchById } from "@/features/super-admin/induction-sessions/hooks/crud";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import domtoimage from "@intactile/dom-to-image-next";
import { useParams } from "next/navigation";
import { useRef } from "react";

export function CertificateView() {
  const { id } = useParams<{ id: string }>();
  const {
    data: session,
    error,
    refetch,
    isLoading,
    isFetched,
  } = useFetchById(id);

  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certificateRef.current || !session) return;
    try {
      const jpegData = await domtoimage.toSvg(certificateRef.current, {});
      const link = document.createElement("a");
      link.download = `certificate_of_induction_${session.induction_title}_${session.first_name}_${session.last_name}`;
      link.href = jpegData;
      link.click();
    } catch (err) {
      console.error("Error generating certificate image:", err);
    }
  };

  return (
    <div className="w-full  ">
      {isLoading && (
        <div className="text-center text-neutral-700 dark:text-neutral-300 py-20">
          Loading certificate...
        </div>
      )}

      {error && (
        <div className="text-center space-y-6 py-10">
          <h2 className="text-xl font-semibold ">Error Loading Certificate</h2>
          <p className="dark:text-neutral-300">
            {"Something went wrong while fetching the certificate."}
          </p>
          <Button variant="outline" onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      )}

      {isFetched && !session && (
        <div className="text-center space-y-4 py-10">
          <h2 className="text-xl font-semibold">Certificate Not Found</h2>
          <p className="dark:text-neutral-300">
            The certificate you are trying to view could not be found. <br />
            It may have been removed or is not yet available.
          </p>
        </div>
      )}

      {isFetched && session?.has_valid_induction === false && (
        <div className="text-center space-y-4 py-10">
          <h2 className="text-xl font-semibold ">Certificate Not Available</h2>
          <p className="dark:text-neutral-300">
            This user did not pass the assessment, so no certificate is
            available.
          </p>
        </div>
      )}

      {isFetched && session?.has_valid_induction === true && (
        <div className="flex flex-col items-center justify-center">
          <CertificateTemplate ref={certificateRef} session={session} />

          <div className="w-full max-w-2xl">
            <Button
              onClick={handleDownload}
              variant="outline"
              className="mt-5 w-full no-print"
            >
              Download Certificate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
