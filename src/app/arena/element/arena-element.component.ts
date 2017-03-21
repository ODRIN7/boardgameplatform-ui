import {Component, OnInit} from "@angular/core";
import {slideInDownAnimation} from "../../app.animations";
import {ActivatedRoute, Router} from "@angular/router";
import {EmitterService} from "../../shared/services/emitter.service";
import {BoardGame} from "../../shared/domain/boardgamee";
import {TdLoadingService, TdDialogService, TdMediaService} from "@covalent/core";
import {MdSnackBar} from "@angular/material";
import {BoardGameService} from "../../shared/services/boardGame.service";
import {GameService} from "../../shared/services/game.service";
import {Game} from "../../shared/domain/game";
import {Status} from "../../shared/domain/gameStatus";
import {AuthService} from "../../shared/services/auth/auth.services";


@Component({
  selector: 'bga-arena-element',
  templateUrl: './arena-element.component.html',
  styleUrls: ['./arena-element.component.scss'],
  animations: [slideInDownAnimation],
})
export class ArenaElementComponent implements OnInit {


  public boardGame: BoardGame;
  public game: Game;
  private gameId: number;
  private boardGameListId = 'BOARDGAME_COMPONENT';
  private gameListId = 'GAME_COMPONENT';
  private messageListId = 'CHAT_COMPONENT';

  constructor(private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _snackBarService: MdSnackBar,
              private boardGameService: BoardGameService,
              private gameService: GameService,
              private route: ActivatedRoute,
              private router:Router,
              private authService:AuthService,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: any) => {
        this.gameId = +params['id'];
      }
    );
    this.boardGame =
      new BoardGame(3, "", "http://lorempixel.com/40/40/people/7", "", [], [], "", 1000,1,2);
    this.game = new Game(3, 2, "myGame", 1, [], Status.CREATED, "",1);
    this.media.broadcast();

    this.loadGame();
    EmitterService.get(this.gameListId).subscribe((games: Game[]) => {
      this.loadGame()
    });
  }

  public goBack(): void {
    this.authService.refreshToken();
    this.exit();
  }
  public loadGame(): void {
    this._loadingService.register('games.list');
    this.gameService.getGameById(this.gameId).subscribe(
      (game: Game) => {
        this.game = game;
        this._loadingService.resolve('games.list');
        if(game.id > 50){
          this.loadBoardGame();
          EmitterService.get(this.boardGameListId).subscribe((boardGames: BoardGame[]) => {
            this.loadBoardGame()
            this.router.navigate(["arena/"]);
          });
        }
      }, (error: Error) => {
        this.gameService.getGameById(this.gameId).subscribe(
          (game: Game) => {
            this.game = game;
            this._loadingService.resolve('games.list');
          });
      });
  }

  public loadBoardGame(): void {
    this._loadingService.register('boardGames.list');
    this.boardGameService.getBoardGameById(this.game.boardGameId).subscribe(
      (boardGame: BoardGame) => {
        this.boardGame = boardGame;
        this._loadingService.resolve('boardGames.list');
      }, (error: Error) => {
        this.boardGameService.getBoardGameById(this.game.boardGameId).subscribe((boardGame: BoardGame) => {
          this.boardGame = boardGame;
          this._loadingService.resolve('boardGames.list');
        });
      });
  }

  private exit(): void {
    this._dialogService
      .openConfirm({message: 'Are you sure you want to exit from ' + this.game.title + ' ?'})
      .afterClosed().subscribe((confirm: boolean) => {

      if (confirm) {
        this._loadingService.register('games.list');
        this.gameService.disconnect(this.game).subscribe(
          game => {
            EmitterService.get(this.boardGameListId).emit(game);
            this._loadingService.resolve('games.list');
            this._snackBarService.open('Disconnected succes', 'Ok');
          }, (error: Error) => {
            this._dialogService.openAlert({message: 'There was an error'});
            this._loadingService.resolve('games.list');
          });
      }
    });
  }
}
