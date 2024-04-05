CREATE TABLE games (
    id TEXT PRIMARY KEY,
    winner_id INT NOT NULL,
    loser_id INT NOT NULL,
    winner_points INT NOT NULL,
    loser_points INT NOT NULL,
    winner_matchup TEXT NOT NULL,
    loser_matchup TEXT NOT NULL,
    season_id varchar(7) NOT NULL,
    datetime TIMESTAMP NOT NULL
)