import { Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GamesListService } from './services/gamesList.service';
import { UserListService } from './services/userList.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GamesListService, UserListService]
})
export class AppComponent implements OnInit{

  title = 'frontendangularproject';
  public isMenuCollapsed = true;
  userLoggedInId: number = -1;
  userNotFound: number = -1;

  constructor(private modalService: NgbModal, private userService: UserListService, private snackBar: MatSnackBar) {}

  loginButton(content){
      this.modalService.open(content, { size: 'sm' });
  }

  logOutButton(){
    this.userService.setUserLoggedIn(-1);
    this.snackBar.open("You have logged out. ", "OK", {duration: 1500,
      panelClass: ['snackBar']});
  }

  submitLogin(content, f){

    if(this.userService.verifyUser(f.value.userName) === true){
      this.userNotFound = 0;
      this.snackBar.open("Welcome Back " + f.value.userName, "OK", {duration: 1500,
        panelClass: ['snackBar']});
        this.modalService.dismissAll(content);

    } else {
      this.userNotFound = 1;
    }

  }

  ngOnInit(){
    this.userService.cast.subscribe(userLoggedId => this.userLoggedInId = userLoggedId)
  }

}
