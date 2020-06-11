import { Constants } from "../core/Constants";

/**
 * Mark the class for serialization.
 */
export function Serializable(): ClassDecorator {
  return (target) => Reflect.defineMetadata(Constants.META_SERIALIZABLE, true, target);
}
