import { Serializable, SerializedProperty } from "../../src";
import { User } from "./User";

@Serializable()
export class Article {

  @SerializedProperty()
  id: number;

  @SerializedProperty()
  title: string;

  @SerializedProperty()
  content: string;

  @SerializedProperty("user")
  author: User;

  @SerializedProperty("published_at")
  publishedAt: Date;

  @SerializedProperty()
  comments: string[];
}
