"use client";

import { useId, useState } from "react";
import {
	estimateMaintenanceCredit,
	formatEuroCents,
} from "@/lib/maintenance-estimate";

export function MaintenanceCreditCalculator() {
	const id = useId();
	const [amount, setAmount] = useState("200");
	const estimate = estimateMaintenanceCredit(amount);
	const invalid = amount.trim() !== "" && !estimate;
	return (
		<div className="rounded-2xl border border-primary/15 bg-background p-6 text-foreground md:p-8">
			<h3 className="text-2xl">Estimez votre crédit d’impôt</h3>
			<label
				htmlFor={`${id}-amount`}
				className="mt-5 block text-sm font-semibold"
			>
				Montant de la prestation
			</label>
			<div className="relative mt-2">
				<input
					id={`${id}-amount`}
					type="text"
					inputMode="decimal"
					value={amount}
					onChange={(event) => setAmount(event.target.value)}
					aria-invalid={invalid || undefined}
					aria-describedby={`${id}-conditions${invalid ? ` ${id}-error` : ""}`}
					className="h-12 w-full rounded-lg border border-border bg-background px-4 pr-10 text-base focus-visible:outline-2 focus-visible:outline-primary"
				/>
				<span
					aria-hidden
					className="absolute right-4 top-3 text-muted-foreground"
				>
					€
				</span>
			</div>
			{invalid && (
				<p
					id={`${id}-error`}
					role="alert"
					className="mt-2 text-sm text-destructive"
				>
					Saisissez un montant positif ou nul, avec au maximum deux décimales.
				</p>
			)}
			<div
				aria-live="polite"
				aria-atomic="true"
				className="mt-5 border-t border-primary/15 pt-5"
			>
				<p className="text-sm font-semibold">Ce que vous payez réellement</p>
				<p className="mt-2 font-serif text-4xl text-primary">
					{estimate ? formatEuroCents(estimate.remainingCents) : "À calculer"}
				</p>
				{estimate && (
					<p className="mt-3 text-sm text-muted-foreground">
						Crédit d’impôt estimé : {formatEuroCents(estimate.creditCents)}
						{estimate.capped ? " (plafond annuel appliqué)." : " (50 %)."}
					</p>
				)}
				{estimate?.capped && (
					<p className="mt-2 text-sm">
						Le calcul limite les dépenses éligibles à 5 000 € par an, soit un
						crédit maximal de 2 500 €.
					</p>
				)}
			</div>
			<p
				id={`${id}-conditions`}
				className="mt-5 text-xs leading-relaxed text-muted-foreground"
			>
				Estimation après crédit d’impôt, pour une prestation éligible et dans la
				limite de vos droits disponibles. Le calcul suppose que le plafond
				annuel de jardinage n’a pas déjà été utilisé et ne connaît pas vos
				autres dépenses ou aides. Le crédit peut être obtenu après déclaration ;
				l’avance immédiate est optionnelle et nécessite une activation.
			</p>
		</div>
	);
}
