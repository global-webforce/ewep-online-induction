import { Post } from "../models/post";

export interface AppRepository {
  getInductions: () => Promise<[]>;
}
