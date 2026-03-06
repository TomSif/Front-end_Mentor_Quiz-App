## Session 2026-03-06 (matin) — Results.jsx + barre de progression

### ✅ Étapes accomplies

- `Results.jsx` créé : affichage score, total questions, `SubjectBadge`, bouton "Play Again"
- Câblage `subject` et `icon` dans App → Results (ajout props)
- Correction `Home.jsx` : `onStart(title, icon)` — deux arguments séparés (et non l'objet complet)
- `App.jsx` : `icon` state ajouté + passé à Header et Results
- Barre de progression dans `Quiz.jsx` : calcul `((questionIndex + 1) / totalQuestions) * 100`, rendu via `style={{ width: \`${length}%\` }}`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Props comme tuyaux isolés — chaque instance reçoit ses propres props | Consolidée | Déclic clair : "SubjectBadge dans Header fonctionne, donc il fonctionne partout" — gap corrigé après explication |
| Flux de données descendant — ce qu'un composant reçoit dépend de ce qu'on lui passe | Révisée | Bien compris une fois le cas concret posé |
| Vérification du type de donnée remontée par un callback | Nouvelle | `onStart(title)` vs `onStart(data.quizzes[index])` — a nécessité de relire le code pour confirmer. TypeScript aurait rendu ça explicite |
| Barre de progression avec `style` inline | Nouvelle | Calcul pourcentage + `style={{ width }}` — écrit sans aide |

### ⚠️ Notions faussement acquises détectées

- **Réutilisation d'un composant ≠ héritage des données** : pensait que `<SubjectBadge>` dans Results récupèrerait automatiquement les données déjà passées à Header. Confusion entre réutilisation du composant (code partagé) et partage des données (qui ne coule jamais automatiquement).

### 🔄 Étapes restantes

- Dark mode : classes `dark:` à compléter sur Quiz et Results
- Responsive : vérification layout desktop Quiz et Results
- Accessibilité : `legend` sémantique à corriger
- Nettoyage : `console.log(score)` dans `useEffect` à supprimer

### 📈 Évaluation de session

- **Points solides :** `Results.jsx` posé quasi autonomement. Barre de progression écrite sans aide. Bonne auto-régulation (arrêt volontaire avant saturation).
- **Points fragiles :** Modèle mental "props isolées par instance" pas encore complètement ancré — a surpris sur SubjectBadge. Tendance à multiplier les states dans App plutôt que de passer un objet complet (fonctionne, mais moins élégant).
- **Priorité pour la prochaine session :** Dark mode Quiz + Results — classes `dark:` à compléter.

### 💬 Notes de contexte

- `subject` dans App est une string (titre), pas l'objet complet — choix fait en cours de route, cohérent avec `.find()` dans Quiz
- `icon` stocké en state séparé dans App — fonctionne, légère sur-fragmentation de l'état global
- Session courte volontaire — bonne décision, concentration préservée pour session de l'après-midi

---

## Session 2026-03-05 — Quiz.jsx : logique interactive complète

### ✅ Étapes accomplies

- `selectedAnswer` + `hasSubmited` states ajoutés
- `calculateScore()` : forme fonctionnelle `setScore(prev => prev + 1)` — corrigé depuis `var` + opérateur `+=`
- `useEffect` pour `onFinish(score)` sur la dernière question — résout le bug async setState
- Bouton unique à double comportement : "Submit Answer" / "Next Question" / "See Results" selon `hasSubmited` et `questionIndex`
- `onClick` conditionnel : soumission au 1er clic, avance au 2e (avec reset des states uniquement si pas dernière question)
- États visuels des options : bordure violette (selected), verte (correct), rouge (incorrect), transparente (idle) — logique ternaire imbriquée
- Icônes ✓ / ✗ affichées après soumission + placeholder `w-6` pour éviter le layout shift
- `disabled={hasSubmited}` sur les boutons option pour bloquer le reclic après soumission

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `useEffect` pour effet de bord sur changement de state | Nouvelle | Utilisé pour résoudre le bug async setState sur `onFinish(score)` — bien compris pourquoi ça résout le problème |
| Tableau de dépendances `useEffect` | Nouvelle | Toutes les variables lues dans l'effet listées — raisonnement correct |
| Async setState — valeur stale dans closure | Nouvelle | Compris que `console.log(score)` après `setScore` montre l'ancienne valeur. Notion à consolider |
| Ternaire imbriqué pour états visuels multiples | Révisée | 4 cas (selected/correct/incorrect/transparent) gérés proprement dans le className |
| `active:` CSS vs état persistant JS | Nouvelle | Compris que `:active` est éphémère — un état "sélectionné qui persiste" nécessite JS |
| `var` obsolète en JS moderne | Révisée | Utilisé spontanément, corrigé — réflexe à ancrer |
| Forme fonctionnelle `setState(prev => prev + 1)` | Révisée | Compris et appliqué correctement |

### ⚠️ Notions faussement acquises détectées

- **`var` en JS moderne** : utilisé spontanément dans `calculateScore`. Pas une notion "faussement acquise" au sens strict, mais un vieux réflexe qui remonte — à surveiller.
- **Async setState** : le comportement de `console.log(score)` après `setScore` a surpris. La notion de valeur stale dans une closure React n'était pas ancrée.

### 🔄 Étapes restantes

- `Results.jsx` : affichage score final + bouton rejouer
- Barre de progression (`questionIndex / totalQuestions`)
- Dark mode : classes `dark:` à compléter sur Quiz et Results
- Responsive : vérification layout desktop Quiz
- Accessibilité : `legend` contenu sémantique à corriger (actuellement "X out of Y" — devrait décrire le groupe)

### 📈 Évaluation de session

- **Points solides :** Logique interactive posée de façon autonome. Ternaires imbriqués pour les états visuels écrits sans aide. Réflexe de commit avant refactoring risqué. `!hasSubmited` ajouté spontanément pour corriger le comportement de la bordure violette.
- **Points fragiles :** Async setState — notion vue aujourd'hui, pas encore ancrée. Le bug de `questionIndex === totalQuestions` (crash potentiel) aurait pu passer sans détection.
- **Priorité pour la prochaine session :** `Results.jsx` — affichage du score + bouton rejouer. Puis barre de progression.

### 💬 Notes de contexte

- Solution bouton unique à double comportement trouvée par l'utilisateur — plus élégante que deux boutons séparés
- `onFinish(score)` géré par `useEffect` : Score correct garanti car l'effet s'exécute après le rendu avec les states à jour
- "See Results" ne sera probablement jamais cliqué (useEffect déclenche avant) mais sert de fallback cohérent
- `hasSubmited` comme garde dans `disabled` du bouton Submit évite le double scoring

---

## Session 2026-03-04 (après-midi) — Quiz.jsx : affichage de base

### ✅ Étapes accomplies

- `Quiz.jsx` : `questionIndex` state, `currentQuiz.find()`, `currentQuestion`, `totalQuestions` — structure de données posée correctement
- Affichage "X out of Y" en texte
- `.map()` sur `options` avec `iconLetters[index]` en parallèle — options affichées avec badge lettre (A/B/C/D)
- Bouton option stylé avec dark mode (`dark:bg-blue-850`, `dark:text-white`)
- `App.jsx` : `subject` passé en prop à `<Quiz>`, `onFinish(finalScore)` câblé → `setScore` + `setCurrentView("results")`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Import JSON + `.find()` | Révisée | Utilisé sans aide — bonne consolidation |
| `.map()` avec `index` double (données + lettre) | Révisée | `iconLetters[index]` en parallèle du `.map()` sur `options` — pattern correct |
| `useState` pour index courant | Révisée | Structure posée proprement |
| Callback `onFinish` reçu en prop | Révisée | Câblage App ↔ Quiz correct |

### ⚠️ Notions faussement acquises détectées

- Aucune détectée cette session

### 🔄 Étapes restantes

- `Quiz.jsx` : `selectedAnswer` state + clic sur option → mise à jour état
- `Quiz.jsx` : `hasSubmitted` state → bouton Submit → vérification contre `currentQuestion.answer`
- `Quiz.jsx` : incrément score si correct, `onFinish(score)` quand toutes les questions épuisées
- `Quiz.jsx` : barre de progression (`questionIndex / totalQuestions`)
- `AnswerOption.jsx` : 5 états visuels (idle, selected, correct, incorrect, disabled)
- `Results.jsx` : affichage score final + bouton rejouer
- Dark mode : classes `dark:` à compléter sur Quiz et Results

### 📈 Évaluation de session

- **Points solides :** Structure Quiz posée proprement. `.find()` + `.map()` avec index double sans aide. Câblage App ↔ Quiz correct (`subject` en prop, `onFinish` reçu).
- **Points fragiles :** Logique interactive (sélection, soumission, vérification, score) pas encore abordée — c'est le cœur fonctionnel du composant.
- **Priorité pour la prochaine session :** `selectedAnswer` state → clic sur option → `hasSubmitted` → bouton Submit → vérification → next/finish. Écriture autonome.

### 💬 Notes de contexte

- Session courte, arrêt volontaire avant la partie logique (fatigue)
- La barre de progression laissée pour la fin — visuel simple une fois la logique en place
- `onFinish` déjà câblé dans App — Quiz n'a qu'à l'appeler au bon moment

---

## Session 2026-03-03 — App.jsx + Header + SubjectBadge

### ✅ Étapes accomplies

- `App.jsx` : boilerplate Vite vidé, 4 states (`currentView`, `score`, `mode`, `subject`), `toggleMode`, pattern objet `views[currentView]`, callbacks `onStart`/`onFinish`/`onRestart` correctement câblés
- `src/components/` créé avec 3 stubs : `Home.jsx`, `Quiz.jsx`, `Results.jsx`
- `Header.jsx` : balise `<header>` sémantique, toggle dark/light avec `role="switch"` + `aria-checked`, thumb animé avec `translate-x`, icônes soleil/lune SVG, `SubjectBadge` conditionnel (`{subject && ...}`)
- `SubjectBadge.jsx` créé — composant réutilisable (Header + SubjectCard à venir)
- `index.css` : `@variant dark` ajouté pour toggle manuel via classe `.dark` sur `<html>`, tokens renommés `--colors-*` → `--color-*`
- `onStart` corrigé pour transporter `chosenSubject` jusqu'à `setSubject` dans App

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Pattern objet `views[currentView]` | Nouvelle | Alternative propre aux chaînes de ternaires — lookup direct |
| Callback pattern (props fonctions) | Révisée | A nécessité une session avec Claude en ligne avant de comprendre — notion fragile |
| `role="switch"` + `aria-checked` | Nouvelle | Sémantique ARIA pour toggle accessible |
| `translate-x` conditionnel pour thumb | Nouvelle | Plus fiable que flex alignment pour positionner un cercle dans un track |
| `@variant dark` Tailwind v4 | Nouvelle | Remplace `darkMode: 'class'` de Tailwind v3 — une ligne dans CSS |
| `document.documentElement.classList.toggle()` | Nouvelle | Applique `.dark` sur `<html>` pour activer les classes `dark:` Tailwind |
| Prop vs callback — distinction de placement | Révisée | Confusion initiale : `score={score}` mis à l'intérieur du callback `onRestart` au lieu d'être une prop directe sur `<Results>` |
| `useState(null)` + rendu conditionnel | Révisée | `{subject && <SubjectBadge />}` — pattern correct pour état absent |
| Variants composant — objet JS vs `@utility` | Nouvelle | Décision : variants d'un composant restent dans le composant (objet JS), pas dans le CSS global |

### ⚠️ Notions faussement acquises détectées

- **Callback pattern** : le flux de données descendant/remontant (prop fonction appelée dans l'enfant, résultat remonté au parent) n'était pas ancré. A requis une session externe avant d'être opérationnel. À surveiller en Quiz et Results.
- **Prop vs placement dans handler** : a placé `score={score}` à l'intérieur du callback `onRestart` — confusion entre "passer une donnée à un composant" et "exécuter une action au clic".

### 🔄 Étapes restantes

- `Home.jsx` : import `data.json`, map des sujets → `SubjectCard`, appel `onStart(subject)`
- `SubjectCard.jsx` : composant cliquable avec `SubjectBadge` intégré
- `Quiz.jsx` : affichage question + progress, liste `AnswerOption`
- `AnswerOption.jsx` : 5 états visuels (idle, selected, correct, incorrect, disabled)
- `Results.jsx` : score final, bouton rejouer
- Logique de vérification des réponses + comptage score
- `subject` passé en prop à `Quiz` (manquant actuellement dans App.jsx)
- Dark mode : classes `dark:` à appliquer sur tous les composants
- Navigation clavier / accessibilité (`useRef` pour focus management)

### 📈 Évaluation de session

- **Points solides :** Choix architecturaux tous corrects et autonomes (objet views, subject state, où appeler setSubject, SubjectBadge comme composant partagé). Balise sémantique (`<header>`) adoptée spontanément. Dark mode câblé proprement.
- **Points fragiles :** Callback pattern — a eu besoin d'aide externe. Confusion prop/handler sur `score`. Ces deux points sont liés : la circulation des données entre composants reste instable.
- **Priorité pour la prochaine session :** `Home.jsx` — import JSON, map de données, `onStart(subject)` appelé depuis `SubjectCard`. Écriture autonome.

### 💬 Notes de contexte

- `subject` n'est pas encore passé en prop à `<Quiz>` dans App.jsx — à corriger en session 3 quand Quiz sera développé
- `SubjectBadge` utilisé dans Header, sera aussi utilisé dans SubjectCard — décision de composition validée
- `--color-*` (sans 's') est la convention correcte Tailwind v4 dans `@theme`

---

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
