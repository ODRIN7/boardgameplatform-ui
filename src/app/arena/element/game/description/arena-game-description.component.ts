import {Component, HostBinding, Input, AfterViewInit, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {slideInDownAnimation} from "../../../../app.animations";
import {Boardgame} from "../../../../shared/domain/boardgame";
import {StoreService} from "../../../../shared/services/store.service";
import {BoardGame} from "../../../../shared/domain/boardgamee";
import {EmitterService} from "../../../../shared/services/emitter.service";
import {TdMediaService} from "@covalent/core";
import {BoardGameService} from "../../../../shared/services/boardGame.service";


@Component({
  selector: 'bga-arena-game-description',
  templateUrl: './arena-game-description.component.html',
  styleUrls: ['./arena-game-description.component.scss'],
  animations: [slideInDownAnimation],
})
export class ArenaGameDescriptionComponent implements  OnInit{

  @Input()public boardGame: BoardGame;
  private boardGameListId = 'BOARDGAME_COMPONENT';

  constructor(public media: TdMediaService,
              public router:Router,
              private route: ActivatedRoute,
              private boardGameService: BoardGameService) {

  }

  ngOnInit() {
    this.boardGame =
      new BoardGame(0, "aaa", "http://lorempixel.com/40/40/people/7", "", [], [], "", 1000,1,2);
    EmitterService.get(this.boardGameListId).subscribe((boardGames: BoardGame[]) => {
      this.loadBoardGame()
    });
  }

  public loadBoardGame(): void {
    this.boardGameService.getBoardGameById(this.boardGame.id).subscribe(
      (boardGame: BoardGame) => {
        this.boardGame = boardGame;
      }, (error: Error) => {
        this.boardGameService.getBoardGameById(this.boardGame.id).subscribe(
          (boardGame: BoardGame) => {
            this.boardGame = boardGame;
          });
      });
  }
}

