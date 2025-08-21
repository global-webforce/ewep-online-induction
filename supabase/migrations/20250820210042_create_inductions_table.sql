-- Up
DROP TABLE IF EXISTS inductions;

-- Down (optional: recreate the table)
CREATE TABLE inductions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title text NOT NULL,
    content text,
    created_at timestamp with time zone DEFAULT timezone('utc', now())
);