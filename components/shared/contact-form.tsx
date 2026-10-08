"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useId, useRef, useState, type FormEvent } from "react";

import { ctaButtonVariants } from "@/components/shared/cta-button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	markVisitRequestConfirmed,
	trackSiteEvent,
} from "@/lib/analytics-events";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "error";
type ContactFormData = {
	name: string;
	phone: string;
	email: string;
	commune: string;
	projectType: string;
	gardenSurface: string;
	timeframe: string;
	message: string;
};

const initialFormData: ContactFormData = {
	name: "",
	phone: "",
	email: "",
	commune: "",
	projectType: "",
	gardenSurface: "",
	timeframe: "",
	message: "",
};

const projectTypeOptions = [
	{ value: "visite-devis", label: "Visite et devis gratuits" },
	{ value: "conception", label: "Conception de jardin" },
	{ value: "coaching", label: "Coaching de jardin (150 € TTC)" },
	{ value: "amenagement", label: "Aménagement des extérieurs" },
	{ value: "entretien", label: "Entretien des espaces verts" },
	{ value: "global", label: "Projet complet" },
];
const surfaceOptions = [
	"Moins de 500 m²",
	"500 à 1 500 m²",
	"Plus de 1 500 m²",
].map((option) => ({ value: option, label: option }));
const timeframeOptions = [
	"Dès que possible",
	"Sous 3 mois",
	"Simple idée pour l’instant",
].map((option) => ({ value: option, label: option }));
const inputClassName =
	"border-border bg-background h-12 lg:h-11 tall:h-12 w-full rounded-lg border px-4 text-sm transition-all focus:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none";

