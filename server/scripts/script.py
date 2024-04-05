import sys
from fetching import fetch
from persistence import persist

def main(*arguments: list[str]):
    if len(arguments) == 0:
        return print('No arguments provided')
    
    command = arguments[0]
    
    if command == 'fetch':
        return fetch(*arguments[1:])
        
    if command == 'persist':
        return persist(*arguments[1:])
    
    print(f'Invalid command \'{command}\'')

if __name__ == '__main__':
    main(*sys.argv[1:])