"use client";

import {
	CaretLeftIcon,
	CaretRightIcon,
	CornersOutIcon,
	XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import {
	useEffect,
	useId,
	useRef,
	useState,
	type KeyboardEvent,
	type TouchEvent,
} from "react";

const images = [
	{
		src: "/hero/mare-naturelle-terrasse-bois-paysagiste-vallet.webp",
		label: "Mare naturelle et terrasse en bois",
		alt: "Mare naturelle bordée d'iris et de salicaires, avec terrasse en bois, par Permapaysage, paysagiste à Vallet",
	},
	{
		src: "/hero/massif-graminees-micro-trefle-paysagiste-clisson.webp",
		label: "Massif de graminées et pelouse en micro-trèfle",
		alt: "Massif de graminées et d'arbustes sur paillage, pelouse en micro-trèfle, par Permapaysage, paysagiste intervenant à Clisson",
	},
	{
		src: "/hero/cloture-chataignier-haie-libre-paysagiste-la-chapelle-heulin.webp",
		label: "Clôture en châtaignier et haie libre",
		alt: "Clôture en châtaignier et haie libre plantée sur paillage, par Permapaysage, paysagiste intervenant à La Chapelle-Heulin",
	},
	{
		src: "/hero/jardin-massifs-paillage-palmier-paysagiste-le-loroux-bottereau.webp",
		label: "Massifs paillés, palmier et bordures",
		alt: "Jardin réaménagé avec massifs paillés, palmier et bordures, par Permapaysage, paysagiste intervenant au Loroux-Bottereau",
	},
	{
		src: "/hero/plan-amenagement-jardin-paysagiste-vallet-permapaysage.webp",
		label: "Plan paysager dessiné à la main",
		alt: "Plan d'aménagement paysager dessiné à la main par Permapaysage, paysagiste à Vallet",
	},
];

export function HeroCarousel() {
	const [current, setCurrent] = useState(0);
	const [expanded, setExpanded] = useState(false);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const expandButtonRef = useRef<HTMLButtonElement>(null);
	const titleId = useId();
	const touchStart = useRef<{ x: number; y: number } | null>(null);
	const goTo = (index: number) =>
		setCurrent((index + images.length) % images.length);
	const selected = images[current];

	useEffect(() => {
		if (!expanded) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [expanded]);

	function openGallery() {
		setExpanded(true);
		dialogRef.current?.showModal();
	}

	function handleGalleryClose() {
		setExpanded(false);
		expandButtonRef.current?.focus({ preventScroll: true });
	}

	function move(direction: number) {
		setCurrent((index) => (index + direction + images.length) % images.length);
	}

	function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
		if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
			event.preventDefault();
			move(event.key === "ArrowRight" ? 1 : -1);
		}
	}

	function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
		const touch = event.touches.length === 1 ? event.touches[0] : undefined;
		touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
	}

	function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
		const start = touchStart.current;
		touchStart.current = null;
		const end = event.changedTouches[0];
		if (!start || !end) return;
		const dx = end.clientX - start.x;
		if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(end.clientY - start.y)) {
			move(dx < 0 ? 1 : -1);
		}
	}

	return (
		<figure>
			<div
				className="photo-frame relative"
				role="region"
				aria-roledescription="carrousel"
				aria-label="Jardins et projets Permapaysage"
				onKeyDown={handleKeyDown}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
				onTouchCancel={() => {
					touchStart.current = null;
				}}
			>
				<div className="relative aspect-4/3 overflow-hidden rounded-xl">
					{/* Only the selected image is mounted: hidden slides never trigger downloads. */}
					<Image
						key={selected.src}
						src={selected.src}
						alt={selected.alt}
						fill
						sizes="(max-width: 767px) calc(100vw - 46px), (max-width: 1023px) calc(100vw - 62px), (max-width: 1279px) calc((100vw - 96px) * 0.4 - 14px), 519px"
						priority={current === 0}
						fetchPriority={current === 0 ? "high" : undefined}
						loading={current === 0 ? undefined : "lazy"}
						className="object-cover"
					/>
				</div>
				<button
					ref={expandButtonRef}
					type="button"
					onClick={openGallery}
					aria-haspopup="dialog"
					aria-label="Voir les photos en grand"
					title="Voir les photos en grand"
					className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary-deep/85 text-cream hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-cream"
				>
					<CornersOutIcon size={22} aria-hidden />
				</button>
				<button
					type="button"
					onClick={() => move(-1)}
					aria-label="Photo précédente"
					className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary-deep/85 text-cream hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-cream"
				>
					<CaretLeftIcon size={22} weight="bold" aria-hidden />
				</button>
				<button
					type="button"
					onClick={() => move(1)}
					aria-label="Photo suivante"
					className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary-deep/85 text-cream hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-cream"
				>
					<CaretRightIcon size={22} weight="bold" aria-hidden />
				</button>
				<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 rounded-full bg-primary-deep/75 px-2">
					{images.map((item, index) => (
						<button
							key={item.src}
							type="button"
							onClick={() => goTo(index)}
							aria-label={`Afficher la photo ${index + 1}`}
							aria-current={index === current ? "true" : undefined}
							className="flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-cream"
						>
							<span
								className={`h-2 rounded-full ${index === current ? "w-5 bg-cream" : "w-2 bg-cream/60"}`}
							/>
						</button>
					))}
				</div>
			</div>
			<figcaption className="mt-4 flex flex-wrap justify-between gap-2 text-xs leading-relaxed text-cream/80">
				<span aria-live="polite" aria-atomic="true">
					{current + 1} / {images.length} · {selected.label}
				</span>
			</figcaption>
			<dialog
				ref={dialogRef}
				aria-labelledby={titleId}
				onClose={handleGalleryClose}
				onClick={(event) => {
					if (event.target === event.currentTarget) event.currentTarget.close();
				}}
				onKeyDown={handleKeyDown}
				className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-primary-deep/95 p-3 text-cream backdrop:bg-primary-deep sm:p-6"
			>
				<div className="mx-auto flex h-full max-w-[1800px] flex-col gap-3 sm:gap-5">
					<div className="flex items-center justify-between gap-4">
						<p id={titleId} className="text-sm font-semibold sm:text-base">
							Les jardins de Permapaysage
						</p>
						<button
							type="button"
							onClick={() => dialogRef.current?.close()}
							aria-label="Fermer les photos"
							className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20 focus-visible:outline-2 focus-visible:outline-cream"
						>
							<XIcon size={24} aria-hidden />
						</button>
					</div>
					<div
						className="relative min-h-0 flex-1"
						onTouchStart={handleTouchStart}
						onTouchEnd={handleTouchEnd}
						onTouchCancel={() => {
							touchStart.current = null;
						}}
					>
						{expanded && (
							<Image
								key={selected.src}
								src={selected.src}
								alt={selected.alt}
								fill
								sizes="(min-width: 1800px) 1700px, 100vw"
								loading="eager"
								className="object-contain"
							/>
						)}
						<button
							type="button"
							onClick={() => move(-1)}
							aria-label="Photo précédente en grand"
							className="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary-deep/85 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-cream sm:left-3"
						>
							<CaretLeftIcon size={24} aria-hidden />
						</button>
						<button
							type="button"
							onClick={() => move(1)}
							aria-label="Photo suivante en grand"
							className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary-deep/85 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-cream sm:right-3"
						>
							<CaretRightIcon size={24} aria-hidden />
						</button>
					</div>
					<p
						aria-live="polite"
						aria-atomic="true"
						className="text-center text-sm text-cream/90"
					>
						{current + 1} / {images.length} · {selected.label}
					</p>
				</div>
			</dialog>
		</figure>
	);
}
