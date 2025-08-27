import { cookies } from "next/headers";
import { RegisterSchema } from "../../register/register-schema";
import { User } from "../models/user-schema";
import { AuthRepository } from "./auth-repository";

export class AuthRepositoryMockServer implements AuthRepository {
  private static sessions: Map<string, User> = new Map();
  private static COOKIE_NAME = "mock-auth-token";

  async loginWithEmail(email: string, password: string): Promise<void> {
    const sessionId = `mock-session-${Date.now()}`;
    const user: User = {
      id: "mock-server-user-id",
      email,
      roles: ["user"],
    };

    AuthRepositoryMockServer.sessions.set(sessionId, user);

    // ✅ only works inside server actions / routes
    const cookieStore = await cookies();
    cookieStore.set(AuthRepositoryMockServer.COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
  }

  async registerWithEmail(data: RegisterSchema): Promise<void> {
    const sessionId = `mock-session-${Date.now()}`;
    const user: User = {
      id: "mock-server-user-id",
      email: data.email,
      roles: ["user"],
    };

    AuthRepositoryMockServer.sessions.set(sessionId, user);

    const cookieStore = await cookies();
    cookieStore.set(AuthRepositoryMockServer.COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
  }

  async logout(): Promise<void> {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(
      AuthRepositoryMockServer.COOKIE_NAME
    )?.value;

    if (sessionId) {
      AuthRepositoryMockServer.sessions.delete(sessionId);
      cookieStore.delete(AuthRepositoryMockServer.COOKIE_NAME);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies(); // ✅ works in both server actions & components (read-only in RSC)
    const sessionId = cookieStore.get(
      AuthRepositoryMockServer.COOKIE_NAME
    )?.value;
    if (!sessionId) return null;
    return AuthRepositoryMockServer.sessions.get(sessionId) ?? null;
  }

  async loginWithProvider(
    provider: "google" | "github" | "facebook" | "twitter" | string,
    options?: { redirectTo?: string }
  ): Promise<void> {
    const sessionId = `mock-session-${provider}-${Date.now()}`;
    const user: User = {
      id: `mock-server-${provider}-id`,
      email: `${provider}_server_user@example.com`,
      roles: ["admin"],
    };

    AuthRepositoryMockServer.sessions.set(sessionId, user);

    const cookieStore = await cookies();
    cookieStore.set(AuthRepositoryMockServer.COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
  }

  onUserChange(callback: (user: User | null) => void): () => void {
    return () => {
      // noop
    };
  }
}