export function ContactForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const objet = searchParams.get("objet");
	const normalizedObjet = objet === "visite" ? "visite-devis" : objet;
	const requestedProjectType = projectTypeOptions.find(
		(option) => option.value === normalizedObjet,
	)?.value;
	const [previousObjet, setPreviousObjet] = useState(objet);
	const [formData, setFormData] = useState<ContactFormData>(() => ({
		...initialFormData,
		projectType: requestedProjectType ?? "",
	}));
	const [status, setStatus] = useState<FormStatus>("idle");
	const submissionStarted = useRef(false);
	const id = useId();

	if (objet !== previousObjet) {
		setPreviousObjet(objet);
		if (requestedProjectType)
			setFormData({ ...formData, projectType: requestedProjectType });
	}

	function handleChange(
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement
		>,
	) {
		setFormData((previous) => ({
			...previous,
			[event.target.name]: event.target.value,
		}));
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (submissionStarted.current) return;
		submissionStarted.current = true;
		setStatus("loading");
		const botcheck = new FormData(event.currentTarget).get("botcheck") ?? "";
		if (botcheck !== "") {
			setStatus("error");
			submissionStarted.current = false;
			return;
		}
		trackSiteEvent("clic_visite_offerte", "contact");
		let confirmed = false;
		try {
			// The existing client API supports custom fields and a public access key.
			// https://docs.web3forms.com/getting-started/api-reference
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
					subject: `Nouvelle demande de visite de ${formData.name} · Permapaysage`,
					from_name: "Permapaysage",
					...formData,
					botcheck,
				}),
			});
			const result: unknown = await response.json();
			if (
				!response.ok ||
				typeof result !== "object" ||
				result === null ||
				Array.isArray(result) ||
				!("success" in result) ||
				result.success !== true
			) {
				setStatus("error");
				return;
			}
			confirmed = true;
			markVisitRequestConfirmed();
			router.push("/merci");
		} catch {
			setStatus("error");
		} finally {
			// Keep the lock after confirmation while navigation completes.
			if (!confirmed) submissionStarted.current = false;
		}
	}

	return (
		<form
			className="rounded-2xl border border-primary/10 bg-background p-6 shadow-md md:p-8 lg:p-7 xl:p-8 tall:p-10"
			onSubmit={handleSubmit}
			aria-busy={status === "loading"}
		>
			<h2 className="text-2xl leading-snug font-medium md:text-3xl lg:text-[1.75rem] tall:text-3xl">
				Demandez votre visite terrain offerte
			</h2>
			<p className="text-muted-foreground mt-2 text-sm lg:mt-1 tall:mt-2">
				Les champs marqués d’un astérisque sont obligatoires.
			</p>
			<input
				type="checkbox"
				name="botcheck"
				className="hidden"
				tabIndex={-1}
				autoComplete="off"
				aria-hidden="true"
			/>
			<fieldset className="mt-8 min-w-0 lg:mt-5 tall:mt-8">
				<legend className="mb-4 flex items-center gap-3 text-base font-semibold lg:mb-3 tall:mb-4">
					<span
						aria-hidden
						className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-sage text-xs text-primary lg:h-7 lg:w-7"
					>
						01
					</span>
					Vos coordonnées
				</legend>
				<div className="grid gap-5 sm:grid-cols-2 lg:gap-x-5 lg:gap-y-3.5 tall:gap-y-5">
					<div className="space-y-2 text-sm lg:space-y-1.5 tall:space-y-2">
						<label htmlFor={`${id}-name`} className="block font-medium">
							Nom *
						</label>
						<input
							id={`${id}-name`}
							type="text"
							name="name"
							required
							autoComplete="name"
							placeholder="Votre nom"
							value={formData.name}
							onChange={handleChange}
							className={inputClassName}
						/>
					</div>
					<div className="space-y-2 text-sm lg:space-y-1.5 tall:space-y-2">
						<div className="flex flex-wrap items-center justify-between gap-x-3">
							<label htmlFor={`${id}-phone`} className="block font-medium">
								Téléphone *
							</label>
							<p
								id={`${id}-phone-help`}
								className="text-xs text-muted-foreground"
							>
								Pour caler la visite offerte.
							</p>
						</div>
						<input
							id={`${id}-phone`}
							type="tel"
							name="phone"
							required
							autoComplete="tel"
							placeholder="06 00 00 00 00"
							value={formData.phone}
							onChange={handleChange}
							aria-describedby={`${id}-phone-help`}
							className={inputClassName}
						/>
					</div>
					<div className="space-y-2 text-sm lg:space-y-1.5 tall:space-y-2">
						<label htmlFor={`${id}-email`} className="block font-medium">
							Email *
						</label>
						<input
							id={`${id}-email`}
							type="email"
							name="email"
							required
							autoComplete="email"
							placeholder="vous@email.fr"
							value={formData.email}
							onChange={handleChange}
							className={inputClassName}
						/>
					</div>
					<div className="space-y-2 text-sm lg:space-y-1.5 tall:space-y-2">
						<label htmlFor={`${id}-commune`} className="block font-medium">
							Commune *
						</label>
						<input
							id={`${id}-commune`}
							type="text"
							name="commune"
							required
							autoComplete="address-level2"
							placeholder="Votre commune"
							value={formData.commune}
							onChange={handleChange}
							className={inputClassName}
						/>
					</div>
				</div>
			</fieldset>
			<fieldset className="mt-8 min-w-0 lg:mt-5 tall:mt-8">
				<legend className="mb-4 flex items-center gap-3 text-base font-semibold lg:mb-3 tall:mb-4">
					<span
						aria-hidden
						className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-sage text-xs text-primary lg:h-7 lg:w-7"
					>
						02
					</span>
					Votre projet
				</legend>
				<div className="grid gap-5 sm:grid-cols-2 lg:gap-x-5 lg:gap-y-3.5 tall:gap-y-5">
					<div className="space-y-2 text-sm lg:space-y-1.5 tall:space-y-2 sm:col-span-2">
						<label htmlFor={`${id}-projectType`} className="block font-medium">
							Type de besoin{" "}
							<span className="font-normal text-muted-foreground">
								(facultatif)
							</span>
						</label>
						<FormSelect
							id={`${id}-projectType`}
							name="projectType"
							value={formData.projectType}
							options={projectTypeOptions}
							onValueChange={(value) =>
								setFormData((previous) => ({ ...previous, projectType: value }))
							}
						/>
					</div>
					<div className="space-y-2 text-sm lg:space-y-1.5 tall:space-y-2">
						<label htmlFor={`${id}-gardenSurface`} className="block font-medium">
							Surface du jardin{" "}
							<span className="font-normal text-muted-foreground">
								(facultatif)
							</span>
						</label>
						<FormSelect
							id={`${id}-gardenSurface`}
							name="gardenSurface"
							value={formData.gardenSurface}
							options={surfaceOptions}
							onValueChange={(value) =>
								setFormData((previous) => ({ ...previous, gardenSurface: value }))
							}
						/>
					</div>
					<div className="space-y-2 text-sm lg:space-y-1.5 tall:space-y-2">
						<label htmlFor={`${id}-timeframe`} className="block font-medium">
							Délai souhaité{" "}
							<span className="font-normal text-muted-foreground">
								(facultatif)
							</span>
						</label>
						<FormSelect
							id={`${id}-timeframe`}
							name="timeframe"
							value={formData.timeframe}
							options={timeframeOptions}
							onValueChange={(value) =>
								setFormData((previous) => ({ ...previous, timeframe: value }))
							}
						/>
					</div>
					<div className="space-y-2 text-sm lg:space-y-1.5 tall:space-y-2 sm:col-span-2">
						<label htmlFor={`${id}-message`} className="block font-medium">
							Message{" "}
							<span className="font-normal text-muted-foreground">
								(facultatif)
							</span>
						</label>
						<textarea
							id={`${id}-message`}
							name="message"
							rows={4}
							placeholder="Ex. : jardin de 800 m² à entretenir, haie à tailler, projet de potager…"
							value={formData.message}
							onChange={handleChange}
							className="border-border bg-background w-full resize-y rounded-lg border px-4 py-3 text-sm lg:h-24 lg:py-2.5 tall:h-32 tall:py-3 transition-all focus:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
						/>
					</div>
				</div>
			</fieldset>
			{status === "error" && (
				<p className="mt-4 text-sm text-destructive" role="alert">
					La demande n’a pas pu être envoyée. Veuillez réessayer ou nous appeler
					au 07 52 62 08 18.
				</p>
			)}
			<button
				type="submit"
				disabled={status === "loading"}
				className={cn(
					ctaButtonVariants({ variant: "primary-light" }),
					"mt-8 w-full whitespace-normal text-center lg:mt-5 tall:mt-8",
				)}
			>
				{status === "loading"
					? "Envoi en cours…"
					: "Demander ma visite offerte"}
			</button>
		</form>
	);
}

