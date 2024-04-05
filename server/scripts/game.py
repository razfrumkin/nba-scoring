from datetime import datetime

class TeamGameStats:
    def __init__(self, id: str, team_id: str, points: int, season_id: str, timestamp: datetime, matchup: str):
        self.id = id
        self.team_id = team_id
        self.points = points
        self.season_id = season_id
        self.timestamp = timestamp
        self.matchup = matchup
        
    def __repr__(self):
        return f'TeamGameStats(id=\'{self.id}\', team_id=\'{self.team_id}\', points={self.points}, season_id=\'{self.season_id}\', timestamp=\'{self.timestamp}\', matchup=\'{self.matchup}\')'

class Game:
    def __init__(self, scores: list[TeamGameStats]):
        self.id = scores[0].id
        
        winner_index = 0 if scores[0].points > scores[1].points else 1
        loser_index = 1 - winner_index
        
        self.winner_id = scores[winner_index].team_id
        self.loser_id = scores[loser_index].team_id
        self.winner_points = scores[winner_index].points
        self.loser_points = scores[loser_index].points
        self.winner_matchup = scores[winner_index].matchup
        self.loser_matchup = scores[loser_index].matchup
        
        self.season_id = scores[0].season_id
        self.timestamp = scores[0].timestamp
        
    def __repr__(self):
        return f'Game(game_id=\'{self.game_id}\', winner_id=\'{self.winner_id}\', loser_id=\'{self.loser_id}, winner_points={self.winner_points}, loser_points={self.loser_points}, winner_header=\'{self.winner_matchup}\', loser_header=\'{self.loser_matchup}\', season_id=\'{self.season_id}\', timestamp=\'{self.timestamp}\')'