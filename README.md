# ROSE // Secret Quest 2026

Nouvelle chasse au trésor Web familiale créée pour Rosalie. Ce projet est entièrement séparé du dépôt original `BlinkSun/tresorcache` et ne le remplace pas.

## Direction visuelle

- Style skate / pop-punk / Y2K sombre
- Damier, autocollants, ruban de sécurité et accent vert acide
- Interface mobile-first conçue pour un téléphone
- Ton plus adolescent sans perdre le côté familial

## Fonctionnement

- Neuf questions séquentielles
- Mélange de choix de réponses et de réponses écrites
- Deux niveaux d'indices
- Progression conservée avec `localStorage`
- Recherche physique d’un papier bleu avant le dernier déverrouillage
- Vidéo finale servant d’indice vers le cadeau physique
- Aucun compte, serveur, suivi ou dépendance externe

## Personnaliser le quiz

Tout le contenu modifiable se trouve dans `quiz.js` :

- questions;
- choix de réponses;
- réponses acceptées;
- indices;
- message final;
- chemin de l'image finale.

Les questions utilisent des souvenirs et habitudes propres à la famille : surnoms, nourriture, Disney, le lit superposé et un code secret caché physiquement dans la chambre.

## Indice final

La vidéo finale optimisée pour le Web se trouve dans `assets/final-clue-web.mp4`. Le fichier original du téléphone reste intact sur le bureau.

Le moteur accepte aussi une image avec la propriété `finalImage` si le concept change plus tard.

## Tester localement

Le site peut être ouvert directement avec `index.html`. Pour reproduire le comportement d'un hébergement Web :

```powershell
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## Publication

Comme la première chasse, le dossier peut être publié tel quel avec GitHub Pages. Aucun build n'est requis.

> Important : le site est statique. Les questions et leurs réponses peuvent être consultées dans le code source une fois le site public. Éviter d'y placer des informations familiales réellement sensibles.
