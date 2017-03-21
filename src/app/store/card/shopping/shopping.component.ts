import {Component, HostBinding, OnInit, OnChanges, SimpleChanges} from "@angular/core";
import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  TdDialogService,
  TdDataTableService,
  IPageChangeEvent,
  ITdDataTableSortChangeEvent,
  TdLoadingService
} from "@covalent/core";
import {slideInDownAnimation} from "../../../app.animations";
import {StoreService} from "../../../shared/services/store.service";
import {EmitterService} from "../../../shared/services/emitter.service";
import {Shopping} from "../../../shared/domain/shopping";
import {BoardGame} from "../../../shared/domain/boardgamee";
import {BoardGameService} from "../../../shared/services/boardGame.service";
import {ShoppingParam} from "./shoppingParam";
import {Status} from "../../../shared/domain/Status";
import any = jasmine.any;
import {MdSnackBar} from "@angular/material";
import {AuthService} from "../../../shared/services/auth/auth.services";

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'bga-shopping',
  templateUrl: 'shopping.component.html',
  animations: [slideInDownAnimation],
})
export class ShoppingComponent implements OnInit, OnChanges {


  @HostBinding('@routeAnimation') routeAnimation: boolean = true;
  @HostBinding('class.td-route-animation') classAnimation: boolean = true;
  selectable: boolean = true;
  multiple: boolean = true;
  data: ShoppingParam[] = [];
  shoppings: Shopping[] = [];
  boardGames: BoardGame[] = [];
  private shoppingListId = 'SHOPPING_COMPONENT';
  private boardGameListId = 'BOARDGAME_COMPONENT'
  private tableListId = 'TableListId_COMPONENT'
  private startingNum: number = 100;
  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;
  selectedRows: any[] = [];

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  sortBy: string = 'boardGame.name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private _dataTableService: TdDataTableService,
              private storeService: StoreService,
              private _snackBarService: MdSnackBar,
              private boardGameService: BoardGameService,
              private _loadingService: TdLoadingService,
              private authService: AuthService,
              private _dialogService: TdDialogService) {
  }

  openPrompt(row: any, name: string): void {
    this._dialogService.openPrompt({
      message: 'Enter comment?',
      value: row[name],
    }).afterClosed().subscribe((value: any) => {
      if (value !== undefined) {
        row[name] = value;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadShoppingList();
    this.filter();
    this.toggleTooltips();
    this.loadBoardGame();
    EmitterService.get(this.boardGameListId).subscribe((boardGames: BoardGame[]) => {
      this.loadBoardGame();
      this.refreshTableITems();
    });
    EmitterService.get(this.shoppingListId).subscribe((shopping: Shopping[]) => {
      this.loadShoppingList();
      this.refreshTableITems();
    });
  }

  ngOnInit(): void {

    this.loadShoppingList();
    this.filter();
    this.toggleTooltips();
    this.loadBoardGame();
    this.refreshTableITems();
    EmitterService.get(this.boardGameListId).subscribe((boardGames: BoardGame[]) => {
      this.loadBoardGame()
      this.refreshTableITems();
    });
    EmitterService.get(this.shoppingListId).subscribe((shopping: Shopping[]) => {
      this.loadShoppingList()
      this.refreshTableITems();
    });

    EmitterService.get(this.tableListId).subscribe((shopping: Shopping[]) => {
      this.loadShoppingList();
      this.loadShoppingList();
      this.refreshTableITems();
    });

  }

  public loadBoardGame(): void {

    let shoppingIds: number[] = this.shoppings.map(element => {
      return element.boardGameId;
    });

    this._loadingService.register('shoppings.list');
    this.boardGameService.getBoardGameByIds(shoppingIds).subscribe(
      (boardGames: BoardGame[]) => {
        if (boardGames && boardGames.length > 0) {
          this.boardGames = boardGames;
          this._loadingService.resolve('shoppings.list');
          this.refreshTableITems();
        }
      }, (error: Error) => {
        this.boardGameService.getBoardGameByIds(shoppingIds).subscribe(
          (boardGames: BoardGame[]) => {
            this.boardGames = boardGames;
            this._loadingService.resolve('shoppings.list');
          });
      });
  }

  public loadShoppingList(): void {
    this._loadingService.register('shoppings.list');
    this.storeService.getShoppingsByUser().subscribe(
      (shoppings: Shopping[]) => {
        if (shoppings && shoppings.length > 0) {
          this.shoppings = shoppings;
          this._loadingService.resolve('shoppings.list');
          this.loadBoardGame();
          this.refreshTableITems();
        }
      }, (error: Error) => {
        this.storeService.getShoppingsByUser().subscribe((shoppings: Shopping[]) => {
          this.shoppings = shoppings;
          this._loadingService.resolve('shoppings.list');
        });
      });
  }

  public refreshTableITems(): void {
    this.data = this.shoppings.map(element => {
      return this.createItem(this.startingNum, this.getBoardGameById(element.boardGameId), element, element.status, element.shoppingPrice);
    });

  }

  private createItem(id: number,
                     boardGame: BoardGame,
                     shopping: Shopping,
                     status: Status,
                     shoppingPrice: number): ShoppingParam {
    return new ShoppingParam(id, boardGame, shopping, status, shoppingPrice);
  }

  private getBoardGameById(boardGameId: number): BoardGame {
    return this.boardGames.filter(element => {
      return element.id == boardGameId;
    })[0];
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.data;
    newData = this._dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

  deleteElements(): void {
    this.authService.refreshToken();
    this._dialogService
      .openConfirm({message: 'Are you sure you want to delete this user?'})
      .afterClosed().subscribe((confirm: boolean) => {
      let deletedIds: number[] = this.data.map(element => {
        return element.shopping.id;
      });
      if (confirm) {
        this._loadingService.register('shoppings.list');
        this.storeService.removeShoppings(deletedIds).subscribe(
          () => {
            EmitterService.get(this.shoppingListId).emit(this.deleteElements());
            this._loadingService.resolve('shoppings.list');
            this._snackBarService.open('Shopping Card deleted', 'Ok');
          }, (error: Error) => {
            this._dialogService.openAlert({message: 'There was an error'});
            this._loadingService.resolve('shoppings.list');
          });
      }
    });

  }

  buyElements(): void {
    this.authService.refreshToken();
    this._dialogService
      .openConfirm({message: 'Are you sure you want to Buy it this user?'})
      .afterClosed().subscribe((confirm: boolean) => {
      let buyIds: number[] = this.data.map(element => {
        return element.shopping.id;
      });
      if (confirm) {
        this._loadingService.register('shoppings.list');
        this.storeService.buy(buyIds).subscribe(
          () => {
            EmitterService.get(this.shoppingListId).emit(this.shoppings);
            this._loadingService.resolve('shoppings.list');
            this._snackBarService.open('Shopping Card deleted', 'Ok');
          }, (error: Error) => {
            this._dialogService.openAlert({message: 'There was an error'});
            this._loadingService.resolve('shoppings.list');
          });
      }
    });
  }

  toggleTooltips(): void {
    if (this.columns[0].tooltip) {
      this.columns.forEach((c: any) => delete c.tooltip);
    } else {
      this.columns.forEach((c: any) => c.tooltip = `This is ${c.label}!`);
    }
  }

  dataTableAttrs: Object[] = [{
    description: `Rows of data to be displayed`,
    name: 'data',
    type: 'Shopping[]',
  }, {
    description: `List of columns to be displayed`,
    name: 'columns?',
    type: 'ITdDataTableColumn[]',
  }, {
    description: `Enables row selection events, hover and selected row states.`,
    name: 'selectable?',
    type: 'boolean',
  }, {
    description: `Enables multiple row selection. [selectable] needs to be enabled.`,
    name: 'multiple?',
    type: 'boolean',
  }, {
    description: `Enables sorting events, sort icons and active column states.`,
    name: 'sortable?',
    type: 'boolean',
  }, {
    description: `Sets the active sort column. [sortable] needs to be enabled.`,
    name: 'sortBy?',
    type: 'string',
  }, {
    description: `Sets the sort order of the [sortBy] column. [sortable] needs to be enabled.
                  Defaults to 'ASC' or TdDataTableSortingOrder.Ascending`,
    name: 'sortOrder?',
    type: `['ASC' | 'DESC'] or TdDataTableSortingOrder`,
  }, {
    description: `Event emitted when the column headers are clicked. [sortable] needs to be enabled.
                  Emits an [ITdDataTableSortEvent] implemented object.`,
    name: 'sortChange',
    type: `function()`,
  }, {
    description: `Event emitted when a row is selected/deselected. [selectable] needs to be enabled.
                  Emits an [ITdDataTableSelectEvent] implemented object.`,
    name: 'rowSelect',
    type: `function()`,
  }, {
    description: `Event emitted when all rows are selected/deselected by the all checkbox.
                  [selectable] needs to be enabled.
                  Emits an [ITdDataTableSelectAllEvent] implemented object.`,
    name: 'selectAll',
    type: `function()`,
  }, {
    description: `Refreshes data table and updates [data] and [columns]`,
    name: 'refresh',
    type: `function()`,
  }];

  cellAttrs: Object[] = [{
    description: `Makes cell follow the numeric data-table specs. Defaults to 'false'`,
    name: 'numeric',
    type: `boolean`,
  }];

  columnAttrs: Object[] = [{
    description: `Sets unique column [name] for [sortable] events.`,
    name: 'name',
    type: `string`,
  }, {
    description: `Enables sorting events, sort icons and active column states. Defaults to 'false'`,
    name: 'sortable',
    type: `boolean`,
  }, {
    description: `Sets the sort order of column. Defaults to 'ASC' or TdDataTableSortingOrder.Ascending`,
    name: 'sortOrder',
    type: `['ASC' | 'DESC'] or TdDataTableSortingOrder`,
  }, {
    description: `Sets column to active state when 'true'. Defaults to 'false'`,
    name: 'active',
    type: `boolean`,
  }, {
    description: `Makes cell follow the numeric data-table specs. Defaults to 'false'`,
    name: 'numeric',
    type: `boolean`,
  }, {
    description: `Event emitted when the column headers are clicked. [sortable] needs to be enabled.
                  Emits an [ITdDataTableSortChangeEvent] implemented object.`,
    name: 'sortChange',
    type: `function`,
  }];

  serviceAttrs: Object[] = [{
    description: `Searches [data] parameter for [searchTerm] matches and returns a new array with them.`,
    name: 'filterData',
    type: `function(data: any[], searchTerm: string, ignoreCase: boolean)`,
  }, {
    description: `Sorts [data] parameter by [sortBy] and [sortOrder] and returns the sorted data.`,
    name: 'sortData',
    type: `function(data: any[], sortBy: string, sortOrder: TdDataTableSortingOrder): any[]`,
  }, {
    description: `Returns a section of the [data] parameter starting from [fromRow] and ending in [toRow].`,
    name: 'pageData',
    type: `function(data: any[], fromRow: number, toRow: number): any[]`,
  }];

  columns: ITdDataTableColumn[] = [
    {name: 'shopping.id', label: 'Id'},
    {name: 'boardGame.name', label: 'Name'},
    {name: 'boardGame.shortDescription', label: 'Full Name'},
    {name: 'boardGame.typeOfBoardGames', label: 'Type'},
    {name: 'boardGame.maxplayer', label: 'Min Player'},
    {name: 'boardGame.minplayer', label: 'Max Player'},
    {name: 'boardGame.price', label: 'Price', numeric: true, format: NUMBER_FORMAT},
    {name: 'shopping.status', label: 'Status', numeric: true, format: NUMBER_FORMAT},
  ];
}
