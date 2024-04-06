import json
from dotenv import dotenv_values
import psycopg2
from utilities import year_to_season, season_to_year, parse_date, current_year, current_season, START_YEAR
from game import TeamGameStats, Game
from colors import get_team_colors

def get_connection() -> psycopg2.extensions.connection:
    environment_variables = dotenv_values('../.env')

    return psycopg2.connect(dbname=environment_variables.get('POSTGRES_NAME'))

def persist(*arguments: list[str]):
    if len(arguments) == 0:
        return print('No season type provided')
    
    procedure = arguments[0]
    
    if procedure == 'games':
        return persist_games(*arguments[1:])
    
    if procedure == 'teams':
        return persist_teams()
    
    print(f'Invalid procedure type \'{procedure}\'')

def persist_teams():
    try:
        connection = get_connection()
        cursor = connection.cursor()
            
        with open(f'data/stats/teams.json', 'r') as file:
            data = json.loads(file.read())
            
        insert_script = '''
            INSERT INTO teams (id, full_name, abbreviation, nickname, city, state, colors)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (id) DO UPDATE
            SET full_name = EXCLUDED.full_name,
                abbreviation = EXCLUDED.abbreviation,
                nickname = EXCLUDED.nickname,
                city = EXCLUDED.city,
                state = EXCLUDED.state,
                colors = EXCLUDED.colors
        '''
            
        for row in data:
            team_id = row[0]
            insert_value = (team_id, row[5], row[1], row[2], row[4], row[6], get_team_colors(team_id))
            cursor.execute(insert_script, insert_value)
        
        print('Successfully saved teams to the database')
        
        connection.commit()
    except Exception as error: print(error)
    finally:
        if cursor is not None: cursor.close()
        if connection is not None: connection.close()
        
def persist_games(*arguments: list[str]):    
    season_type = arguments[0]
    
    connection: psycopg2.extensions.connection = None
    cursor: psycopg2.extensions.cursor = None
    
    try:
        connection = get_connection()
        cursor = connection.cursor()
                
        if season_type == 'latest': persist_latest_games(cursor)
        elif season_type == 'all': persist_all_games(cursor)
        elif season_type == 'specific':
            if len(arguments) == 1:
                raise Exception('No season provided')
            
            season = arguments[1]
            persist_specific_games(cursor, season)
        else: raise Exception(f'Invalid season type \'{season_type}\'')
        
        connection.commit()
    except Exception as error: print(error)
    finally:
        if cursor is not None: cursor.close()
        if connection is not None: connection.close()
    
def persist_latest_games(cursor: psycopg2.extensions.cursor):
    persist_specific_games(cursor, current_season())
    
def persist_all_games(cursor: psycopg2.extensions.cursor):
    end_year = current_year()
    
    for year in range(START_YEAR, end_year):
        season = year_to_season(year)
        persist_specific_games(cursor, season)
        
def persist_specific_games(cursor: psycopg2.extensions.cursor, season: str):    
    with open(f'data/stats/seasons/{season}.json', 'r') as file:
        data = json.loads(file.read())
        
    games = organize_season_by_games(data, season, season_to_year(season))
    
    insert_script = '''
        INSERT INTO games (id, winner_id, loser_id, winner_points, loser_points, winner_matchup, loser_matchup, season_id, datetime)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (id) DO UPDATE
        SET winner_id = EXCLUDED.winner_id,
            loser_id = EXCLUDED.loser_id,
            winner_points = EXCLUDED.winner_points,
            loser_points = EXCLUDED.loser_points,
            winner_matchup = EXCLUDED.winner_matchup,
            loser_matchup = EXCLUDED.loser_matchup,
            season_id = EXCLUDED.season_id,
            datetime = EXCLUDED.datetime
    '''
    
    for scores in games.values():
        game = Game(scores)
        insert_value = (game.id, game.winner_id, game.loser_id, game.winner_points, game.loser_points, game.winner_matchup, game.loser_matchup, game.season_id, game.timestamp)
        cursor.execute(insert_script, insert_value)        
        
    print(f'Successfully saved data for the {season} season to the database')

def organize_season_by_games(data, season: str, year: int) -> dict[str, list[TeamGameStats]]:
    rows = data['resultSets'][0]['rowSet']
    
    games: dict[str, list[TeamGameStats]] = {}
    
    for row in rows:
        stats: TeamGameStats = parse_row_traditional(row, season) if year < 1996 else parse_row_modern(row, season)
        
        if stats.id in games: games[stats.id].append(stats)
        else: games[stats.id] = [stats]
        
    return games
        
    
def parse_row_traditional(row, season: str) -> TeamGameStats:
    return TeamGameStats(row[4], row[1], row[26], season, parse_date(row[5]), row[6])

def parse_row_modern(row, season: str) -> TeamGameStats:
    return TeamGameStats(row[4], row[1], row[28], season, parse_date(row[5]), row[6])