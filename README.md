Angular Details

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.3.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Project Requirements:

• At least 2 or 3 components (it makes sense these would be nested)
• At least 3 uses of Data-Binding (any type)  (you will easily exceed this minimum)
• At least 4 Directives (Structural and/or Attribute Directives)
• At least 1 service
• The Ability to “Change pages” with routing (as needed)
• A Form that can be filled out and saved. You do not need to have a back-end anywhere so locally (in a CSV), or temporarily (disappears when you refresh the browser).  Since we are not utilizing a real backend you can make a “fake” or hardcoded backend.  If you want to link to an API and a database you are welcome to do that if you can figure it out.  We will be covering creating a backend API in future lessons.
• Your app should have decent CSS styling, you can use whatever style library you want (or none at all), but beware that if you’re using anything in Bootstrap besides the Grid that it might not work well with Angular. There is another CSS library that might be nicer to use with Angular: https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap

• Observable utilization?
• Pipes?
• HTTP Requests? API Interaction?  -- no API yet
 
Features that would be good to have in your app:
Login Page and Different User logins
Display information in various ways
Delete info/items
Save items


My Notes on how I setup the App

Initial Setup

First thing create a new project using

Ng new projectname
Then installed bootstrap version 5 using
Npm install bootstrap@5
Next went to styles.css in src folder and added
@import "~bootstrap/dist/css/bootstrap.css";
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");

Confirmed bootstrap is working by doing a simple button
<button class=" btn btn-primary">Test Button</button>

Setup app structure

Next since I'm using bootstrap for styling and overall layout I created a container like so. I created two different rows and cols because navigation will take entire row and created another row for main content (this is also where router will dynamically generated data based on route.)


I will have the following components:

App component (holds navigation bar)
Games - component (will show games on play list main home page)
all games (will show games that are in users library not matter the status)
Edit-game (to edit existing games)
Add-game (to add new games)
Game-details (shows all details on a game a user clicks on)

Filters on each page to filer games by platform:
Playstation tab
Switch tab
Xbox tab
Pc tab

Services:
Gamelist.service (holds an array of game objects as well as the methods to add, edit, update and get game(s)
Userlist.service (holds an array of user objects and also has observable that holds the userID of the current logged in user. Also used to verify a real user and set logged in user.)

Navbar also has a login button so a user can login.

I used the command line and typed ng g c componentname to create each component.

HTML Formatting

The HTML formatting is as it follows:

AppComponent:
<div container>

<navbar>
Home
All Games
Completed Games
Login/Logout Button
</navbar>

<ng-template>Holds the popup Login box</ng-template>

<div row>
<div col>
<router-outlet></router-outlet>  //this is where the router dynamically changes data based on route.
</div>
</div>

</div>

Games-Component/Completed Games

<div> using ngif statement to only display if no user is logged in
<div row>
<div col>
header
</div>
<div col>
Filter dropdown and header.
</div>
</div>
</div>

<br>
<br>

<div>
<div>
Game image, gamename, game platform, buttons
</div>
</div>

<h1>
Header to display when user is not logged saying they need to login

All Games Component:

<div> using ngif statement to only display if no user is logged in
<div row>
<div col>
header
</div>
<div col>
Filter dropdown and header.
</div>
</div>
</div>

<br>
<br>

<div>
<div>
Game image, gamename, game platform, buttons
</div>
<router-outlet></router-outlet> (to load game-details component)
</div>

<h1>
Header to display when user is not logged saying they need to login

Game-details component

<div row> (only displays when game is being edited.

<div col>
Game image
</div>

<div col>
Game name
Platform
Description
year
Status
Buttons
</div>

</div>

<router-outlet></router-outlet> (to display edit-game details component)

Edit-game/add game

<div row>
<div col>
Edit game header
</div>
</div>

<div row>

<div col>
Game image
</div>

<div col>
<form>
Game name
Platform
Image url
Game year
Description
Status
buttons

</form>
</div>
</div>


Filter Drop Down Button

Next I wanted to create a dropdown to let users filter by platform. I had to install ng boostrap using terminal then that added it to app.module.ts imports

ng add @ng-bootstrap/ng-bootstrap

I then added this drop down
  <div id="filterCol" class="col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-sm-12">
    <h3 id="filterHeader">Filter By Platform:</h3>
            <div class="filter">
                <div id="filterDropDown" ngbDropdown class="d-inline-block">
                    <button class="btn btn-primary" id="dropdownBasic1" ngbDropdownToggle>{{ selectedPlatform }}</button>
                    <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
                        <button ngbDropdownItem (click)="onFilter('All')">All</button>
                        <button ngbDropdownItem (click)="onFilter('PC')">PC</button>
                        <button ngbDropdownItem (click)="onFilter('Nintendo Switch')">Nintendo Switch</button>
                        <button ngbDropdownItem (click)="onFilter('PS4/PS5')">PS4/PS5</button>
                        <button ngbDropdownItem (click)="onFilter('Xbox One/Series X')">Xbox One/Series X</button>
                    </div>
                </div>
            </div>
        </div>

Also added float-end class to div that contains drop down to place on top right.



Setup Routing

In app.module.ts imported this to setup routes

import { Routes, RouterModule } from "@angular/router";

Then added my routes, notice :id is a variable and used to pass the selected games gameID


const appRoutes: Routes = [
{ path: '', component: GamesComponent},
{ path: 'allgames', component: AllGamesComponent, children: [
  { path: 'new', component: AddGameComponent},
  { path: ':id', component: GameDetailsComponent, children: [
    { path: 'edit', component: EditGameComponent}
  ]}
] },
{ path: 'completedgames', component: CompletedGamesComponent }
]

Then added to imports array in same file

RouterModule.forRoot(appRoutes)

Finally in app.component.html added where I want my routed data to be:

 <router-outlet></router-outlet>

Next added routerlink to each menu item to change content

<a class="nav-link" routerLink="completedgames">Completed Games</a>

Also need to add this specifically to home nav option to prevent home from staying as active

[routerLinkActiveOptions]="{exact: true}"

Here is an example of how the game id is passed.

routerLink="{{ game.gameID }}/edit">

Then accessed in the page it was routed to like so.

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']; //+ is to cast to number
        this.game = this.gamesService.getGameByID(this.id);
      }
    );
  }


