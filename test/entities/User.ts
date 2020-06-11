import { Serializable, SerializedProperty } from "../../src";
import { Address } from "./Address";

@Serializable()
export class User {

  @SerializedProperty()
  id: number;

  @SerializedProperty("first_name")
  firstName: string;

  @SerializedProperty("last_name")
  lastName: string;

  @SerializedProperty({ type: Array, itemType: Address })
  addresses: Address[];
}
