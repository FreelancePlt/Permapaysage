"use client";

import { useState } from "react";
import Image from "next/image";

type ReviewAvatarProps = {
	author: string;
	photoUri?: string;
};

export function ReviewAvatar({ author, photoUri }: ReviewAvatarProps) {
	const [failed, setFailed] = useState(false);

	if (!photoUri || failed) {
		return (
			<span
				aria-hidden
				className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-cream"
			>
				{author.charAt(0)}
			</span>
		);
	}

	return (
		// Direct image: no persistent Next.js image cache of Google content.
		<Image
			unoptimized
			src={photoUri}
			alt={`Photo de ${author}`}
			width={40}
			height={40}
			referrerPolicy="no-referrer"
			onError={() => setFailed(true)}
			className="h-10 w-10 shrink-0 rounded-full object-cover"
		/>
	);
}
