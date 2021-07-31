import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GamesListService } from '../services/gamesList.service';
import { UserListService } from '../services/userList.service';
import { Games } from './games.model';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

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

  updateStatusButton(id: number){
  this.gamesService.updateGameStatus(id, 'Completed');
  this.snackBar.open("Game has been set to Completed.", "OK", {duration: 1500,
    panelClass: ['snackBar']});
  }

  //testing
  removeFromPlaylist1(id: number){
    this.gamesService.updateGameStatus(id, '');
    this.snackBar.open("Game has been removed from your playlist.", "OK", {duration: 1500,
      panelClass: ['snackBar']});
  }

  //testing

  removeFromPlaylist(id: number){
    this.gamesService.updateGameStatus(id, '');
    this.snackBar.open("Game has been removed from your playlist.", "OK", {duration: 1500,
      panelClass: ['snackBar']});
  }
}
