import {Component, OnInit, OnChanges} from "@angular/core";
import {TdMediaService, TdDialogService, TdLoadingService} from "@covalent/core";
import {StoreService} from "../shared/services/store.service";
import {MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {BoardGame} from "../shared/domain/boardgamee";
import {EmitterService} from "../shared/services/emitter.service";
import {BoardGameService} from "../shared/services/boardGame.service";
import {BoardGameType} from "../shared/domain/boardGame.type";
import {Shopping} from "../shared/domain/shopping";
import {Status} from "../shared/domain/Status";
import {AuthService} from "../shared/services/auth/auth.services";

@Component({
  selector: 'bga-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit, OnChanges {

  public shoppingCard: Shopping[] = [];
  public boardGames: BoardGame[] = [];
  public filteredBoardGames: BoardGame[] = [];
  public allBoardGameTypes: Array<string>;
  private boardGameListId = 'BOARDGAME_COMPONENT';
  private shoppingListId = 'SHOPPING_COMPONENT';


  constructor(private _titleService: Title,
              private _router: Router,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _snackBarService: MdSnackBar,
              private boardGameService: BoardGameService,
              private storeService: StoreService,
              private eventEmitter: EmitterService,
              private authService:AuthService,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this.media.broadcast();
    this.initBoardGameTypes();
    this._titleService.setTitle('BGA');
    this.loadBoardGames();
    this.loadShoppingList();

    EmitterService.get(this.boardGameListId).subscribe((boardGames: BoardGame[]) => {
      this.loadBoardGames()
    });

    EmitterService.get(this.shoppingListId).subscribe((shopping: Shopping[]) => {
      this.loadShoppingList()
    });
  }

  private initBoardGameTypes(): void {
    this.allBoardGameTypes = Object.keys(BoardGameType);
    this.allBoardGameTypes = this.allBoardGameTypes.slice(this.allBoardGameTypes.length / 2);
  }

  ngOnChanges(changes: any) {
    EmitterService.get(this.boardGameListId).subscribe((boardGames: BoardGame[]) => {
      this.loadBoardGames()
    });
  }

  public filterBoardGames(displayName: string = ''): void {
    this.filteredBoardGames = this.boardGames.filter((boardGame: BoardGame) => {
      return boardGame.name.toLowerCase().indexOf(displayName.toLowerCase()) > -1;
    });
  }

  public filterBoardGamesByType(boardGameType: string = ''): void {
    if (boardGameType == '') {
      this.loadBoardGames();
    }
    else {
      this.loadBoardGamesByType(boardGameType);
    }
  }

  public goBack(route: string): void {
    window.history.back();
  }

  public loadBoardGames(): void {
    this._loadingService.register('boardGames.list');
    this.boardGameService.getBoardGames().subscribe(
      (boardGames: BoardGame[]) => {
        this.boardGames = boardGames;
        this.filteredBoardGames = boardGames;
        this._loadingService.resolve('boardGames.list');
      }, (error: Error) => {
        this.boardGameService.getBoardGames().subscribe((boardGames: BoardGame[]) => {
          this.boardGames = boardGames;
          this.filteredBoardGames = boardGames;
          this._loadingService.resolve('boardGames.list');
        });
      });
  }

  public loadBoardGamesByType(boardGameType: string): void {
    this._loadingService.register('boardGames.list');
    this.boardGameService.getBoardGamesByType(boardGameType).subscribe(
      (boardGames: BoardGame[]) => {
        this.boardGames = boardGames;
        this.filteredBoardGames = boardGames;
        this._loadingService.resolve('boardGames.list');
      }, (error: Error) => {
        this.boardGameService.getBoardGamesByType(boardGameType).subscribe((boardGames: BoardGame[]) => {
          this.boardGames = boardGames;
          this.filteredBoardGames = boardGames;
          this._loadingService.resolve('boardGames.list');
        });
      });
  }

  public loadShoppingList(): void {
    this._loadingService.register('shoppings.list');
    this.storeService.getShoppingsByUser().subscribe(
      (shoppings: Shopping[]) => {
        this.shoppingCard = shoppings;
        this._loadingService.resolve('shoppings.list');
      }, (error: Error) => {
        this.storeService.getShoppingsByUser().subscribe((shoppings: Shopping[]) => {
          this.shoppingCard = shoppings;
          this._loadingService.resolve('shoppings.list');
        });
      });
  }

  public addToCards(boardGameId: number): void {
    this._loadingService.register('shoppings.list');
    var id: number = Math.floor(Math.random() * (3000 - 2000));
    var shopping: Shopping = new Shopping(id, boardGameId, "", null,Status.NOT_PAYED,0);
    this.storeService.addToCard(shopping).subscribe(
      (shopping) => {
        EmitterService.get(this.shoppingListId).emit(shopping);
        this._loadingService.resolve('shoppings.list');
        this._snackBarService.open('Add to Your Shopping List', 'Ok');
      }, (error: Error) => {
        this._dialogService.openAlert({message: 'There was an error'});
        this._loadingService.resolve('shoppings.list');
      });
  }
}

