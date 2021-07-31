import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GamesListService } from 'src/app/services/gamesList.service';
import { Games } from '../games.model';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {
  id: any = -1;

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

gameStatus: string = '';

@ViewChild('f', { read: NgForm }) gameEditForm: any;


  constructor(private route: ActivatedRoute, private gamesService: GamesListService,
    public router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  this.route.parent?.params.subscribe(params => {
    this.id = +params['id'];
    })
    this.game = this.gamesService.getGameByID(this.id);

    if(this.game.gameStatus.length > 0){
    this.gameStatus = this.game.gameStatus;
    } else {
      this.gameStatus = 'Library'
    }

  }

  onFormSubmit(){
    this.game.gameName = this.gameEditForm.value.gameName;
    this.game.gameDescripition = this.gameEditForm.value.gameDescripition;
    this.game.gameYear = this.gameEditForm.value.gameYear;
    this.game.gameImage = this.gameEditForm.value.gameImageURL;
    this.game.gamePlatform = this.gameEditForm.value.gamePlatform;
    this.game.gameStatus = this.gameEditForm.value.gameStatus;
   

    this.gamesService.updateGame(this.game.gameID, this.game.gameName, this.game.gameYear,
       this.game.gameDescripition, this.game.gamePlatform, this.game.gameStatus, this.game.gameImage);

       this.snackBar.open("Game has been updated.", "OK", {duration: 1500,
        panelClass: ['snackBar']});

        this.router.navigate(['../'], {relativeTo: this.route})
    }
  

  onCancel(){
    this.snackBar.open("Game edit Cancelled.", "OK", {duration: 1500,
      panelClass: ['snackBar']});

      this.router.navigate(['../'], {relativeTo: this.route})
  }
}
