## Thème 

### Philosophie design

Naturel, premium, épuré. Le site doit inspirer confiance et sérénité — comme un jardin bien conçu. Pas de surcharge visuelle. Laisser respirer les contenus. Les photos de réalisations sont le héros du site.

### Palette de couleurs

#### Light mode

| Rôle | Couleur | Hex | Usage |
|---|---|---|---|
| **Primary** | Vert sauge | `#4A6741` | CTA, liens, accents principaux |
| **Primary light** | Vert sauge clair | `#5C7D52` | Hover states |
| **Primary dark** | Vert profond | `#3A5233` | Active states |
| **Secondary** | Terre chaude | `#8B6914` | Accents secondaires, badges crédit d'impôt |
| **Secondary light** | Sable | `#C4A35A` | Tags, backgrounds légers |
| **Background** | Blanc cassé | `#FAFAF8` | Fond principal |
| **Surface** | Crème | `#F5F3EE` | Cartes, sections alternées |
| **Surface alt** | Gris chaud | `#EDEAE4` | Sections de contraste |
| **Text primary** | Charbon | `#1A1A18` | Titres, corps de texte |
| **Text secondary** | Gris chaud | `#6B6B63` | Sous-titres, métadonnées |
| **Text muted** | Gris léger | `#9C9C93` | Placeholders, captions |
| **Border** | Gris subtil | `#E2E0DB` | Séparateurs, bordures cartes |
| **Success** | Vert vif | `#2D8A4E` | Confirmations, formulaire envoyé |
| **Error** | Rouge terre | `#C53030` | Erreurs formulaire |

#### Dark mode

| Rôle | Couleur | Hex |
|---|---|---|
| **Primary** | Vert sauge lumineux | `#6B9B5E` |
| **Primary light** | Vert clair | `#7DB06E` |
| **Background** | Noir chaud | `#141413` |
| **Surface** | Gris très sombre | `#1E1E1C` |
| **Surface alt** | Gris sombre | `#2A2A27` |
| **Text primary** | Blanc cassé | `#F0EDE8` |
| **Text secondary** | Gris clair | `#A8A89E` |
| **Text muted** | Gris moyen | `#6E6E65` |
| **Border** | Gris sombre | `#333330` |

> Les couleurs sont chaudes (pas de gris froids ni de bleus). Tout doit évoquer la terre, le bois, le végétal.

### Typographie

| Rôle | Font | Weight | Fallback |
|---|---|---|---|
| **Titres (H1-H3)** | **Fraunces** | 400 | Georgia, serif |
| **Corps / UI** | **DM Sans** | 400, 500, 600 | system-ui, sans-serif |
| **Monospace** | JetBrains Mono | 400 | monospace |

> Fraunces apporte un caractère élégant et organique aux titres. DM Sans reste très lisible et moderne pour le corps. L'association crée un contraste premium tout en gardant une excellente lisibilité.


#### Échelle typographique

| Élément | Taille mobile | Taille desktop | Line-height | Letter-spacing |
|---|---|---|---|---|
| H1 | 2.25rem (36px) | 3.5rem (56px) | 1.1 | -0.02em |
| H2 | 1.875rem (30px) | 2.5rem (40px) | 1.15 | -0.01em |
| H3 | 1.5rem (24px) | 1.875rem (30px) | 1.2 | 0 |
| H4 | 1.25rem (20px) | 1.5rem (24px) | 1.3 | 0 |
| Body | 1rem (16px) | 1.125rem (18px) | 1.6 | 0 |
| Small | 0.875rem (14px) | 0.875rem (14px) | 1.5 | 0.01em |
| Caption | 0.75rem (12px) | 0.75rem (12px) | 1.4 | 0.02em |

### Espacements

Base unit : 4px. Utiliser les multiples Tailwind :

| Token | Valeur | Usage |
|---|---|---|
| `space-1` | 4px | Micro-gaps |
| `space-2` | 8px | Gaps internes |
| `space-3` | 12px | Padding boutons |
| `space-4` | 16px | Gap entre éléments |
| `space-6` | 24px | Sections internes |
| `space-8` | 32px | Marge entre composants |
| `space-12` | 48px | Marge entre sections (mobile) |
| `space-16` | 64px | Marge entre sections (tablet) |
| `space-24` | 96px | Marge entre sections (desktop) |
| `space-32` | 128px | Hero padding |

### Border radius

| Token | Valeur | Usage |
|---|---|---|
| `rounded-sm` | 6px | Boutons, inputs |
| `rounded-md` | 10px | Cartes |
| `rounded-lg` | 16px | Cartes mises en avant |
| `rounded-full` | 9999px | Avatars, badges |

> Pas de coins trop arrondis. Garder un rendu structuré et pro.

### Ombres