type FormSelectProps = {
	id: string;
	name: string;
	value: string;
	options: { value: string; label: string }[];
	onValueChange: (value: string) => void;
};

function FormSelect({ id, name, value, options, onValueChange }: FormSelectProps) {
	return (
		<Select
			name={name}
			items={options}
			value={value || null}
			onValueChange={(next) => onValueChange(next ?? "")}
		>
			<SelectTrigger
				id={id}
				className="group w-full cursor-pointer data-[size=default]:h-12 lg:data-[size=default]:h-11 tall:data-[size=default]:h-12 rounded-lg border-border bg-background px-4 text-sm transition-colors hover:border-primary/40 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary data-popup-open:border-primary/50 data-placeholder:text-muted-foreground [&>svg]:size-4.5 [&>svg]:text-primary [&>svg]:transition-transform [&>svg]:duration-200 data-popup-open:[&>svg]:rotate-180"
			>
				<SelectValue placeholder="Sélectionnez une option" />
			</SelectTrigger>
			<SelectContent
				alignItemWithTrigger={false}
				sideOffset={6}
				className="rounded-xl border border-border bg-background p-1.5 shadow-lg ring-0"
			>
				{options.map((option) => (
					<SelectItem
						key={option.value}
						value={option.value}
						className="min-h-11 cursor-pointer rounded-lg py-2.5 pr-10 pl-3 text-sm text-foreground transition-colors data-highlighted:bg-surface-sage data-highlighted:text-primary data-selected:font-semibold data-selected:text-primary [&_svg]:text-primary"
					>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
