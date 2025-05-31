import { GraphQLScalarType, Kind } from "graphql";

// Use DateTime scalar in resolver to handle date conversions
export const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "ISO-formatted DateTime scalar",
  serialize(value) {
    return value instanceof Date ? value.toISOString() : value;
  },
  parseValue(value) {
    if (typeof value === "string" || typeof value === "number") {
      return new Date(value);
    }
    throw new TypeError("DateTime scalar can only parse string or number values");
  },
  parseLiteral(ast) {
    return ast.kind === Kind.STRING ? new Date(ast.value) : null;
  },
});
