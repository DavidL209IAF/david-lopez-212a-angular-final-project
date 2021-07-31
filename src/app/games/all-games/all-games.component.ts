import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GamesListService } from 'src/app/services/gamesList.service';
import { UserListService } from 'src/app/services/userList.service';
import { Games } from '../games.model';


@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit {

  games: Games[] = [];
  selectedPlatform: string = 'All';
  userLoggedInId: number = -1;

  constructor(private gamesService: GamesListService, public router: Router,
    private snackBar: MatSnackBar, private userService: UserListService) { }

  ngOnInit(): void {
    this.games = this.gamesService.games;
    this.userService.cast.subscribe(userLoggedId => this.userLoggedInId = userLoggedId);

  }

  onFilter(platform: string){
    this.selectedPlatform = platform;
  }

  addToPlaylist(id: number, status: string){
    if(status === 'Playlist'){
      this.snackBar.open("Game is already on playlist", "OK", {duration: 1500,
        panelClass: ['snackBar']});
    } else {
      this.gamesService.updateGameStatus(id, 'Playlist');
      this.snackBar.open("Game has been added to your playlist.", "OK", {duration: 1500,
        panelClass: ['snackBar']});
    }
  }

  editGame(id: number){

    }
  
    deleteGame(id: number){
      this.gamesService.deleteGame(id);
      this.snackBar.open("Game has been deleted.", "OK", {duration: 1500,
        panelClass: ['snackBar']});
    }

}
