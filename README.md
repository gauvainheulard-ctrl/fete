# Fête de la Dépression - Site d'inscription

Site web pour gérer les inscriptions à la fête du 25 février 2025 à 10h.

## Fonctionnalités

- Formulaire d'inscription avec validation
- Affichage en temps réel de la liste des participants
- Compteur total de participants (incluant les accompagnants)
- Design sombre et minimaliste
- 100% gratuit (GitHub + Vercel + Neon)

## Stack technique

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de données**: Neon PostgreSQL (gratuit)
- **Hébergement**: Vercel (gratuit)
- **Code source**: GitHub

## Installation locale

### Prérequis

- Node.js 18+ installé
- Un compte GitHub
- Un compte Neon (gratuit)
- Un compte Vercel (gratuit)

### Étapes d'installation

1. **Installer Node.js** (si ce n'est pas déjà fait)
   - Téléchargez depuis [nodejs.org](https://nodejs.org)
   - Vérifiez l'installation: `node --version`

2. **Installer les dépendances**
   ```bash
   cd fete-depression
   npm install
   ```

3. **Configurer la base de données Neon**

   Suivez les instructions dans [DATABASE_SETUP.md](./DATABASE_SETUP.md)

4. **Lancer le projet en local**
   ```bash
   npm run dev
   ```

   Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## Déploiement sur GitHub + Vercel + Neon

### 1. Configurer Neon (Base de données)

1. Créez un compte gratuit sur [neon.tech](https://neon.tech)
2. Créez un nouveau projet
3. Exécutez le script SQL fourni dans [DATABASE_SETUP.md](./DATABASE_SETUP.md)
4. Copiez votre "Connection string"

### 2. Pousser le code sur GitHub

```bash
# Initialiser git (si ce n'est pas déjà fait)
cd fete-depression
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - Site d'inscription fête"

# Créer un nouveau repository sur GitHub.com
# Puis lier votre repo local:
git remote add origin https://github.com/VOTRE_USERNAME/fete-depression.git
git branch -M main
git push -u origin main
```

### 3. Déployer sur Vercel

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous avec GitHub
2. Cliquez sur "New Project"
3. Sélectionnez votre repository "fete-depression"
4. **IMPORTANT**: Avant de déployer, ajoutez la variable d'environnement:
   - Name: `DATABASE_URL`
   - Value: Votre connection string Neon (copiée à l'étape 1)
5. Cliquez sur "Deploy"

Votre site sera en ligne en quelques minutes avec une URL du type: `fete-depression.vercel.app`

## Structure du projet

```
fete-depression/
├── app/
│   ├── api/
│   │   └── registrations/
│   │       └── route.ts          # API pour gérer les inscriptions
│   ├── globals.css               # Styles globaux
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Page d'accueil
├── components/
│   ├── RegistrationForm.tsx      # Formulaire d'inscription
│   └── ParticipantsList.tsx      # Liste des participants
├── lib/
│   └── db.ts                     # Configuration base de données
├── .env.local                    # Variables d'environnement (local)
├── DATABASE_SETUP.md             # Instructions pour Neon
└── README.md                     # Ce fichier
```

## Informations collectées

- Nom
- Prénom
- Email (unique)
- Téléphone
- Nombre d'accompagnants

## Sécurité

- Validation des données côté client et serveur
- Protection contre les emails en double
- Variables d'environnement pour les secrets
- Connexion SSL à la base de données

## Coûts

**Tout est gratuit!**

- GitHub: Gratuit pour les repos publics/privés
- Vercel: Plan gratuit (largement suffisant pour ce projet)
- Neon: Plan gratuit avec 512MB de stockage (plus qu'assez)

## Support

Si vous rencontrez des problèmes:
1. Vérifiez que Node.js est installé: `node --version`
2. Vérifiez que les dépendances sont installées: `npm install`
3. Vérifiez que la variable DATABASE_URL est bien configurée
4. Vérifiez les logs dans la console Vercel

## License

MIT
