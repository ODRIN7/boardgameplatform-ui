import {Component, Input, OnInit} from "@angular/core";
import {Shopping} from "../../../shared/domain/shopping";
import {TdMediaService, TdDialogService, TdLoadingService} from "@covalent/core";
import {EmitterService} from "../../../shared/services/emitter.service";
import {StoreService} from "../../../shared/services/store.service";
import {BoardGameService} from "../../../shared/services/boardGame.service";
import {MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {BoardGame} from "../../../shared/domain/boardgamee";


@Component({
  selector: 'bga-card-item',
  templateUrl: 'card-item.component.html'
})
export class CardItemComponent implements OnInit {
  @Input() public shopping: Shopping;
  @Input() public shoppingId: number;
  public boardGame: BoardGame;

  private shoppingListId = 'SHOPPING_COMPONENT';
  private boardGameListId = 'BOARDGAME_COMPONENT'


  constructor(private _titleService: Title,
              private _router: Router,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _snackBarService: MdSnackBar,
              private boardGameService: BoardGameService,
              private storeService: StoreService,
              private eventEmitter: EmitterService,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this.media.broadcast();
    this.boardGame =
      new BoardGame(0, "", "http://lorempixel.com/40/40/people/0", "", [], [], "", 1000,1,2);
    this.loadBoardGame();
    EmitterService.get(this.boardGameListId).subscribe((boardGames: BoardGame[]) => {
      this.loadBoardGame()
    });
  }

  public loadBoardGame(): void {
    this._loadingService.register('shoppings.list');
    this.boardGameService.getBoardGameById(this.shopping.boardGameId).subscribe(
      (boardGame: BoardGame) => {
        this.boardGame = boardGame;
        this._loadingService.resolve('shoppings.list');
      }, (error: Error) => {
        this.boardGameService.getBoardGameById(this.shopping.boardGameId).subscribe(
          (boardGame: BoardGame) => {
            this.boardGame = boardGame;
            this._loadingService.resolve('shoppings.list');
          });
      });
  }

  public deleteShoppingList(): void {
    this._dialogService
      .openConfirm({message: 'Are you sure you want to delete this user?'})
      .afterClosed().subscribe((confirm: boolean) => {

      if (confirm) {
        this._loadingService.register('shoppings.list');
        this.storeService.removeShopping(this.shopping.id).subscribe(
          shoppings => {
            EmitterService.get(this.shoppingListId).emit(shoppings);
            this._loadingService.resolve('shoppings.list');
            this._snackBarService.open('Shopping Card deleted', 'Ok');
          }, (error: Error) => {
            this._dialogService.openAlert({message: 'There was an error'});
            this._loadingService.resolve('shoppings.list');
          });
      }
    });

  }
}
