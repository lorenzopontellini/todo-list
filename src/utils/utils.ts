export function unwrapSchema(schema: any) {
  if (schema.definitions) {
    const key = Object.keys(schema.definitions)[0];
    return schema.definitions[key];
  }
  return schema;
}