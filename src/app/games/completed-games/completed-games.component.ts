import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GamesListService } from 'src/app/services/gamesList.service';
import { UserListService } from 'src/app/services/userList.service';
import { Games } from '../games.model';

@Component({
  selector: 'app-completed-games',
  templateUrl: './completed-games.component.html',
  styleUrls: ['./completed-games.component.css']
})
export class CompletedGamesComponent implements OnInit {

  games: Games[] = [];
  selectedPlatform: string = 'All';
  userLoggedInId: number = -1;

  constructor(private gamesService: GamesListService, private snackBar: MatSnackBar, private userService: UserListService) { }

  ngOnInit(): void {
    this.games = this.gamesService.games;
    this.userService.cast.subscribe(userLoggedId => this.userLoggedInId = userLoggedId);

  }

  onFilter(platform: string){
    this.selectedPlatform = platform;
  }

  markAsUnCompleted(id: number){
    this.gamesService.updateGameStatus(id, '');
    this.snackBar.open("Game has been set to uncompleted.", "OK", {duration: 1500,
      panelClass: ['snackBar']});
  }

  editGame(id: number){
    
    }
  
    deleteGame(id: number){
      this.gamesService.deleteGame(id);
      this.snackBar.open("Game has been deleted.", "OK", {duration: 1500,
        panelClass: ['snackBar']});
    }

}
