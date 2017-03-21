import {Component, Input, OnInit} from "@angular/core";
import {Game} from "../../../shared/domain/game";
import {Router} from "@angular/router";
import {TdLoadingService, TdMediaService, TdDialogService} from "@covalent/core";
import {GameService} from "../../../shared/services/game.service";
import {BoardGameService} from "../../../shared/services/boardGame.service";
import {MdSnackBar} from "@angular/material";
import {EmitterService} from "../../../shared/services/emitter.service";
import {BoardGame} from "../../../shared/domain/boardgamee";


@Component({
  selector: 'bga-opened-game-item',
  templateUrl: 'open-game-item.component.html'
})
export class OpenGameComponent implements OnInit{
  @Input() game: Game;
  @Input() routing: String;
  public boardGame: BoardGame;

  private gameListId = 'GAME_COMPONENT'


  constructor(private router: Router,
              private _loadingService: TdLoadingService,
              private dialogService: TdDialogService,
              private snackBarService: MdSnackBar,
              private boardGameService: BoardGameService,
              private gameService: GameService,
              public media: TdMediaService) {
  }


  ngOnInit(): void {
    this.media.broadcast();
    this.boardGame =
      new BoardGame(0, "", "http://lorempixel.com/40/40/people/0", "", [], [], "", 1000, 1, 2);
    this.loadBoardGame();
    EmitterService.get(this.gameListId).subscribe((game: Game[]) => {
      this.loadBoardGame()
    });
  }

  public loadBoardGame(): void {
    this._loadingService.register('games.list');
    this.boardGameService.getBoardGameById(this.game.boardGameId).subscribe(
      (boardGame: BoardGame) => {
        this.boardGame = boardGame;
        this._loadingService.resolve('games.list');
      }, (error: Error) => {
        this.boardGameService.getBoardGameById(this.game.boardGameId).subscribe(
          (boardGame: BoardGame) => {
            this.boardGame = boardGame;
            this._loadingService.resolve('games.list');
          });
      });
  }

  public connectToGame() {
    this.gameService.connect(this.game).subscribe(
      (game) => {
        this.game.id = game.id;
        EmitterService.get(this.gameListId).emit(game);
        if (this.game.id > 1) {
          this.router.navigate(["arena/" + this.game.id]);
          this.snackBarService.open(' Connected to Room', 'Ok');
        }
      }, (error: Error) => {
        this.dialogService.openAlert({message: 'There was an error'});
      });
  }
}
