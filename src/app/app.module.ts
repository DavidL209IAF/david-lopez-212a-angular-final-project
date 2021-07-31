import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { AllGamesComponent } from './games/all-games/all-games.component';
import { CompletedGamesComponent } from './games/completed-games/completed-games.component';
import { EditGameComponent } from './games/edit-game/edit-game.component';
import { FilterGamesPipe } from './games/filter-games.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameDetailsComponent } from './games/game-details/game-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FormsModule } from '@angular/forms';
import { AddGameComponent } from './games/add-game/add-game.component';

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

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    AllGamesComponent,
    CompletedGamesComponent,
    EditGameComponent,
    FilterGamesPipe,
    GameDetailsComponent,
    AddGameComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
