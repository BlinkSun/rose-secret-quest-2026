"use strict";

/*
 * This is the only file that needs to change when we finalize the quiz.
 * Keep family-specific content in this file so the interface and game engine
 * can evolve independently from the quiz.
 */

const questConfig = {
    storageKey: "rosalie-secret-quest-2026-v2",
    finalMessage: "Le Web n’était que le début. Le vrai cadeau est maintenant à portée de main.",
    finalVideo: "assets/final-clue-web.mp4",
    finalImage: ""
};

const missions = [
    {
        icon: "11",
        category: "PAPA",
        title: "La date à ne pas oublier",
        story: "On commence avec une classique. Quelle est la date de fête de Damien?",
        type: "choice",
        choices: [
            { id: "jan-11", label: "11 janvier" },
            { id: "feb-14", label: "14 février" },
            { id: "oct-31", label: "31 octobre" }
        ],
        answer: "jan-11",
        smallHint: "C’est vraiment au début de l’année.",
        strongHint: "Le mois est janvier et le jour est 11."
    },
    {
        icon: "M",
        category: "À LA MAISON",
        title: "Le nom secret",
        story: "Comment Damien appelle-t-il affectueusement Marie-Ève?",
        type: "text",
        answers: ["mamou"],
        smallHint: "C’est un surnom qui commence par M.",
        strongHint: "Le surnom est MAMOU."
    },
    {
        icon: "B+D",
        category: "NOUS DEUX",
        title: "Plus qu’un simple mot",
        story: "Quel nom Damien préfère-t-il utiliser pour décrire la place spéciale de Rosalie dans sa vie?",
        type: "choice",
        choices: [
            { id: "sidekick", label: "Sa sidekick officielle" },
            { id: "bonus", label: "Sa Bonus Daughter" },
            { id: "boss", label: "La boss de la maison" }
        ],
        answer: "bonus",
        smallHint: "Le mot important veut dire qu’elle est un cadeau de plus dans sa vie.",
        strongHint: "La réponse est Bonus Daughter."
    },
    {
        icon: "↑",
        category: "LA CHAMBRE",
        title: "Changement d’étage",
        story: "Dans le lit superposé, Victoria dormait avant en haut et Rose en bas. Elles ont récemment changé de place. Qui dort maintenant en haut?",
        type: "choice",
        choices: [
            { id: "rose", label: "Rose" },
            { id: "victoria", label: "Victoria" },
            { id: "papa", label: "Papa, quand il veut la paix" }
        ],
        answer: "rose",
        smallHint: "La réponse a changé récemment.",
        strongHint: "Rose est maintenant rendue en haut."
    },
    {
        icon: "00",
        category: "MENU DE ROSE",
        title: "La sauce interdite",
        story: "Quand Rose mange des pâtes alimentaires, comment les préfère-t-elle?",
        type: "choice",
        choices: [
            { id: "plain", label: "Blanches, sans aucune sauce" },
            { id: "tomato", label: "Avec beaucoup de sauce tomate" },
            { id: "alfredo", label: "Noyées dans la sauce Alfredo" }
        ],
        answer: "plain",
        smallHint: "Moins il y en a dessus, mieux c’est.",
        strongHint: "Elle les mange blanches. Zéro sauce."
    },
    {
        icon: "BLN",
        category: "MENU DE ROSE",
        title: "Le sandwich officiel",
        story: "Quelle viande mérite sa place dans une bonne sandwich selon Rose?",
        type: "choice",
        choices: [
            { id: "baloney", label: "Du baloney" },
            { id: "turkey", label: "De la dinde fumée" },
            { id: "tuna", label: "Du thon" }
        ],
        answer: "baloney",
        smallHint: "Un grand classique rose pâle de lunch.",
        strongHint: "Une bonne sandwich au BALONEY."
    },
    {
        icon: "D",
        category: "SOUVENIR",
        title: "Le royaume magique",
        story: "Rose est allée à Disney quand elle était très jeune. Avec qui a-t-elle vécu cette aventure?",
        type: "choice",
        choices: [
            { id: "grandparents", label: "Ses grands-parents" },
            { id: "school", label: "Son école" },
            { id: "friends", label: "Une gang d’amies" }
        ],
        answer: "grandparents",
        smallHint: "Ce sont deux personnes très importantes d’une génération avant ses parents.",
        strongHint: "Elle y est allée avec ses grands-parents."
    },
    {
        icon: "P",
        category: "LA FAMILLE",
        title: "Son nom dans la gang",
        story: "Quel petit surnom toute la famille donne-t-elle à Rose?",
        type: "text",
        answers: ["puce", "la puce", "ma puce"],
        smallHint: "C’est aussi le nom d’un minuscule insecte qui saute.",
        strongHint: "Tout le monde l’appelle PUCE."
    },
    {
        icon: "IRL",
        category: "FINAL BOSS // HORS ÉCRAN",
        title: "Le code bleu",
        story: "Le dernier mot secret n’est pas caché sur ce site. Un petit papier bleu t’attend quelque part dans ta chambre. Trouve-le, puis entre le mot écrit dessus.",
        visual: "PAPIER BLEU // UN SEUL MOT",
        type: "text",
        answers: ["soleil", "le soleil"],
        smallHint: "Installe-toi dans ton lit du haut et regarde le mur à ta gauche.",
        strongHint: "Cherche dans le petit bac noir en plastique vissé au mur, celui qui sert de petite case de rangement.",
        successMessage: "CODE ACCEPTÉ. La vidéo secrète est déverrouillée. ★"
    }
];
