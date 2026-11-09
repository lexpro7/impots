# Les Impôts — Swiss Tax Trainer

Application pédagogique locale React + Vite + TypeScript + Tailwind CSS. Interface française avec traductions russes à la demande. Sans serveur applicatif ni compte utilisateur.

## Démarrer

```sh
npm install
npm run dev
```

## Vérifier et construire

```sh
npm test
npm run build
npm run preview
```

Le dossier `dist` peut être servi par un hébergeur statique. Ne pas ouvrir `index.html` directement avec `file://`.

## Contenu

- `src/data/course.ts` : 30 notions, définitions, exemples et traductions, regroupés en 5 thèmes.
- `src/data/questions.ts` : 70 questions (30 QCM, 30 vrai/faux, 10 choix multiples).
- `src/data/practice.ts` : 15 situations (12 calculs et 3 identifications).
- `src/engine.ts` : mélange, vérification exacte des choix, calcul de la note.

Les QCM de définition et les vrai/faux sont dérivés du contenu pédagogique bilingue ; ils ne nécessitent aucun service externe. Les distracteurs et les questions sont mélangés au démarrage.

## Règles pédagogiques

L’examen comporte exactement 10, 15 ou 20 questions ; le démarrage est désactivé si les filtres sélectionnés ne fournissent pas assez de questions. Aucun indice, traduction ou correction avant la fin de l’examen. Note pédagogique sur 6 : `1 + 5 × bonnes réponses / total`, arrondie au dixième. Une sélection multiple exige toutes les bonnes réponses sans choix erroné. Calculs arrondis au centime, virgule ou point acceptés.

Les modes Quiz, Practice et Mistakes donnent une correction immédiate. Les résultats et erreurs sont enregistrés à la fin de chaque session ; une session en cours est sauvegardée après chaque réponse validée. Une réponse encore en saisie n’est pas sauvegardée. Une réponse correcte en session terminée retire la question des erreurs. Les cartes marquées « Je sais » sont comptées séparément des notions simplement lues.

Les clés localStorage sont `impots-progress-v1`, `impots-session-v1` et `impots-dark`. Données limitées à ce navigateur et cette origine ; effacer le stockage du site les réinitialise. Une seule session active est conservée ; démarrer une autre session remplace la précédente.

## Sources et distinction des chiffres

70/30 et 47/33/20 sont les proportions du manuel fournies dans la demande, sans année de référence connue : elles ne sont pas présentées comme des statistiques actuelles.

Taux de TVA 8,1 %, 2,6 %, 3,8 %, en vigueur depuis 2024 ; impôt anticipé 35 % sur les rendements de capitaux mobiliers (pas sur toutes les assurances). Sources officielles vérifiées le 9 novembre 2026 :

- https://www.estv.admin.ch/fr/taux-de-la-tva-suisse
- https://www.estv.admin.ch/fr/impot-anticipe
- https://www.seco.admin.ch/fr/suppression-droits-de-douane-produits-industriels

Les calculs de bénéfice et barèmes fictifs sont des modèles scolaires simplifiés. L’application sert à réviser, pas à remplir une déclaration fiscale.

