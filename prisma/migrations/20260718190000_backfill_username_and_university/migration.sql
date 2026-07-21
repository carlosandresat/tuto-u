-- Backfill de username y universidad para los usuarios existentes.
-- Va entre el expand (columnas opcionales) y el contract (NOT NULL + indice unico).
-- Idempotente: si ya se aplico, ambas sentencias son no-op.

INSERT INTO universities (id, slug, name, email_domain)
VALUES ('univ_yachay', 'yachay', 'Yachay Tech', 'yachaytech.edu.ec')
ON CONFLICT DO NOTHING;

WITH numerados AS (
  SELECT id,
         lower(replace(split_part(email, '@', 1), '.', '')) AS base,
         row_number() OVER (
           PARTITION BY lower(replace(split_part(email, '@', 1), '.', ''))
           ORDER BY "createdAt"
         ) AS rn
  FROM users
  WHERE username IS NULL OR university_id IS NULL
)
UPDATE users u
SET username = CASE WHEN n.rn = 1 THEN n.base ELSE n.base || '-' || n.rn END,
    university_id = 'univ_yachay'
FROM numerados n
WHERE u.id = n.id;