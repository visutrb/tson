import { Constants } from "../core/Constants";

interface SerializedPropertyOptions {
  /** Name of the serialized property */
  name?: string;

  /** Type of the serialized property */
  type?: Function;

  /** Type of each item of the array property */
  itemType?: Function;
}

/**
 * Mark the property for serialization. 
 */
export function SerializedProperty(): PropertyDecorator;

/**
 * Mark the property for serialization with specified name. 
 * @param name Name of the serialized property.
 */
export function SerializedProperty(name: string): PropertyDecorator;

/**
 * Mark the property for serialization with specified options.
 * @param options Options for the serialized property. 
 */
export function SerializedProperty(options: SerializedPropertyOptions): PropertyDecorator;

export function SerializedProperty(arg?: string | SerializedPropertyOptions): PropertyDecorator {
  return (target, propertyKey) => {
    const property = typeof propertyKey === 'string' 
      ? propertyKey
      : propertyKey['description'];

    const serializedProperties = Reflect.getMetadata(Constants.META_SERIALIZED_PROPERTIES, target) || [];
    serializedProperties.push(property);

    let serializedName: string;
    if (!arg) {
      serializedName = property;
    } else if (typeof arg === 'string') {
      serializedName = arg;
    } else {
      serializedName = arg.name || property;
    }

    let propertyType: Function;
    let arrayItemType: Function;
    if (arg && typeof arg === 'object') {
      propertyType = arg.type;
      arrayItemType = arg.itemType;
    }

    propertyType = propertyType || Reflect.getMetadata("design:type", target, property);

    Reflect.defineMetadata(Constants.META_SERIALIZED_PROPERTIES, serializedProperties, target);
    Reflect.defineMetadata(Constants.META_SERIALIZED_NAME, serializedName, target, propertyKey);
    Reflect.defineMetadata(Constants.META_SERIALIZED_PROPERTY_TYPE, propertyType, target, propertyKey);

    if (arrayItemType) {
      Reflect.defineMetadata(Constants.META_SERIALIZED_ARRAY_PROPERTY_ITEM_TYPE, arrayItemType, target, propertyKey);
    }
  };
}
