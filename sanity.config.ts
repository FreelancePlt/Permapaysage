import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./lib/sanity/schemas"
import { structure } from "./lib/sanity/structure"

export default defineConfig({
	name: "default",
	title: "Permapaysage",
	basePath: "/studio",

	projectId: "ecfagc9w",
	dataset: "production",

	plugins: [
		structureTool({ structure }),
		visionTool(),
	],

	schema: {
		types: schemaTypes,
	},
})
