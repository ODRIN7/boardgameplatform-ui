import {Component, OnInit} from "@angular/core";
import {TdMediaService} from "@covalent/core";
import {ActivatedRoute, Router} from "@angular/router";
import {BoardGameService} from "../../shared/services/boardGame.service";
import {BoardGame} from "../../shared/domain/boardgamee";
import {EmitterService} from "../../shared/services/emitter.service";

@Component({
  selector: 'bga-store-detail',
  templateUrl: './store-detail.component.html',
})
export class StoreDetailComponent implements OnInit {
  public boardGame: BoardGame;
  private boardGameId: number;
  private boardGameListId = 'BOARDGAME_COMPONENT';

  constructor(public media: TdMediaService,
              public router:Router,
              private route: ActivatedRoute,
              private boardGameService: BoardGameService) {

  }

  ngOnInit() {
    this.boardGame =
      new BoardGame(0, "", "http://lorempixel.com/40/40/people/7", "", [], [], "", 1000, 1,2);
    this.loadBoardGame();
    this.route.params.subscribe(
      (params: any) => {
        this.boardGameId = +params['id'];
      }
    );

    EmitterService.get(this.boardGameListId).subscribe((boardGames: BoardGame[]) => {
      this.loadBoardGame()
    });
  }

  public loadBoardGame(): void {
    this.boardGameService.getBoardGameById(this.boardGameId).subscribe(
      (boardGame: BoardGame) => {
        this.boardGame = boardGame;
      }, (error: Error) => {
        this.boardGameService.getBoardGameById(this.boardGameId).subscribe(
          (boardGame: BoardGame) => {
            this.boardGame = boardGame;
          });
      });
  }

  public goBack(route: string): void {
    window.history.back();
  }
}
