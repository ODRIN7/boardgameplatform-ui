import {Component, HostBinding, OnInit, OnChanges} from "@angular/core";
import {slideInDownAnimation} from "../../../app.animations";
import {EmitterService} from "../../../shared/services/emitter.service";
import {BoardGame} from "../../../shared/domain/boardgamee";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {TdLoadingService, TdDialogService, TdMediaService} from "@covalent/core";
import {MdSnackBar} from "@angular/material";
import {BoardGameService} from "../../../shared/services/boardGame.service";

@Component({
  selector: 'bga-arena-starter',
  templateUrl: './arena.start.component.html',
  styleUrls: ['./arena.start.component.scss'],
  animations: [slideInDownAnimation],
})
export class ArenaStartComponent implements OnInit, OnChanges {

  @HostBinding('@routeAnimation') routeAnimation: boolean = true;
  @HostBinding('class.td-route-animation') classAnimation: boolean = true;
  public boardGames: BoardGame[] = [];
  public filteredBoardGames: BoardGame[] = [];
  private boardGameListId = 'BOARDGAME_COMPONENT'
  private expansion1: boolean = false;
  private disabled: boolean = false;


  constructor(private _loadingService: TdLoadingService,
              private boardGameService: BoardGameService,
              public media: TdMediaService) {
  }


  ngOnInit(): void {
    this.media.broadcast();
    this.loadBoardGames();
    EmitterService.get(this.boardGameListId).subscribe((boardGames: BoardGame[]) => {
      this.loadBoardGames()
    });
  }

  ngOnChanges(changes: any) {

    this.loadBoardGames();
    EmitterService.get(this.boardGameListId).subscribe((boardGames: BoardGame[]) => {
      this.loadBoardGames()
    });
  }

  public goBack(route: string): void {
    window.history.back();
  }

  public loadBoardGames(): void {
    this._loadingService.register('boardGames.list');
    this.boardGameService.getBoardGamesByUser().subscribe(
      (boardGames: BoardGame[]) => {
        this.boardGames = boardGames;
        this.filteredBoardGames = boardGames;
        this._loadingService.resolve('boardGames.list');
      }, (error: Error) => {
        this.boardGameService.getBoardGamesByUser().subscribe((boardGames: BoardGame[]) => {
          this.boardGames = boardGames;
          this.filteredBoardGames = boardGames;
          this._loadingService.resolve('boardGames.list');
        });
      });
  }


  toggleExpansion1(): void {
    if (!this.disabled) {
      this.expansion1 = !this.expansion1;
    }
  }
}
