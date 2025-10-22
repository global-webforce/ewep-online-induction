"use client";

import { Button } from "@/components/ui/button";

import { useFetchById } from "@/features/user/induction-sessions/hooks/crud";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import domtoimage from "@intactile/dom-to-image-next";
import { useQRCode } from "next-qrcode";
import { useParams } from "next/navigation";
import { useRef } from "react";

export function CertificateView() {
  const { id } = useParams<{ id: string }>();
  const { data: session, error, refetch, isLoading } = useFetchById(id);

  const certificateRef = useRef<HTMLDivElement>(null);
  const { SVG } = useQRCode();

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
    <div className="w-full max-w-xl rounded-2xl ">
      {/* === Loading === */}
      {isLoading && (
        <div className="text-center text-neutral-700 dark:text-neutral-300 py-20">
          Loading certificate...
        </div>
      )}

      {/* === Error === */}
      {!isLoading && error && (
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

      {/* === Not Found === */}
      {!isLoading && !error && !session && (
        <div className="text-center space-y-4 py-10">
          <h2 className="text-xl font-semibold">Certificate Not Found</h2>
          <p className="dark:text-neutral-300">
            The certificate you are trying to view could not be found. It may
            have been removed or is not yet available.
          </p>
        </div>
      )}

      {/* === Failed === */}
      {!isLoading && !error && session?.has_passed === false && (
        <div className="text-center space-y-4 py-10">
          <h2 className="text-xl font-semibold text-red-600">
            Certificate Not Available
          </h2>
          <p className="dark:text-neutral-300">
            This user did not pass the induction, so no certificate is
            available.
          </p>
        </div>
      )}

      {/* === Valid / Expired Certificate === */}
      {!isLoading && !error && session && session.has_passed === true && (
        <>
          <div className="p-4 bg-white" ref={certificateRef}>
            <div
              className={`relative border-2 border-dashed p-5 transition-all bg-white text-black shadow-inner ${
                session.is_expired
                  ? "opacity-70 grayscale border-neutral-400"
                  : "border-black"
              }`}
            >
              <div className="relative flex flex-col sm:flex-row justify-between">
                {/* Header (logo) */}
                <img
                  src="/app-logo.webp"
                  alt="Company logo"
                  width={220}
                  className="object-contain"
                />

                {/* QR Code */}
                <div className="md:absolute my-4 md:m-0 md:top-0 md:right-0">
                  <SVG
                    text={`${process.env.NEXT_PUBLIC_BASE_URL}/certificate/${session.id}`}
                    options={{
                      errorCorrectionLevel: "M",
                      width: 115,
                      margin: 0,
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col md:flex-row gap-4 mt-0 md:mt-6">
                <div className="flex-1 space-y-3">
                  <h1 className="text-2xl font-bold">
                    Certificate of Induction
                  </h1>
                  <p className="text-sm leading-relaxed">
                    This certifies that{" "}
                    <span className="font-semibold">
                      ${session.first_name} ${session.last_name}
                    </span>
                    has successfully completed the{" "}
                    <span className="font-semibold">
                      {session.induction_title}
                    </span>{" "}
                    and understands the information provided.
                  </p>
                  {session.valid_until && (
                    <p className="text-sm">
                      Due for renewal on:{" "}
                      <span className="font-semibold">
                        {session.valid_until}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <p className="text-xs font-semibold text-green-900 bg-green-50 p-2 rounded text-center mt-4">
                THIS CARD MUST BE SHOWN ON SITE
              </p>

              {/* Footer */}
              <div className="border-t border-neutral-200 mt-4 pt-4">
                <p className="text-xs mb-3">
                  I acknowledge that I have read and understood the{" "}
                  {session.induction_title} and agree to follow its policies.
                </p>

                <div className="mt-4">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="font-semibold">Signature:</span>
                    <span className="font-semibold">
                      Date: {session.created_at}
                    </span>
                  </div>
                  <div className="border-b border-black w-full mt-6"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Download / Expired Notice */}
          {session.has_valid_induction ? (
            <Button
              onClick={handleDownload}
              variant="outline"
              className="mt-5 w-full no-print"
            >
              Download Certificate
            </Button>
          ) : (
            <p className="text-center text-red-600 dark:text-red-400 font-medium mt-5">
              This certificate has expired and cannot be downloaded.
            </p>
          )}
        </>
      )}
    </div>
  );
}
