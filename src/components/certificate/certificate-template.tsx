import { SessionsRowViewSchema } from "@/features/types";
import { forwardRef } from "react";

export const CertificateTemplate = forwardRef<
  HTMLDivElement,
  { session: SessionsRowViewSchema }
>(({ session }, ref) => {
  return (
    <div
      ref={ref}
      className={`w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden relative ${
        session.is_expired ? " grayscale border-neutral-400" : "border-gray-400"
      }`}
    >
      {/* Decorative Top Border */}
      <div className="h-2 bg-gradient-to-r from-[#0D4D68] via-[#86B049] to-[#0D4D68]"></div>

      {/* Background Watermark */}
      {/* <img
        src="/logo.svg" // replace with your watermark image path
        alt="Watermark"
        className="absolute inset-0 m-auto opacity-5 w-1/2 pointer-events-none select-none"
      /> */}

      {/* Background Watermark */}
      <div className="absolute inset-0 z-1 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[#0D4D68]/6 text-9xl font-extrabold tracking-widest rotate-[-25deg]  text-center max-w-[600px]">
          {process.env.NEXT_PUBLIC_APP_NAME_ABBREV}
        </span>
      </div>

      {/* Certificate Content */}
      <div className="p-12 text-center relative bg-[radial-gradient(ellipse_at_center,_#f9fafb_0%,_#eef2f3_100%)]">
        {/* Decorative Corner Elements */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#0D4D68] rounded-tl-lg"></div>
        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#0D4D68] rounded-tr-lg"></div>
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#0D4D68] rounded-bl-lg"></div>
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#0D4D68] rounded-br-lg"></div>

        {/* Header */}
        <div className="mb-8 relative z-10">
          <div className="text-[#0D4D68] text-sm font-semibold tracking-widest uppercase mb-2">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0D4D68] to-[#86B049] bg-clip-text text-transparent mb-2">
            Certificate of Completion
          </h1>
        </div>

        {/* Main Content */}
        <div className="my-12 space-y-6 relative z-10">
          <p className="text-slate-600 text-lg">This is to certify that</p>

          <div className="py-4 border-b-2 border-slate-300">
            <p className="text-3xl font-bold text-slate-900 drop-shadow-sm">
              {session.first_name + " " + session.last_name}
            </p>
          </div>

          <p className="text-slate-600 text-lg">
            has successfully completed and demonstrated excellence in
          </p>

          <div className="py-4">
            <p className="text-2xl font-semibold text-[#5A7531]">
              {session.induction_title}
            </p>
          </div>

          <p className="text-slate-600 text-base">
            In witness whereof, this certificate is awarded on
          </p>

          <div className="flex justify-around items-end mt-8 pt-8 border-t border-slate-200">
            <div className="text-center">
              <div className="h-12 mb-2"></div>
              <p className=" font-semibold text-slate-700">
                {session.session_created_at_formatted_2}
              </p>
              <p className="text-sm text-slate-500">Date Awarded</p>
            </div>

            {session.valid_until && (
              <div className="text-center">
                <div className="h-12 mb-2"></div>
                <p className=" font-semibold text-slate-700">
                  {session.session_valid_until_formatted}
                </p>
                <p className="text-sm text-slate-500">Valid Until</p>
              </div>
            )}

            <div className="text-center">
              <div className="h-12 mb-2"></div>
              <p className=" font-semibold text-slate-700"></p>

              <p className="text-sm text-slate-500 border-t border-dashed border-slate-400 italic">
                Authorized Signature
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200 relative z-10">
          <p className="text-xs text-slate-500 tracking-wider">
            Certificate ID: {session.id}
          </p>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-2 bg-gradient-to-r from-[#0D4D68] via-[#86B049] to-[#0D4D68]"></div>
    </div>
  );
});
