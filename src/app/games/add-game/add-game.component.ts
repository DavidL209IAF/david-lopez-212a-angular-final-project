import { Component, OnInit, ViewChild } from '@angular/core';
import { Games } from '../games.model';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GamesListService } from 'src/app/services/gamesList.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  id: any = -1;

gameStatus: string = '';

@ViewChild('f', { read: NgForm }) gameAddForm: any;

  constructor(private route: ActivatedRoute, private gamesService: GamesListService,
    public router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onFormSubmit(){

    this.gamesService.addGame(this.gameAddForm.value.gameName, this.gameAddForm.value.gameYear,
      this.gameAddForm.value.gameDescripition, this.gameAddForm.value.gamePlatform, this.gameAddForm.value.gameStatus, this.gameAddForm.value.gameImageURL);

       this.snackBar.open("Game has been Added.", "OK", {duration: 1500,
        panelClass: ['snackBar']});

        this.router.navigate(['../'], {relativeTo: this.route})

  }

  onCancel(){
    this.snackBar.open("Action Cancelled.", "OK", {duration: 1500,
      panelClass: ['snackBar']});

      this.router.navigate(['../'], {relativeTo: this.route})
  }

}
