import {Component, Input, HostBinding, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";
import {slideInDownAnimation} from "../../../app.animations";
import {GameService} from "../../../shared/services/game.service";
import {BoardGameService} from "../../../shared/services/boardGame.service";
import {Game} from "../../../shared/domain/game";
import {Status} from "../../../shared/domain/gameStatus";
import {EmitterService} from "../../../shared/services/emitter.service";
import {MdSnackBar} from "@angular/material";
import {TdDialogService, TdLoadingService} from "@covalent/core";
import {BoardGame} from "../../../shared/domain/boardgamee";


@Component({
  selector: 'bga-arena-item',
  templateUrl: 'arena-item.component.html',
  animations: [slideInDownAnimation],
})
export class ArenaItemComponent {

  @Input() boardGame: BoardGame;
  @HostBinding('@routeAnimation') routeAnimation: boolean = true;
  @HostBinding('class.td-route-animation') classAnimation: boolean = true;
  expandCollapseExpansion1Msg: string = 'No expanded/collapsed detected yet';
  expansion1: boolean = false;
  disabled: boolean = false;
  private gameListId = 'GAME_COMPONENT'
  private boardGameListId = 'BOARDGAME_COMPONENT'

  constructor(private router: Router,
              private boardGameService: BoardGameService,
              private dialogService: TdDialogService,
              private loadingService: TdLoadingService,
              private snackBar: MdSnackBar,
              private gameService: GameService,) {
  }

  toggleExpansion1(): void {
    if (!
        this.disabled
    ) {
      this.expansion1 = !this.expansion1;
    }
  }

  expandExpansion1Event(): void {
    this.expandCollapseExpansion1Msg = 'Expand event emitted.';
  }

  collapseExpansion1Event(): void {
    this.expandCollapseExpansion1Msg = 'Collapse event emitted.';
  }

  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public onPlay(boardGameId: number): void {
    let newGame: Game =
      new Game(2, 1, "myGame", boardGameId, [], Status.CREATED, "", 1);
    this.gameService.create(newGame).subscribe(
      (game) => {
        newGame.id = game.id;
        EmitterService.get(this.gameListId).emit(game);
        if (newGame.id > 1) {
          this.router.navigate(["/arena/" + newGame.id]);
          this.snackBar.open(' Room Created', 'Ok');
        }
      }, (error: Error) => {
        this.dialogService.openAlert({message: 'There was an error'});
      });
  }

  public createNewGame(boardGameId: number): void {
    let newGame: Game =
      new Game(2, 1, "myGame", boardGameId, [], Status.CREATED, "", this.boardGame.maxplayer);
    this.gameService.create(newGame).subscribe(
      (game) => {
        newGame.id = game.id;
        EmitterService.get(this.gameListId).emit(game);
        if (newGame.id > 50) {
          this.router.navigate(["arena/" + newGame.id]);
          this.snackBar.open(' Room Created', 'Ok');
        }
      }, (error: Error) => {
        this.dialogService.openAlert({message: 'There was an error'});
      });

  }


  public deleteBoardGame(): void {
    this.dialogService
      .openConfirm({message: 'Are you sure you want to delete this boardgame?'})
      .afterClosed().subscribe((confirm: boolean) => {

      if (confirm) {
        this.loadingService.register('boardGames.list');
        this.boardGameService.deleteByUser(this.boardGame.id).subscribe(
          () => {
            EmitterService.get(this.boardGameListId).emit(this.boardGame);
            this.loadingService.resolve('boardGames.list');
            this.snackBar.open('BoardGame deleted', 'Ok');
          }, (error: Error) => {
            this.dialogService.openAlert({message: 'There was an error'});
            this.loadingService.resolve('boardGames.list');
          });
      }
    });

  }

}
