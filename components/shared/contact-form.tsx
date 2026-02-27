"use client";

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
  "border-input bg-background h-11 w-full rounded-sm border px-3 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none";

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
      <div className="bg-card border-border rounded-lg border p-6 text-center space-y-4 md:p-8">
        <div className="text-primary text-4xl">&#10003;</div>
        <h3 className="text-xl font-medium">Message envoyé</h3>
        <p className="text-muted-foreground text-sm">
          Merci pour votre message. Nous vous répondons sous 48 heures.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-primary text-sm font-semibold hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form className="bg-card border-border rounded-lg border p-6 md:p-8" onSubmit={handleSubmit}>
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium sm:col-span-1">
          Nom
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
          Email
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
            <option value="conception">Conception</option>
            <option value="amenagement">Aménagement</option>
            <option value="entretien">Entretien</option>
            <option value="global">Projet complet</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium sm:col-span-2">
          Message
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Décrivez votre projet"
            value={formData.message}
            onChange={handleChange}
            className="border-input bg-background w-full rounded-sm border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          />
        </label>
      </div>

      {status === "error" && (
        <p className="text-destructive mt-4 text-sm">
          Une erreur est survenue. Veuillez réessayer ou nous contacter directement par téléphone.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 mt-6 inline-flex h-11 items-center justify-center rounded-sm px-6 text-sm font-semibold transition-colors"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer la demande"}
      </button>
    </form>
  );
}
