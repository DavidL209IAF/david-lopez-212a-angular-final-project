import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GamesListService } from 'src/app/services/gamesList.service';
import { Games } from '../games.model';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  id: number = -1;
  game: Games = {
    gameID: -1,
    gameName: '',
    gameYear: -1,
    gameDescripition: ``,
    gamePlatform: '', 
    gameStatus: '', 
    gameImage: '',
    userIDs: []
}

  constructor(private route: ActivatedRoute, private gamesService: GamesListService,
     public router: Router, private snackBar: MatSnackBar)
    {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']; //+ is to cast to number
        this.game = this.gamesService.getGameByID(this.id);
      }
    );
  }

  markAsUnCompleted(){
    this.gamesService.updateGameStatus(this.game.gameID, 'Library');
    this.snackBar.open("Game has been set to UnCompleted.", "OK", {duration: 1500,
      panelClass: ['snackBar']});
  }

  deleteGame(){
    this.gamesService.deleteGame(this.game.gameID);
    this.router.navigate(['../'], {relativeTo: this.route})
    this.snackBar.open("Game has been deleted.", "OK", {duration: 1500,
      panelClass: ['snackBar']});
  }

  addToPlaylist(){
    this.gamesService.updateGameStatus(this.game.gameID, 'Playlist');
    this.snackBar.open("Game has been added to current Playlist.", "OK", {duration: 1500,
      panelClass: ['snackBar']});
  }

  markAsCompleted(){
    this.gamesService.updateGameStatus(this.game.gameID, 'Completed');
    this.snackBar.open("Game has been marked as Completed.", "OK", {duration: 1500,
      panelClass: ['snackBar']});
  }

}
