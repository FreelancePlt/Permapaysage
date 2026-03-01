"use client";

import { CheckCircleIcon } from "@phosphor-icons/react";
import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

type FormData = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
};

const initialFormData: FormData = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  message: "",
};

const inputClassName =
  "border-border bg-background h-12 w-full rounded-lg border px-4 text-sm transition-all focus:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `Nouveau message de ${formData.name} — Permapaysage`,
          from_name: "Permapaysage.com",
          ...formData,
          botcheck: "",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData(initialFormData);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center space-y-4 md:p-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircleIcon size={32} weight="fill" className="text-primary" />
        </div>
        <h3 className="text-xl font-medium">Message envoyé</h3>
        <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
          Merci pour votre message. Nous vous répondons sous 48 heures pour organiser un premier échange.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8" onSubmit={handleSubmit}>
      <h3 className="text-lg font-medium">Demande de devis gratuit</h3>
      <p className="text-muted-foreground mt-1 text-sm">Tous les champs marqués sont obligatoires.</p>

      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium sm:col-span-1">
          Nom *
          <input
            type="text"
            name="name"
            required
            placeholder="Votre nom"
            value={formData.name}
            onChange={handleChange}
            className={inputClassName}
          />
        </label>
        <label className="space-y-2 text-sm font-medium sm:col-span-1">
          Téléphone
          <input
            type="tel"
            name="phone"
            placeholder="06 00 00 00 00"
            value={formData.phone}
            onChange={handleChange}
            className={inputClassName}
          />
        </label>
        <label className="space-y-2 text-sm font-medium sm:col-span-2">
          Email *
          <input
            type="email"
            name="email"
            required
            placeholder="vous@email.fr"
            value={formData.email}
            onChange={handleChange}
            className={inputClassName}
          />
        </label>
        <label className="space-y-2 text-sm font-medium sm:col-span-2">
          Type de besoin
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={inputClassName}
          >
            <option value="" disabled>
              Sélectionnez une option
            </option>
            <option value="conception">Conception de jardin</option>
            <option value="amenagement">Aménagement des extérieurs</option>
            <option value="entretien">Entretien des espaces verts</option>
            <option value="global">Projet complet</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium sm:col-span-2">
          Message *
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Décrivez votre projet, vos envies et vos contraintes..."
            value={formData.message}
            onChange={handleChange}
            className="border-border bg-background w-full rounded-lg border px-4 py-3 text-sm transition-all focus:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          />
        </label>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-destructive">
          Une erreur est survenue. Veuillez réessayer ou nous contacter directement par téléphone.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg disabled:opacity-50 sm:w-auto sm:px-8"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer la demande"}
      </button>
    </form>
  );
}
