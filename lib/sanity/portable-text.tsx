import type { PortableTextReactComponents } from "@portabletext/react";
import Image from "next/image";

import { urlFor } from "./image";

export const portableTextComponents: Partial<PortableTextReactComponents> = {
	types: {
		image: ({ value }) => {
			if (!value?.asset?._ref) return null;
			return (
				<figure className="my-8">
					<Image
						src={urlFor(value).width(1200).url()}
						alt={value.alt || ""}
						width={1200}
						height={800}
						className="w-full rounded-lg"
					/>
					{value.legende && (
						<figcaption className="text-muted-foreground mt-2 text-center text-sm">
							{value.legende}
						</figcaption>
					)}
				</figure>
			);
		},
	},
	marks: {
		link: ({ children, value }) => {
			const href = value?.href || "";
			const isExternal = href.startsWith("http");
			return (
				<a
					href={href}
					className="text-primary underline underline-offset-2 hover:text-primary/80"
					{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
				>
					{children}
				</a>
			);
		},
	},
	block: {
		h2: ({ children }) => (
			<h2 className="mt-10 mb-4 text-2xl leading-snug tracking-tight md:text-3xl">{children}</h2>
		),
		h3: ({ children }) => (
			<h3 className="mt-8 mb-3 text-xl leading-snug tracking-tight md:text-2xl">{children}</h3>
		),
		blockquote: ({ children }) => (
			<blockquote className="my-6 border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
				{children}
			</blockquote>
		),
		normal: ({ children }) => (
			<p className="text-muted-foreground mb-4 text-base leading-relaxed md:text-lg">{children}</p>
		),
	},
};
