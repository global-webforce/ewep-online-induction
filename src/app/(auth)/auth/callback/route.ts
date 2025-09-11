// app/auth/callback/route.ts
import { authRepository } from "@/features/shared/auth-repository";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const access_token = searchParams.get("access_token");
  const refresh_token = searchParams.get("refresh_token");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  if (access_token && refresh_token) {
    authRepository.setUser({ access_token, refresh_token });

    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.redirect(new URL("/signIn", request.url));
}
