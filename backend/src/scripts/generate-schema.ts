import { writeFileSync } from "fs";
import { printSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "../graphql/schema";
import { resolvers } from "../graphql/resolver";

const schema = makeExecutableSchema({ typeDefs, resolvers });

writeFileSync("src/graphql/generated/schema.graphql", printSchema(schema));
console.log("schema.graphql generated!");
