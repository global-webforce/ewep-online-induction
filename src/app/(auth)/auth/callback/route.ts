// app/auth/callback/route.ts
import { createClient } from "@/utils/supabase/client-server";
import { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (token_hash && type) {
    const supabase = await createClient();
    const { error: verifyError } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!verifyError) {
      switch (type) {
        case "signup":
          return redirect("/dashboard");
        case "magiclink":
          return redirect("/dashboard");
        case "recovery":
          return redirect(`/reset-password?token_hash=${token_hash}`);
        case "invite":
          return redirect("/onboarding");
        case "email_change":
          return redirect("/profile?email_changed=1");
        default:
          return redirect("/");
      }
    }

    // redirect the user to an error page with some instructions
    redirect("/error?" + verifyError);
  }
}
