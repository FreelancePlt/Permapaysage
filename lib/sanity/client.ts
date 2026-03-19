import { createClient } from "next-sanity"

export const client = createClient({
	projectId: "ecfagc9w",
	dataset: "production",
	apiVersion: "2026-03-19",
	useCdn: true,
})
