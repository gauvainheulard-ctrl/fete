-- Script SQL pour créer la table participants
-- À exécuter dans la console SQL de Neon (console.neon.tech)

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

-- Vérifier que la table a été créée
SELECT table_name FROM information_schema.tables WHERE table_name = 'participants';
