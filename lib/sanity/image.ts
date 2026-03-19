import { createImageUrlBuilder } from "@sanity/image-url"
import { client } from "./client"

const builder = createImageUrlBuilder(client)

export function urlFor(source: { _type: "image"; asset: { _ref: string } }) {
	return builder.image(source)
}
