import {Component, OnChanges, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {MdSnackBar} from "@angular/material";
import {TdLoadingService, TdDialogService, TdMediaService} from "@covalent/core";
import {BoardGame} from "../../shared/domain/boardgamee";
import {BoardGameService} from "../../shared/services/boardGame.service";
import {BoardGameType} from "../../shared/domain/boardGame.type";
import {EmitterService} from "../../shared/services/emitter.service";


@Component({
  selector: 'bga-boardgames-manager',
  templateUrl: './boardgames.component.html',
  styleUrls: ['./boardgames.component.scss'],
})
export class BoardGameManagerComponent implements OnInit, OnChanges {

  public boardGames: BoardGame[] = [];
  public filteredBoardGames: BoardGame[] = [];
  public allBoardGameTypes: Array<string>;
  private boardGameListId = 'BOARDGAME_COMPONENT'


  constructor(private _titleService: Title,
              private _router: Router,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _snackBarService: MdSnackBar,
              private boardGameService: BoardGameService,
              private eventEmitter: EmitterService,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this.media.broadcast();
    this.initBoardGameTypes();
    this._titleService.setTitle('BGA');
    this.loadBoardGames();
    EmitterService.get(this.boardGameListId).subscribe((boardGames: BoardGame[]) => {
      this.loadBoardGames()
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
    this._router.navigate(["arena/"]);
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

  public deleteBoardGame(id: number): void {
    this._dialogService
      .openConfirm({message: 'Are you sure you want to delete this user?'})
      .afterClosed().subscribe((confirm: boolean) => {

      if (confirm) {
        this._loadingService.register('boardGames.list');
        this.boardGameService.deleteById(id).subscribe(
          boardgames => {
            EmitterService.get(this.boardGameListId).emit(boardgames);
            this._loadingService.resolve('boardGames.list');
            this._snackBarService.open('BoardGame deleted', 'Ok');
          }, (error: Error) => {
            this._dialogService.openAlert({message: 'There was an error'});
            this._loadingService.resolve('boardGames.list');
          });
      }
    });

  }
}
