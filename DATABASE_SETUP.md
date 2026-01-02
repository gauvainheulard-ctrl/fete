# Configuration de la base de données Neon

## Étape 1: Créer un compte Neon (gratuit)

1. Allez sur [neon.tech](https://neon.tech)
2. Créez un compte gratuit
3. Créez un nouveau projet

## Étape 2: Créer la table

Dans la console Neon SQL Editor, exécutez cette requête SQL:

```sql
CREATE TABLE participants (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  telephone VARCHAR(20) NOT NULL,
  accompagnants INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_created_at ON participants(created_at DESC);
```

## Étape 3: Récupérer l'URL de connexion

1. Dans votre projet Neon, allez dans "Dashboard"
2. Copiez la "Connection string"
3. Collez-la dans le fichier `.env.local` à la place de `your_neon_database_url_here`

Format de l'URL:
```
postgres://[user]:[password]@[host]/[database]?sslmode=require
```

## Étape 4: Vérifier

Votre fichier `.env.local` devrait ressembler à:
```
DATABASE_URL=postgres://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

C'est tout! Votre base de données est configurée.
