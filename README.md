Angular Details

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.3.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
My Notes on how I built the project.

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

<div id="mainContainer" class="container-fluid">
  <!--Row and col for navigation-->
  <div class="row vh-100" id="navRow">
    <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12" id="navCol">

    </div>
    <!--Row and col for navigation-->
  </div>
  <!--Row and col for content-->
  <div class="row vh-100" id="contentRow">
    <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12" id="contentCol">
<router-outlet></router-outlet>
    </div>
  </div>
</div>


I will have the app component then:

Games - component (will show games on play list)
Completed games
all games
Edit-game (to edit/add games)

Filters:
Playstation tab
Switch tab
Xbox tab
Pc tab

I used the command line and typed ng g c componentname to created each item

Setup Routing

In app.module.ts imported this to setup routes

import { Routes, RouterModule } from "@angular/router";

Then added my routes


const appRoutes: Routes = [
{ path: '', component: GamesComponent },
{ path: 'allgames', component: AllGamesComponent },
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
}

Games Service

Next I created a gamesList.service.ts file in the games component folder that way I had a place to have the games list as well as the ability to add, edit, delete and get the list.


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
             gameStatus: 'Playlist'
        },
]


 addGame(name: string, year: number, descripition: string, platform: string, status: string){
        this.games.push({
            gameID: (this.games[this.games.length - 1].gameID) + 1,
            gameName: name,
            gameYear: year,
            gameDescripition: descripition,
            gamePlatform: platform,
            gameStatus: status
        })}
        deleteGame(id: number){
            let index = this.games.findIndex(game => game.gameID === id);
            this.games.splice(id, 1);
        }
        updateGameStatus(id: number, status: string){
            let index = this.games.findIndex(game => game.gameID === id);
            this.games[index].gameStatus = status;
        }
        updateGame(id: number, name: string, year: number, descripition: string, platform: string, status: string){
            let index = this.games.findIndex(game => game.gameID === id);
            this.games[index].gameName = name;
            this.games[index].gameYear = year;
            this.games[index].gameDescripition = descripition;
            this.games[index].gamePlatform = platform;
            this.games[index].gameStatus = status;
        }
}
}

Pipe to Filter Games Array

In order to filter my games array on each page I created, I created a filter pipe like such, this will filter by the gamestatus as well as the platform.

import { Pipe, PipeTransform } from '@angular/core';
import { Games } from './games.model';
@Pipe({
    name: 'filterGames',
    pure: false
})
export class FilterGamesPipe implements PipeTransform {
    transform(games: Games[], filterStatus: string, platform: string): Games[] {
       let sortedArray: Games[] = games.sort((firstGame, secondGame) => firstGame.gameName.localeCompare(secondGame.gameName));
        if(platform !== 'All'){
            if(filterStatus.length !== 0){
                return sortedArray.filter(game => game.gameStatus === filterStatus && game.gamePlatform == platform);
            } else {
                return sortedArray.filter(game => game.gamePlatform === platform);
            }
        } else {
            if(filterStatus.length !== 0){
                return sortedArray.filter(game => game.gameStatus === filterStatus);
            } else {
                return sortedArray;
            }
        }
    }
}

I then used the filter to get my count and display it next to a header.
<h3>Games on Current Playlist ({{(games|filterGames: 'Playlist' : 'All').length}})</h3>

I also then used it to filter the games displayed.
<div class="allPLaylistGames">
    <div class="gameBoxDiv" *ngFor="let game of games | filterGames: 'Playlist' : 'All'">
        <img  class="center" src="{{ game.gameImage }}" alt="{{ game.gameName }}" width="150" height="200">
        <h5>{{ game.gameName }}</h5>
        <p>Platform: {{ game.gamePlatform }}</p>
    </div>
</div>

Next I wanted to create a dropdown to let users filter by platform. I had to install ng boostrap using terminal then that added it to app.module.ts imports

ng add @ng-bootstrap/ng-bootstrap

I then added this drop down
<div ngbDropdown class="d-inline-block">
    <button class="btn btn-outline-primary" id="dropdownBasic1" ngbDropdownToggle>Select Platform</button>
    <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
      <button ngbDropdownItem>PC</button>
      <button ngbDropdownItem>Nintendo Switch</button>
      <button ngbDropdownItem>PS4/PS5</button>
      <button ngbDropdownItem>Xbox One/Series X</button>
    </div>
  </div>

Also added float-end class to div that contains drop down to place on top right.

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




![image](https://user-images.githubusercontent.com/14291275/127752652-9bac9fb3-1701-4686-a8a1-68a52546182c.png)

