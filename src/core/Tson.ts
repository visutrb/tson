import { Constants } from "./Constants";

export class Tson {

  /**
   * Convert json into object of specified class.
   * @param json The json object or string to be converted.
   * @param tsClass Class of the resulting object.
   * @returns Object of class T.
   */
  fromJson<T>(json: string | object, tsClass: new () => T): T {
    if (!json) return null;
    if (typeof json === "string") {
      if (json === "") return null;
      json = JSON.parse(json);
      if (!json) return null;
    }
    const instance = Reflect.construct(tsClass, []);
    const properties = Reflect.getMetadata(Constants.META_SERIALIZED_PROPERTIES, instance);
    for (const property of properties) {
      const propertyType = Reflect.getMetadata(Constants.META_SERIALIZED_PROPERTY_TYPE, instance, property);
      const serializedName = Reflect.getMetadata(Constants.META_SERIALIZED_NAME, instance, property);
      const isSerializable = Reflect.hasMetadata(Constants.META_SERIALIZABLE, propertyType);

      let deserializedValue: any;
      const value = json[serializedName];
      if (!value) {
        deserializedValue = null;
      } else if (isSerializable) {
        deserializedValue = this.fromJson(value, propertyType);
      } else if (propertyType === Array) {
        const itemType = Reflect.getMetadata(Constants.META_SERIALIZED_ARRAY_PROPERTY_ITEM_TYPE, instance, property);
        const isItemSerializable = itemType ? Reflect.hasMetadata(Constants.META_SERIALIZABLE, itemType) : false;
        deserializedValue = isItemSerializable
          ? value.map((item: any) => this.fromJson(item, itemType))
          : value;
      } else if (propertyType === Date) {
        deserializedValue = new Date(value);
      } else {
        deserializedValue = value;
      }
      Reflect.set(instance, property, deserializedValue);
    }
    return instance;
  }


  /**
   * Convert TypeScript object into json.
   * @param object Object to convert.
   */
  toJson(object: any): any {
    const json = {};
    const properties = Reflect.getMetadata(Constants.META_SERIALIZED_PROPERTIES, object);
    for (const property of properties) {
      const serializedName = Reflect.getMetadata(Constants.META_SERIALIZED_NAME, object, property);
      const propertyType = Reflect.getMetadata(Constants.META_SERIALIZED_PROPERTY_TYPE, object, property);
      const isPropertySerializable = Reflect.hasMetadata(Constants.META_SERIALIZABLE, propertyType);

      let serializedValue: any;
      const value = Reflect.get(object, property);
      if (!value) {
        continue;
      } else if (isPropertySerializable) {
        serializedValue = this.toJson(value);
      } else if (propertyType == Array) {
        const itemType = Reflect.getMetadata(Constants.META_SERIALIZED_ARRAY_PROPERTY_ITEM_TYPE, object, property);
        const isItemSerializable = itemType ? Reflect.hasMetadata(Constants.META_SERIALIZABLE, itemType) : false;
        serializedValue = isItemSerializable
          ? value.map((item: any) => this.toJson(item))
          : value;
      } else {
        serializedValue = value;
      }

      json[serializedName] = serializedValue;
    }
    return json;
  }
}
