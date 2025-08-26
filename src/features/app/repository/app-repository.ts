import { Post } from "../models/post";

export interface AppRepository {
  createPost: (data: Post) => Promise<Post>;
  getPostById: (id: string) => Promise<Post | null>;
  getAllPost: () => Promise<Post[]>;
  updatePost: (id: string, data: Post) => Promise<Post>;
  deletePost: (id: string) => Promise<void>;
}
