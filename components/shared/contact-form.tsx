"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useId, useRef, useState, type FormEvent } from "react";

import { ctaButtonVariants } from "@/components/shared/cta-button";
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
	{ value: "visite-conseil", label: "Visite conseil" },
	{ value: "conception", label: "Conception de jardin" },
	{ value: "amenagement", label: "Aménagement des extérieurs" },
	{ value: "entretien", label: "Entretien des espaces verts" },
	{ value: "global", label: "Projet complet" },
];
const surfaceOptions = [
	"Moins de 500 m²",
	"500 à 1 500 m²",
	"Plus de 1 500 m²",
];
const timeframeOptions = [
	"Dès que possible",
	"Sous 3 mois",
	"Simple idée pour l’instant",
];
const inputClassName =
	"border-border bg-background h-12 w-full rounded-lg border px-4 text-sm transition-all focus:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none";

export function ContactForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const objet = searchParams.get("objet");
	const normalizedObjet = objet === "visite" ? "visite-conseil" : objet;
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
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
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
			className="rounded-2xl border border-primary/10 bg-background p-6 shadow-md md:p-8 xl:p-10"
			onSubmit={handleSubmit}
			aria-busy={status === "loading"}
		>
			<h2 className="text-2xl leading-snug font-medium md:text-3xl">
				Demandez votre visite terrain offerte
			</h2>
			<p className="text-muted-foreground mt-2 text-sm">
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
			<fieldset className="mt-8 min-w-0">
				<legend className="mb-4 flex items-center gap-3 text-base font-semibold">
					<span
						aria-hidden
						className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-sage text-xs text-primary"
					>
						01
					</span>
					Vos coordonnées
				</legend>
				<div className="grid gap-5 sm:grid-cols-2">
					<div className="space-y-2 text-sm">
						<label htmlFor={`${id}-name`} className="font-medium">
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
					<div className="space-y-2 text-sm">
						<label htmlFor={`${id}-phone`} className="font-medium">
							Téléphone *
						</label>
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
						<p
							id={`${id}-phone-help`}
							className="text-xs text-muted-foreground"
						>
							Pour caler la visite offerte.
						</p>
					</div>
					<div className="space-y-2 text-sm">
						<label htmlFor={`${id}-email`} className="font-medium">
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
					<div className="space-y-2 text-sm">
						<label htmlFor={`${id}-commune`} className="font-medium">
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
			<fieldset className="mt-8 min-w-0">
				<legend className="mb-4 flex items-center gap-3 text-base font-semibold">
					<span
						aria-hidden
						className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-sage text-xs text-primary"
					>
						02
					</span>
					Votre projet
				</legend>
				<div className="grid gap-5 sm:grid-cols-2">
					<div className="space-y-2 text-sm sm:col-span-2">
						<label htmlFor={`${id}-projectType`} className="font-medium">
							Type de besoin{" "}
							<span className="font-normal text-muted-foreground">
								(facultatif)
							</span>
						</label>
						<select
							id={`${id}-projectType`}
							name="projectType"
							value={formData.projectType}
							onChange={handleChange}
							className={inputClassName}
						>
							<option value="">Sélectionnez une option</option>
							{projectTypeOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
					<div className="space-y-2 text-sm">
						<label htmlFor={`${id}-gardenSurface`} className="font-medium">
							Surface du jardin{" "}
							<span className="font-normal text-muted-foreground">
								(facultatif)
							</span>
						</label>
						<select
							id={`${id}-gardenSurface`}
							name="gardenSurface"
							value={formData.gardenSurface}
							onChange={handleChange}
							className={inputClassName}
						>
							<option value="">Sélectionnez une option</option>
							{surfaceOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					</div>
					<div className="space-y-2 text-sm">
						<label htmlFor={`${id}-timeframe`} className="font-medium">
							Délai souhaité{" "}
							<span className="font-normal text-muted-foreground">
								(facultatif)
							</span>
						</label>
						<select
							id={`${id}-timeframe`}
							name="timeframe"
							value={formData.timeframe}
							onChange={handleChange}
							className={inputClassName}
						>
							<option value="">Sélectionnez une option</option>
							{timeframeOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					</div>
					<div className="space-y-2 text-sm sm:col-span-2">
						<label htmlFor={`${id}-message`} className="font-medium">
							Message{" "}
							<span className="font-normal text-muted-foreground">
								(facultatif)
							</span>
						</label>
						<textarea
							id={`${id}-message`}
							name="message"
							rows={5}
							placeholder="Ex. : jardin de 800 m² à entretenir, haie à tailler, projet de potager…"
							value={formData.message}
							onChange={handleChange}
							className="border-border bg-background w-full rounded-lg border px-4 py-3 text-sm transition-all focus:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
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
					"mt-8 w-full whitespace-normal text-center",
				)}
			>
				{status === "loading"
					? "Envoi en cours…"
					: "Demander ma visite offerte"}
			</button>
		</form>
	);
}
