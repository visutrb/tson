import { Serializable, SerializedProperty } from "../../src";

@Serializable()
export class Address {
  
  @SerializedProperty("address_line1")
  addressLine1: string;

  @SerializedProperty("address_line2")
  addressLine2: string;

  @SerializedProperty("zip_code")
  zipCode: number;
}