| Token | Valeur | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(26, 26, 24, 0.04)` | Inputs, badges |
| `shadow-md` | `0 4px 12px rgba(26, 26, 24, 0.06)` | Cartes |
| `shadow-lg` | `0 8px 24px rgba(26, 26, 24, 0.08)` | Cartes au hover, modales |
| `shadow-xl` | `0 16px 48px rgba(26, 26, 24, 0.1)` | Dropdowns, popovers |

> Ombres subtiles et chaudes (basées sur le charbon, pas du noir pur).

### Boutons

| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| **Primary** | `primary` | `white` | none | `primary-light` + shadow-md |
| **Secondary** | `transparent` | `primary` | `primary` | `surface` bg |
| **Ghost** | `transparent` | `text-secondary` | none | `surface` bg |

Padding : `12px 24px`. Font-weight : 500. Border-radius : `rounded-sm`. Transition : 200ms ease.

### Animations & transitions

- **Durée standard** : 200ms
- **Durée longue** : 400ms (ouverture menu, modales)
- **Easing** : `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out naturel)
- **Scroll animations** : fade-in + léger slide-up (12px) au scroll, via Intersection Observer
- **Compteurs** : Animation progressive sur les chiffres clés (count up)
- **Pas de parallax lourd**. Garder la sobriété.

### Images

- Format : WebP avec fallback AVIF si supporté
- Qualité : 80 %
- Aspect ratios cohérents : 16/9 pour les héros, 4/3 pour les cartes, 1/1 pour les avatars
- Traitement : aucun filtre. Les photos de Jessy sont naturelles, les garder telles quelles
- Placeholder : blur hash (via `next/image` placeholder="blur")

### Breakpoints

| Token | Valeur | Description |
|---|---|---|
| `sm` | 640px | Mobile large |
| `md` | 768px | Tablette |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Desktop large |
| `2xl` | 1536px | Ultrawide |

Container max-width : **1280px** avec padding horizontal de 16px (mobile) / 24px (desktop).

### Iconographie

- Set : **Phosphor** (déjà intégré avec shadcn/ui)
- Taille standard : 20px
- Stroke-width : 1.5
- Pas d'emojis dans l'interface (contrairement au site actuel)

### Logo

- Récupérer le logo vectoriel auprès de Jessy (SVG)
- Prévoir 2 variantes : light mode (logo sombre) / dark mode (logo clair)
- Taille header : hauteur 40px max
- Taille footer : hauteur 32px max

---

## CSS Variables (shadcn/ui compatible)

```css
@layer base {
  :root {
    --background: 60 11% 97%;        /* #FAFAF8 */
    --foreground: 60 5% 10%;          /* #1A1A18 */
    --card: 43 14% 94%;               /* #F5F3EE */
    --card-foreground: 60 5% 10%;
    --popover: 60 11% 97%;
    --popover-foreground: 60 5% 10%;
    --primary: 108 22% 33%;           /* #4A6741 */
    --primary-foreground: 0 0% 100%;
    --secondary: 43 73% 31%;          /* #8B6914 */
    --secondary-foreground: 0 0% 100%;
    --muted: 40 10% 90%;              /* #EDEAE4 */
    --muted-foreground: 60 3% 41%;    /* #6B6B63 */
    --accent: 40 10% 90%;
    --accent-foreground: 60 5% 10%;
    --destructive: 0 70% 48%;         /* #C53030 */
    --destructive-foreground: 0 0% 100%;
    --border: 40 7% 87%;              /* #E2E0DB */
    --input: 40 7% 87%;
    --ring: 108 22% 33%;
    --radius: 0.625rem;
  }

  .dark {
    --background: 60 4% 8%;           /* #141413 */
    --foreground: 40 12% 93%;         /* #F0EDE8 */
    --card: 60 4% 12%;                /* #1E1E1C */
    --card-foreground: 40 12% 93%;
    --popover: 60 4% 12%;
    --popover-foreground: 40 12% 93%;
    --primary: 108 25% 48%;           /* #6B9B5E */
    --primary-foreground: 0 0% 100%;
    --secondary: 43 73% 31%;
    --secondary-foreground: 0 0% 100%;
    --muted: 60 4% 16%;               /* #2A2A27 */
    --muted-foreground: 50 3% 64%;    /* #A8A89E */
    --accent: 60 4% 16%;
    --accent-foreground: 40 12% 93%;
    --destructive: 0 70% 48%;
    --destructive-foreground: 0 0% 100%;
    --border: 60 3% 20%;              /* #333330 */
    --input: 60 3% 20%;
    --ring: 108 25% 48%;
  }
}
```

---

## Principes visuels clés

1. **Blanc cassé, pas blanc pur** — Le fond n'est jamais #FFFFFF. Toujours une teinte chaude.
2. **Vert sauge, pas vert vif** — Le vert est désaturé, organique, pas un vert néon ou plastique.
3. **Accents terre** — L'or/sable apporte chaleur et premium sans tomber dans le luxe.
4. **Photos en héros** — Les photos de réalisations sont les plus beaux assets du site. Les mettre en valeur avec de l'espace.
5. **Animations subtiles** — Tout bouge légèrement au scroll, rien ne flashe.
6. **Mobile first** — 80 %+ du trafic sera mobile. Chaque composant est d'abord pensé en 375px.
