"use client";

import {
	CaretLeftIcon,
	CaretRightIcon,
	MagnifyingGlassPlusIcon,
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

export type GalleryImage = {
	key: string;
	src: string;
	thumbnail: string;
	fullSize: string;
	alt: string;
};

type ProjectGalleryProps = {
	title: string;
	images: GalleryImage[];
};

const navButtonClassName =
	"absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary-deep/85 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-cream";

export function ProjectGallery({ title, images }: ProjectGalleryProps) {
	const [current, setCurrent] = useState(0);
	const [expanded, setExpanded] = useState(false);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const touchStart = useRef<{ x: number; y: number } | null>(null);
	const titleId = useId();
	const [main, ...thumbnails] = images;
	const selected = images[current];
	const hasSeveral = images.length > 1;

	useEffect(() => {
		if (!expanded) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [expanded]);

	if (!main) return null;

	function open(index: number) {
		setCurrent(index);
		setExpanded(true);
		dialogRef.current?.showModal();
	}

	function handleClose() {
		setExpanded(false);
		triggerRefs.current[current]?.focus({ preventScroll: true });
	}

	function move(direction: number) {
		setCurrent((index) => (index + direction + images.length) % images.length);
	}

	function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
		if (!hasSeveral) return;
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
		if (!hasSeveral || !start || !end) return;
		const dx = end.clientX - start.x;
		if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(end.clientY - start.y)) {
			move(dx < 0 ? 1 : -1);
		}
	}

	return (
		<div className="space-y-4">
			<button
				ref={(element) => {
					triggerRefs.current[0] = element;
				}}
				type="button"
				onClick={() => open(0)}
				aria-haspopup="dialog"
				aria-label={`Agrandir la photo : ${main.alt}`}
				className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
			>
				<Image
					src={main.src}
					alt={main.alt}
					width={1200}
					height={900}
					priority
					sizes="(max-width: 1023px) calc(100vw - 32px), 600px"
					className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
				/>
				<span
					aria-hidden
					className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary-deep/85 text-cream transition-colors group-hover:bg-primary-deep"
				>
					<MagnifyingGlassPlusIcon size={22} />
				</span>
			</button>

			{thumbnails.length > 0 && (
				<ul className="grid grid-cols-3 gap-3">
					{thumbnails.map((image, index) => (
						<li key={image.key}>
							<button
								ref={(element) => {
									triggerRefs.current[index + 1] = element;
								}}
								type="button"
								onClick={() => open(index + 1)}
								aria-haspopup="dialog"
								aria-label={`Agrandir la photo : ${image.alt}`}
								className="group block w-full cursor-zoom-in overflow-hidden rounded-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
							>
								<Image
									src={image.thumbnail}
									alt={image.alt}
									width={400}
									height={400}
									sizes="(max-width: 1023px) calc((100vw - 56px) / 3), 192px"
									className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
								/>
							</button>
						</li>
					))}
				</ul>
			)}

			<dialog
				ref={dialogRef}
				aria-labelledby={titleId}
				onClose={handleClose}
				onClick={(event) => {
					if (event.target === event.currentTarget) event.currentTarget.close();
				}}
				onKeyDown={handleKeyDown}
				className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-primary-deep/95 p-3 text-cream backdrop:bg-primary-deep sm:p-6"
			>
				<div className="mx-auto flex h-full max-w-[1800px] flex-col gap-3 sm:gap-5">
					<div className="flex items-center justify-between gap-4">
						<p id={titleId} className="text-sm font-semibold sm:text-base">
							{title}
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
						{expanded && selected && (
							<Image
								key={selected.key}
								src={selected.fullSize}
								alt={selected.alt}
								fill
								sizes="(min-width: 1800px) 1700px, 100vw"
								loading="eager"
								className="object-contain"
							/>
						)}
						{hasSeveral && (
							<>
								<button
									type="button"
									onClick={() => move(-1)}
									aria-label="Photo précédente"
									className={`${navButtonClassName} left-1 sm:left-3`}
								>
									<CaretLeftIcon size={24} aria-hidden />
								</button>
								<button
									type="button"
									onClick={() => move(1)}
									aria-label="Photo suivante"
									className={`${navButtonClassName} right-1 sm:right-3`}
								>
									<CaretRightIcon size={24} aria-hidden />
								</button>
							</>
						)}
					</div>
					<p
						aria-live="polite"
						aria-atomic="true"
						className="text-center text-sm text-cream/90"
					>
						{current + 1} / {images.length}
						{selected ? ` · ${selected.alt}` : ""}
					</p>
				</div>
			</dialog>
		</div>
	);
}
