// scripts/validate.js
import Ajv from "ajv";
import addFormats from "ajv-formats";
import metaSchema from "ajv/dist/refs/json-schema-2020-12/schema.json" assert { type: "json" };
import { readFileSync } from "fs";

const ajv = new Ajv({ allErrors: true, strict: false });
ajv.addMetaSchema(metaSchema);
addFormats(ajv);

const schema = JSON.parse(readFileSync("schema/canonical-graph.schema.json", "utf-8"));
const data = JSON.parse(readFileSync("model/graph.json", "utf-8"));

const validate = ajv.compile(schema);
const valid = validate(data);

if (valid) {
  console.log("✅ model/graph.json is valid");
} else {
  console.error("❌ Validation errors:");
  console.error(validate.errors);
  process.exit(1);
}
