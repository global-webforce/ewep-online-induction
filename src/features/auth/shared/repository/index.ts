import { AuthRepository } from "./auth-repository";
import { AuthRepositoryRemote } from "./auth-repository-remote";

export const authRepository: AuthRepository = new AuthRepositoryRemote();
