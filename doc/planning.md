# roadmap.md — Plan du projet Permapaysage

> Début : 24/02/2026 (lendemain signature)
> Deadline devis : 10 jours ouvrés → **07/03/2026**
> Contexte : alternance en parallèle, avancement mi-temps

---

## J1 — Lun 24/02 · Setup + Maquette → Jessy

**Objectif : envoyer le lien preview à Jessy le soir même.**

- [ ] Init Next.js 16, Tailwind v4, shadcn/ui, TypeScript strict
- [ ] Structure dossiers (voir claude.md)
- [ ] `next/font` : DM Serif Display + DM Sans
- [ ] CSS variables shadcn (light + dark, voir theme.md)
- [ ] Toggle dark mode
- [ ] Layout global : Header + Footer + Nav mobile
- [ ] Page d'accueil (maquette) :
  - [ ] Hero (tagline, CTA, image placeholder)
  - [ ] Section services (3 cartes)
  - [ ] Section processus (5 étapes)
  - [ ] Section chiffres clés
  - [ ] Section avis clients
  - [ ] Section CTA contact
- [ ] Déployer sur Vercel (preview URL)
- [ ] **📧 Envoyer le lien preview à Jessy pour validation direction**

## J2 — Mar 25/02 · Pages services

- [ ] Page Conception (hero, contenu, galerie placeholder, CTA)
- [ ] Page Aménagement (hero, contenu, types d'aménagements, CTA)
- [ ] Page Entretien (hero, prestations, crédit d'impôt, FAQ, CTA)
- [ ] Breadcrumbs
- [ ] Skip to content link

## J3 — Mer 26/02 · Sanity + Blog + Réalisations

- [ ] Setup Sanity (projet, client, types)
- [ ] Schemas : article, realisation, avis, faq
- [ ] Sanity Studio (embarqué /studio ou externe)
- [ ] Page Blog : liste + page article
- [ ] Page Réalisations : grille filtrable + page détail
- [ ] Injecter les contenus de test (1-2 articles, 3-4 réalisations, avis réels)

## J4 — Jeu 27/02 · Contact + Pages SEO villes

- [ ] Page Contact :
  - [ ] Formulaire Web3Forms (nom, email, tel, besoin, message)
  - [ ] Carte Leaflet zone d'intervention
  - [ ] Coordonnées + horaires
- [ ] Template dynamique `/paysagiste-[ville]`
  - [ ] Contenu unique par ville
  - [ ] generateStaticParams (10 villes prioritaires)
  - [ ] Schema.org LocalBusiness + areaServed
- [ ] Pages légales (mentions légales, CGV, politique cookies)
- [ ] Bandeau cookies RGPD

## J5 — Ven 28/02 · SEO complet + Polish

- [ ] Sitemap XML automatique
- [ ] robots.txt
- [ ] Balises canoniques toutes pages
- [ ] Metadata unique par page (title, description)
- [ ] Open Graph + Twitter Cards toutes pages
- [ ] Alt sur 100 % des images
- [ ] Structure Hn vérifiée (1 H1/page)
- [ ] Schema.org : LocalBusiness, Service, FAQ, Article, Review
- [ ] hreflang fr
- [ ] Analytics (Vercel Analytics ou Plausible)
- [ ] llms.txt

---

**📧 Fin de semaine 1 : site complet sur preview. Envoyer à Jessy pour retour.**
**💰 Demander acompte 2/3 (496,67 €).**

---

## J6-J7 — Lun 03/03 – Mar 04/03 · Retours client + ajustements

- [ ] Intégrer les retours de Jessy (textes, photos, couleurs, dispositions)
- [ ] Ajustements responsive (mobile, tablette, desktop)
- [ ] Ajustements dark mode
- [ ] Remplacement des images placeholder par les vraies photos
- [ ] Récupérer le logo SVG auprès de Jessy

## J8 — Mer 05/03 · Tests & optimisation

- [ ] Lighthouse 90+ toutes pages (Performance, A11y, SEO, Best Practices)
- [ ] Test responsive complet
- [ ] Test dark mode complet
- [ ] Test formulaire contact (envoi réel)
- [ ] Navigation clavier OK
- [ ] Contraste WCAG AA vérifié
- [ ] Core Web Vitals validés
- [ ] Vérification liens morts

## J9 — Jeu 06/03 · Déploiement production

- [ ] Validation finale client sur preview
- [ ] Pointage DNS OVH → Vercel
- [ ] SSL actif
- [ ] Vérifier que permapaysage.com + www pointe correctement
- [ ] Google Search Console : indexation + soumission sitemap
- [ ] Redirection ancien site Odoo (si nécessaire)

## J10 — Ven 07/03 · Livraison

- [ ] Démo Sanity Studio à Jessy (visio ou écran partagé)
- [ ] Transmission accès : GitHub (repo), Vercel (projet), Sanity (studio)
- [ ] **💰 Facture solde (496,66 €)**
- [ ] Mail de livraison avec récap de tout ce qui a été fait

---

## Jalons

| Date | Jalon |
|---|---|
| 23/02 ✅ | Signature devis + acompte 1/3 (496,67 €) |
| **24/02** | **Envoi maquette preview à Jessy** |
| **28/02** | **Site complet sur preview + demande acompte 2/3** |
| 03-04/03 | Intégration retours client |
| 05/03 | Tests & optimisation |
| **06/03** | **Mise en ligne production** |
| **07/03** | **Livraison finale + démo Sanity + facture solde** |

---

## Risques & buffers

| Risque | Impact | Mitigation |
|---|---|---|
| Jessy tarde à envoyer les photos/logo | Bloque J6-J7 | Lui demander dès J1 |
| Retours client importants | Déborde sur J8 | Preview envoyé tôt (J1) pour anticiper |
| Problème DNS OVH | Retarde mise en ligne | Préparer config DNS à l'avance (J5) |
| Charge alternance imprévue | Perte d'un jour | Buffer J8 = sécurité |
