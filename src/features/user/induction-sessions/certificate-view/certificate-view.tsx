"use client";

import { Button } from "@/components/ui/button";
import { sessionUserViewRowPresenterSchema } from "@/features/types";
import { useFetchById } from "@/features/user/induction-sessions/hooks/crud"; // @ts-ignore
import domtoimage from "@intactile/dom-to-image-next";
import { useQRCode } from "next-qrcode";
import { useParams } from "next/navigation";
import { useRef } from "react";

export function CertificateView() {
  const { id } = useParams<{ id: string }>();
  const { data, error, refetch, isLoading } = useFetchById(id);
  const session = data ? sessionUserViewRowPresenterSchema.parse(data) : null;

  const certificateRef = useRef<HTMLDivElement>(null);
  const { Canvas } = useQRCode();

  const handleDownload = async () => {
    if (!certificateRef.current || !session) return;
    try {
      const jpegData = await domtoimage.toJpeg(certificateRef.current, {});
      const link = document.createElement("a");
      link.download = `Certificate of Induction - ${session.induction_title} - ${session.full_name}`;
      link.href = jpegData;
      link.click();
    } catch (err) {
      console.error("Error generating certificate image:", err);
    }
  };

  const isFailed = session?.status?.toLowerCase() === "failed";
  const isExpired = session?.is_expired === true;
  const isValid = session && !isFailed && !isExpired;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 px-4 py-10 transition-colors">
      <div className="w-full max-w-xl rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900 shadow-sm p-6 backdrop-blur-sm transition-colors">
        {/* === Loading === */}
        {isLoading && (
          <div className="text-center text-gray-600 dark:text-gray-300 py-20">
            Loading certificate...
          </div>
        )}

        {/* === Error === */}
        {!isLoading && error && (
          <div className="text-center space-y-4 py-10">
            <h2 className="text-xl font-semibold text-red-500">
              Error Loading Certificate
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {error?.message ||
                "Something went wrong while fetching the certificate. Please try again."}
            </p>
            <Button variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        )}

        {/* === Not Found === */}
        {!isLoading && !error && !session && (
          <div className="text-center space-y-4 py-10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Certificate Not Found
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              The certificate you are trying to view could not be found. It may
              have been removed or is not yet available.
            </p>
          </div>
        )}

        {/* === Failed === */}
        {!isLoading && !error && isFailed && (
          <div className="text-center space-y-4 py-10">
            <h2 className="text-xl font-semibold text-red-600">
              Certificate Not Available
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              This user did not pass the induction, so no certificate is
              available.
            </p>
          </div>
        )}

        {/* === Valid / Expired Certificate === */}
        {!isLoading && !error && session && !isFailed && (
          <>
            <div className="p-4 bg-white" ref={certificateRef}>
              <div
                className={`relative border-2 border-dashed p-5 transition-all bg-white text-gray-900 shadow-inner ${
                  isExpired
                    ? "opacity-70 grayscale border-gray-400"
                    : "border-black"
                }`}
              >
                <div className="relative flex flex-col sm:flex-row justify-between">
                  {/* Header (logo) */}

                  <img
                    src="/ewep-logo.webp"
                    alt="Company logo"
                    width={140}
                    height={45}
                    className="object-contain"
                  />

                  {/* QR Code - absolutely positioned */}
                  <div
                    className="
    md:absolute sm:-top-4 sm:-right-4 

 
  "
                  >
                    <Canvas
                      text={`${process.env.NEXT_PUBLIC_APP_URL}/certificate/${session.id}`}
                      options={{
                        type: "image/jpeg",
                        errorCorrectionLevel: "M",
                        width: 140,
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row gap-4 mt-0 md:mt-6">
                  <div className="flex-1 space-y-3">
                    <h1 className="text-2xl font-bold text-gray-900">
                      Certificate of Induction
                    </h1>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      This certifies that{" "}
                      <span className="font-semibold text-gray-900">
                        {session.full_name}
                      </span>{" "}
                      has successfully completed the{" "}
                      <span className="font-semibold text-gray-900">
                        {session.induction_title}
                      </span>{" "}
                      and understands the information provided.
                    </p>
                    <p className="text-sm text-gray-700">
                      Due for renewal on:{" "}
                      <span className="font-semibold text-gray-900">
                        {session.valid_until}
                      </span>
                    </p>
                  </div>
                </div>

                <p className="text-xs font-semibold text-green-900 bg-green-50 p-2 rounded text-center mt-4">
                  THIS CARD MUST BE SHOWN ON SITE
                </p>

                {/* Footer */}
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <p className="text-xs text-gray-600 mb-3">
                    I acknowledge that I have read and understood the{" "}
                    {session.induction_title} and agree to follow its policies.
                  </p>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Signature:</span>
                      <span>Date: {session.created_at}</span>
                    </div>
                    <div className="border-b border-gray-600 w-full mt-6"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download / Expired Notice */}
            {isValid ? (
              <Button
                onClick={handleDownload}
                variant="outline"
                className="mt-5 w-full border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
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
    </div>
  );
}
