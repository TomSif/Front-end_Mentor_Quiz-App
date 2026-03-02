## Session 2026-03-02 — Architecture & Setup

### ✅ Étapes accomplies

- Réflexion architecturale complète avant tout code : flow utilisateur, données, états globaux, variants UI, navigation
- Décision de navigation : conditional rendering avec `currentView` en state — React Router écarté (app linéaire, pas de besoin de deep linking)
- Décision scoring : compteur `score` simple (number), pas d'objet intermédiaire
- Décision composants : `Button`, `SubjectCard`, `AnswerOption` identifiés comme composants distincts
- Configuration `index.css` : `@font-face` pour les 4 poids Rubik, `@theme` avec une seule variable `--font-rubik` et toutes les couleurs, text presets desktop + mobile via `@utility`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `@font-face` multi-poids | Révisée | Confusion initiale : croyait devoir "relier" les variables aux poids. Compris que le navigateur mappe automatiquement via `font-weight` |
| Variables CSS dans `@theme` Tailwind v4 | Révisée | Simplifié à une seule `--font-rubik` après avoir compris que les poids ne sont pas dans la font-family |
| `@utility` Tailwind v4 | Nouvelle | Text presets combinant font-family, weight, size, line-height — idiomatique v4 |
| Architecture d'état React | Révisée | Flow de pensée correct : données → états globaux → variants UI → découpage composants |
| Type union pour états UI | Nouvelle | `'idle' \| 'selected' \| 'correct' \| 'incorrect' \| 'disabled'` — modèle mental plus juste que "ternary" |

### ⚠️ Notions faussement acquises détectées

- **`@font-face` et poids multiples** : croyait avoir besoin de 4 variables CSS distinctes (`--font-light`, `--font-regular`, etc.) pour "relier" chaque variable au bon fichier. En réalité, tous les poids partagent le même nom de famille ; c'est `font-weight` seul qui déclenche le bon fichier.
- **"Ternary" pour états UI multiples** : utilisé comme modèle mental pour les états des boutons réponse. Un ternaire est binaire — les options de réponse ont 5 états distincts, ce qui appelle un type union ou une valeur string à plusieurs cas.

### 🔄 Étapes restantes

- Structure des dossiers et fichiers du projet
- Composant `App.jsx` avec `currentView` et navigation de base
- Vue `Home` : liste des sujets
- Composant `SubjectCard`
- Vue `Quiz` : affichage question + options
- Composant `AnswerOption` avec tous ses états visuels
- Composant `Button`
- Vue `Results`
- Logique de vérification des réponses + score
- Dark mode (bonus)
- Navigation clavier / accessibilité

### 📈 Évaluation de session

- **Points solides :** Raisonnement architectural autonome et pertinent. Les décisions (navigation, scoring, découpage composants) étaient bien posées, parfois avec une légère sur-complexification corrigée rapidement. La configuration CSS est propre et idiomatique.
- **Points fragiles :** Modèle mental `@font-face` (gap comblé en session). Tendance à sur-ingénierer le scoring (objet intermédiaire inutile).
- **Priorité pour la prochaine session :** Démarrer `App.jsx` avec le state `currentView` et le rendu conditionnel des 3 vues — écriture autonome, sans aide sauf si bloqué.

### 💬 Notes de contexte

- Sans TypeScript : confirmé, pas de retour en arrière prévu sur ce projet
- Responsive : presets mobile = default, desktop avec prefix `md:` — pattern à appliquer systématiquement
- `monospace` comme fallback dans `--font-rubik` : à surveiller, `sans-serif` serait plus cohérent sémantiquement

---

## Project Kickoff — 2026-03-02 — Frontend Quiz App

### Stack retenue

- React 19 + Vite + Tailwind CSS v4
- **Sans TypeScript** — décision délibérée : syntaxe encore en reconsolidation, risque de démotivation trop élevé à ce stade. Réévaluation envisagée sur un prochain projet quand la fluidité React sera plus stable.

### Contexte utilisateur au démarrage

- Vient de terminer 2 projets React + Tailwind — réflexes qui reviennent, notions présentes, syntaxe encore fragile
- 17 jours de sessions quotidiennes (2–4h le matin) — régularité à protéger en priorité
- Pas de mémoire photographique des syntaxes, mais les notions et les choix architecturaux sont intacts
- Motivation principale : maintenir l'élan, progresser lentement plutôt que stopper

### Auto-évaluation initiale des notions clés

| Notion | Auto-évaluation | Commentaire |
|--------|----------------|-------------|
| Architecture composants | Confiant | Choix archi présents |
| Props et passage de données | Confiant | |
| useState | Confiant | Syntaxe à reconsolider |
| useEffect | Rouillé | À travailler explicitement |
| useRef | Rouillé | À pratiquer via navigation clavier (exigence du projet) |
| Rendu conditionnel | Confiant | |
| Import JSON + mapping de données | Confiant | |
| Tailwind v4 | En cours de reconsolidation | 2 projets récents |
| Responsive (3 breakpoints) | Confiant | |
| Dark/light theme toggle (bonus) | Rouillé | |
| Accessibilité / navigation clavier | Peu pratiqué | Exigence explicite du projet |
| TypeScript | Ne connaît pas | Reporté volontairement |

### Priorités identifiées pour ce projet

1. Reconsolider `useEffect` (timing, dépendances, cleanup)
2. Pratiquer `useRef` dans un contexte réel (gestion du focus / keyboard nav)
3. Maintenir la régularité — sessions courtes et focalisées, un concept à la fois
