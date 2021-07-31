import { Games } from "../games/games.model";
import { Injectable} from '@angular/core';
import { UserListService } from "./userList.service";

@Injectable()

export class GamesListService{
    userLoggedInId: number = -1;


    constructor(private userService: UserListService){
        this.userService.cast.subscribe(userLoggedId => this.userLoggedInId = userLoggedId)

    }

    games: Games[] = [
        {
            gameID: 0, gameName: 'Metro 2033', gameYear: 2010,
            gameDescripition: `Metro 2033 is a 2010 first-person shooter survival horror video game developed by 4A Games and published by THQ. The story is based on Dmitry Glukhovsky's novel of the same name, where survivors of a nuclear war have taken refuge in the Metro tunnels of Moscow`,
             gamePlatform: 'PC', gameStatus: 'Playlist', gameImage: '../../assets/images/metro2033.jpg',
             userIDs: [1]
        },
        {
            gameID: 1, gameName: 'Death Stranding', gameYear: 2019,
            gameDescripition: `Death Stranding is an action game developed by Kojima Productions. It is the first game from director Hideo Kojima and Kojima Productions after their split from Konami in 2015. It was released by Sony Interactive Entertainment for the PlayStation 4 in November 2019 and by 505 Games for Windows in July 2020.`,
             gamePlatform: 'PS4/PS5', gameStatus: 'Playlist', gameImage: '../../assets/images/deathstranding.jpg',
             userIDs: [0, 1]
        },
        {
            gameID: 2, gameName: 'The Legend of Zelda: Breath of the Wild', gameYear: 2017,
            gameDescripition: `The Legend of Zelda: Breath of the Wild is an open world action-adventure game developed and published by Nintendo for the Nintendo Switch and Wii U consoles. Breath of the Wild is part of The Legend of Zelda franchise and is set at the end of the Zelda timeline.`,
             gamePlatform: 'Nintendo Switch', gameStatus: 'Playlist', gameImage: '../../assets/images/breathofthewild.jpg',
             userIDs: [0, 1]
        },
        {
            gameID: 3, gameName: 'Half-Life: Alyx', gameYear: 2020,
            gameDescripition: `Half-Life: Alyx is a 2020 virtual reality first-person shooter developed and published by Valve. Set between the events of Half-Life and Half-Life 2, players control Alyx Vance on a mission to seize a superweapon belonging to the alien Combine.`,
             gamePlatform: 'PC', gameStatus: 'Playlist', gameImage: '../../assets/images/halflifealyx.jpg',
             userIDs: [0, 1]
        },
        {
            gameID: 4, gameName: 'Destroy All Humans!', gameYear: 2020,
            gameDescripition: `Destroy All Humans! is an open world action-adventure video game developed by Black Forest Games and published by THQ Nordic. It is the fifthinstallment in the Destroy All Humans! franchise, and a remake of the 2005 original game. This remake is the first entry in the franchise since Path of the Furon.`,
             gamePlatform: 'PS4/PS5', gameStatus: 'Playlist', gameImage: '../../assets/images/destroyallhumans.jpg',
             userIDs: [0, 1]
        },  
        {
            gameID: 5, gameName: "Marvel's Spider-Man: Miles Morales", gameYear: 2020,
            gameDescripition: `Marvel's Spider-Man: Miles Morales is a 2020 action-adventure game developed by Insomniac Games and published by Sony Interactive Entertainment for the PlayStation 4 and PlayStation 5`,
             gamePlatform: 'PS4/PS5', gameStatus: 'Completed', gameImage: '../../assets/images/spidermanmilesmorales.PNG',
             userIDs: [1]
        },
        {
            gameID: 6, gameName: "Mafia: Definitive Edition", gameYear: 2020,
            gameDescripition: `Mafia: Definitive Edition is a 2020 action-adventure game developed by Hangar 13 and published by 2K Games. It is a remake of the 2002 video game Mafia, and the fourth main installment in the Mafia series.`,
             gamePlatform: 'PS4/PS5', gameStatus: 'Completed', gameImage: '../../assets/images/mafiadefinitiveedition.jpg',
             userIDs: [0, 1]
        },
        {
            gameID: 7, gameName: "Super Mario Odyssey", gameYear: 2017,
            gameDescripition: `Super Mario Odyssey is a 2017 platform game developed and published by Nintendo for the Nintendo Switch`,
             gamePlatform: 'Nintendo Switch', gameStatus: 'Completed', gameImage: '../../assets/images/supermarioodyssey.jpg',
             userIDs: [0, 1]
        },
        {
            gameID: 8, gameName: "Assassin's Creed Valhalla", gameYear: 2020,
            gameDescripition: `Assassin's Creed Valhalla is a 2020 action role-playing video game developed by Ubisoft Montreal and published by Ubisoft. It is the twelfth major installment in the Assassin's Creed series, and the successor to 2018's Assassin's Creed Odyssey.`,
             gamePlatform: 'PS4/PS5', gameStatus: 'Completed', gameImage: '../../assets/images/assassinscreedvalhalla.jpg',
             userIDs: [0, 1]
        },
        {
            gameID: 9, gameName: "Crash Bandicoot 4: It's About Time", gameYear: 2020,
            gameDescripition: `Crash Bandicoot 4: It's About Time is a 2020 platform game developed by Toys for Bob and published by Activision. The game is the eighth main installment in the Crash Bandicoot series and a retcon of the games that originally followed Crash Bandicoot: Warped.`,
             gamePlatform: 'PS4/PS5', gameStatus: 'Library', gameImage: '../../assets/images/crash4.jpeg',
             userIDs: [1]
        },
        {
            gameID: 10, gameName: "Ghost of Tsushima", gameYear: 2020,
            gameDescripition: `Ghost of Tsushima is a 2020 action-adventure game developed by Sucker Punch Productions and published by Sony Interactive Entertainment. Featuring an open world, the player controls Jin Sakai, a samurai on a quest to protect Tsushima Island during the first Mongol invasion of Japan.`,
             gamePlatform: 'PS4/PS5', gameStatus: 'Library', gameImage: '../../assets/images/ghostoftsushima.jfif',
             userIDs: [0, 1]
        }

    ]
    
    addGame(name: string, year: number, descripition: string, platform: string, status: string, image: string){
        let newID = this.games.length + 1;
        let tempArray: number[] = [];
        tempArray.push(this.userLoggedInId);
        this.games.push({
            gameID: newID,
            gameName: name,
            gameYear: year,
            gameDescripition: descripition,
            gamePlatform: platform,
            gameStatus: status,
            gameImage: image,
            userIDs: tempArray
        });
    }

        deleteGame(id: number){
            let index = this.games.findIndex(game => game.gameID === id);
            this.games.splice(index, 1);
        }

        updateGameStatus(id: number, status: string){
            let index = this.games.findIndex(game => game.gameID === id);
            this.games[index].gameStatus = status;
        }

        updateGame(id: number, name: string, year: number, descripition: string, platform: string, status: string, image: string){
            let index = this.games.findIndex(game => game.gameID === id);
            this.games[index].gameName = name;
            this.games[index].gameYear = year;
            this.games[index].gameDescripition = descripition;
            this.games[index].gamePlatform = platform;
            this.games[index].gameStatus = status;
            this.games[index].gameImage = image;
        }

        getGameByID(id: number){
            let index = this.games.findIndex(game => game.gameID === id);
            let tempGame: Games = this.games[index];
            return tempGame;

        }
}