Games Model

Next created a model file in my games component folder to hold what the game object will contain


export interface Games {
    gameID: number;
    gameName: string;
    gameYear: number;
    gameDescripition: string;
    gamePlatform: string;
    gameStatus: string;
    gameImage: string;
    userIDs: number[];

}

Games Service

Next I created a gamesList.service.ts file in the games component folder that way I had a place to have the games list as well as the ability to add, edit, delete and get the list. Notice I am storing user ids to tie a game to a certain user.


import { Games } from "../games/games.model";
export class GamesListService{
    games: Games[] = [
        {
            gameID: 0,
            gameName: 'Metro 2033',
            gameYear: 2010,
            gameDescripition: `Metro 2033 is a 2010 first-person shooter survival horror video game developed by 4A Games and published by THQ.
             The story is based on Dmitry Glukhovsky's novel of the same name, where survivors of a nuclear war have taken refuge in the Metro tunnels of Moscow`,
             gamePlatform: 'PC',
             gameStatus: 'Playlist',
             gameImage: '../../assets/images/halflifealyx.jpg',
             userIDs: [0, 1]
        },

        },
]

Also I used injectable import to import the user service to access the current user id to make new games.

import { Injectable} from '@angular/core';
@Injectable()


userLoggedInId: number = -1;

    constructor(private userService: UserListService){
        this.userService.cast.subscribe(userLoggedId => this.userLoggedInId = userLoggedId)
    }

 
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


User service

Here is the user service main thing here is I have an observable that all the components can to subscribe to so it knows when the user clicks log out.

import { BehaviorSubject } from "rxjs";
export class UserListService{
    private userLoggedInId = new BehaviorSubject<number>(-1);
    cast = this.userLoggedInId.asObservable();
    users = [{ userId: 0, userName: 'david'}, {userId: 1, userName: 'admin'}]
    verifyUser(username: string){
        let tempUser = this.users.filter(user => user.userName === username.toLocaleLowerCase());
        if( tempUser.length === 0){
            return false
        } else {
            this.setUserLoggedIn(tempUser[0].userId);
            return true
        }
    }
    setUserLoggedIn(id: number){
        this.userLoggedInId.next(id);
    }
}


Pipe to Filter Games Array

In order to filter my games array on each page I created, I created a filter pipe like such, this will filter by the gamestatus, platform and also the user it is tied to. The pipe is used to display the correct games for each page. Here is an example of the HTML used on the main game component page

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

I then used the filter to get my count and display it next to a header.
<h3>Games on Current Playlist ({{(games|filterGames: 'Playlist' : 'All').length}})</h3>

I also then used it to filter the games displayed.
<div class="gameBoxDiv" *ngFor="let game of games | filterGames: 'Playlist' : selectedPlatform :  userLoggedInId; let i = index;">
                    <img  class="center" src="{{ game.gameImage }}" alt="{{ game.gameName }}" width="150" height="200" routerLink="/allgames/{{ game.gameID }}" title="Click for Game Details">
                    <br>
                    <h3>{{ game.gameName }}</h3>
                    <p>Platform: {{ game.gamePlatform }}</p>
                    <div class="buttonBox">
                    <button class="btn btn-success playListBtns" (click)="updateStatusButton(game.gameID)">Mark As Completed</button>
                    <button class="btn btn-danger playListBtns" (click)="removeFromPlaylist1(game.gameID)">Remove From Playlist</button>
                </div>
                </div>

SnackBar Messages

Install this to use snackbar messages

ng add @angular/material

From <https://www.geeksforgeeks.org/matsnackbar-in-angular-material/> 

Then in the app.module file
import { MatSnackBarModule } from "@angular/material/snack-bar";
Add to imports 
MatSnackBarModule,


Then in whatever method u want it in ex:
this.snackBar.open("Game has been removed from your playlist.", "OK", {duration: 1500,
      panelClass: ['snackBar']});

Had to set in tsconfig.json as ran some parameters without types (needed for login popup form)idNavM
"noImplicitAny": false, 


Login Box Pop Up


To get the login box pop up to work did like so:

    <ng-template #content let-modal>
      <div class="modal-header  centerCol">
        <h4 class="modal-title" id="modal-basic-title">Log In</h4>
      </div>
      <div class="modal-body">
        <form #f="ngForm">
          <div class="centerCol">
            <label id="usernameLabel" for="userName">Username: </label>
            <br>
              <input type="text" id="userName" class="form-control" placeholder="David" name="userName" ngModel #userName="ngModel" required>
              <p *ngIf="!userName.valid && userName.touched">Please enter a Username!</p>
              <p *ngIf="userNotFound === 1">User Not Found!</p>
          </div>
        </form>
      </div>
      <div class="modal-footer centerColRow">
        <button [disabled]="!f.valid" class="btn btn-success" (click)="submitLogin(content, f)">Log In</button>
        <button class="btn btn-danger"  (click)="modal.dismiss()">Cancel</button>
      </div>
    </ng-template>

And in the typscript file, make sure to import
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
private modalService: NgbModal

 loginButton(content){
      this.modalService.open(content, { size: 'sm' });
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
![image](https://user-images.githubusercontent.com/14291275/127753791-a9270b80-3d56-4344-8801-0f29a16e76d3.png)
