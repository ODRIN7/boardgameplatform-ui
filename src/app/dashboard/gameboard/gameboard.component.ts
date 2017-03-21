import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import {Boardgame} from "../../shared/domain/boardgame";
import {StoreService} from "../../shared/services/store.service";
import {Game} from "../../shared/domain/game";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {TdLoadingService, TdDialogService, TdMediaService} from "@covalent/core";
import {MdSnackBar} from "@angular/material";
import {BoardGameService} from "../../shared/services/boardGame.service";
import {EmitterService} from "../../shared/services/emitter.service";
import {GameService} from "../../shared/services/game.service";
import {AuthService} from "../../shared/services/auth/auth.services";

@Component({
  selector: 'bga-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameBoardComponent implements OnInit {
  @Input() routing: String;
  public openGames: Game[];

  private gameListId = 'GAME_COMPONENT'


  constructor(private _titleService: Title,
              private _router: Router,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _snackBarService: MdSnackBar,
              private boardGameService: BoardGameService,
              private authService:AuthService,
              private gameService: GameService,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this.media.broadcast();
    this._titleService.setTitle('BGA');
    if(this.authService.isAuthenticated()){
      this.loadOpenGamesByUser();
      EmitterService.get(this.gameListId).subscribe((game: Game[]) => {
        this.loadOpenGamesByUser()
      });
    }
    else{
      this.loadOpenGames();
      EmitterService.get(this.gameListId).subscribe((game: Game[]) => {
        this.loadOpenGames()
      });
    }

  }

  public loadOpenGamesByUser(): void {
    this._loadingService.register('games.list');
    this.gameService.getOpenGamesByUser().subscribe(
      (games: Game[]) => {
        this.openGames = games;
        this._loadingService.resolve('games.list');
      }, (error: Error) => {
        this.gameService.getOpenGamesByUser().subscribe((games: Game[]) => {
          this.openGames = games;
          this._loadingService.resolve('games.list');
        });
      });
  }

  public loadOpenGames(): void {
    this._loadingService.register('games.list');
    this.gameService.getOpenGames().subscribe(
      (games: Game[]) => {
        this.openGames = games;
        this._loadingService.resolve('games.list');
      }, (error: Error) => {
        this.gameService.getOpenGames().subscribe((games: Game[]) => {
          this.openGames = games;
          this._loadingService.resolve('games.list');
        });
      });
  }
}
