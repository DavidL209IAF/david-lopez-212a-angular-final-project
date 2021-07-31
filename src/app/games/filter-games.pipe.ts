import { Pipe, PipeTransform } from '@angular/core';
import { Games } from './games.model';

@Pipe({
    name: 'filterGames',
    pure: false
})

export class FilterGamesPipe implements PipeTransform {
    transform(games: Games[], filterStatus: string, platform: string, userId: number): Games[] {

       let sortedArray: Games[] = games.sort((firstGame, secondGame) => firstGame.gameName.localeCompare(secondGame.gameName));

        if(platform !== 'All'){
            if(filterStatus.length !== 0){
                return sortedArray.filter(game => game.gameStatus === filterStatus && game.gamePlatform == platform && game.userIDs.indexOf(userId) !== -1);
            } else {
                return sortedArray.filter(game => game.gamePlatform === platform && game.userIDs.indexOf(userId) !== -1 );
            }
        } else {
            if(filterStatus.length !== 0){
                return sortedArray.filter(game => game.gameStatus === filterStatus && game.userIDs.indexOf(userId) !== -1);
            } else {
                return sortedArray.filter(game => game.userIDs.indexOf(userId) !== -1);
            }
        }
    }
}