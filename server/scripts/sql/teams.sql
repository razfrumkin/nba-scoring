CREATE TABLE IF NOT EXISTS teams (
    id INT PRIMARY KEY,
    full_name TEXT NOT NULL,
    abbreviation TEXT NOT NULL,
    nickname TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    colors varchar(7)[] NOT NULL
)