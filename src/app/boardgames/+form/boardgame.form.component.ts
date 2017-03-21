import {Component, AfterViewInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {TdMediaService, TdLoadingService, TdDialogService} from "@covalent/core";
import {BoardGameType} from "../../shared/domain/boardGame.type";
import {BoardGame} from "../../shared/domain/boardgamee";
import {BoardGameService} from "../../shared/services/boardGame.service";
import {BGtypeBoxParamObj} from "./typeBoxParamObj";
import {EmitterService} from "../../shared/services/emitter.service";
import {MdSnackBar} from "@angular/material";


@Component({
  selector: 'bga-boardgames-admin-form',
  templateUrl: './boardgame.form.component.html',
  styleUrls: ['./boardgame.form.component.scss'],
})
export class BoardGameFormComponent implements AfterViewInit {

  public boardGame: BoardGame;
  public allBoardGameTypes: Array<BGtypeBoxParamObj>;
  private action: string;
  private boardGameid: number;
  private boardGameListId = 'BOARDGAME_COMPONENT'

  constructor(public router: Router,
              private _route: ActivatedRoute,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _snackBarService: MdSnackBar,
              private boardGameService: BoardGameService,
              private eventEmitter: EmitterService,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this.addPageInit();
    if (this.action != 'add') {
      this._route.params.subscribe((params: {id: string}) => {
        this.boardGameid = +params.id;
      });
    }
    else if (this.action == 'add') {
      this.initBoardGameTypes()
    }
  }

  private  addPageInit(): void {
    var id: number = Math.floor(Math.random() * (3000 - 2000));
    this.boardGame =
      new BoardGame(id, "", "http://lorempixel.com/40/40/people/7", "", [], [], "", 1000,1,2);
  }

  private initBoardGameTypes(): void {
    this.allBoardGameTypes = [];
    var options: string[] = Object.keys(BoardGameType);
    options = options.slice(options.length / 2);
    for (var i = 0; i < options.length; i++) {
      this.allBoardGameTypes.push(new BGtypeBoxParamObj(options[i], this.isChecked(options[i])));
    }
  }

  ngAfterViewInit(): void {
    this.media.broadcast();
    if (this.action != 'add') {
      this.boardGameService.getBoardGameById(this.boardGameid).subscribe((boardgame: BoardGame) => {
        if (boardgame) {
          this.boardGame = boardgame;
          this.initBoardGameTypes();
        }
      });
    }

  }

  private isChecked(boardGameType: string): boolean {
    return this.boardGame.typeOfBoardGames.indexOf(boardGameType) >= 0;
  }

  public checkk(bGtypeBoxParamObj: BGtypeBoxParamObj): void {
    if (bGtypeBoxParamObj.checked) {
      this.boardGame.typeOfBoardGames
        .splice(this.boardGame.typeOfBoardGames.indexOf(bGtypeBoxParamObj.name), 1);
      bGtypeBoxParamObj.checked = false;
    }
    else if (!bGtypeBoxParamObj.checked) {
      this.boardGame.typeOfBoardGames.push(bGtypeBoxParamObj.name);
      bGtypeBoxParamObj.checked = true;
    }
  }

  private setcheckedType(): void {
    this.boardGame.typeOfBoardGames = [];
    for (var i = 0; i < this.allBoardGameTypes.length; i++) {
      if (this.allBoardGameTypes[i].checked) {
        this.boardGame.typeOfBoardGames.push(this.allBoardGameTypes[i].name);
      }
    }
  }

  public save(): void {
    this.setcheckedType();
    this._loadingService.register('boardGames.list');
    if (this.action == 'add') {
      this.boardGameService.create(this.boardGame).subscribe(
        (boardGame) => {
          EmitterService.get(this.boardGameListId).emit(boardGame);
          this._loadingService.resolve('boardGames.list');
          this._snackBarService.open('BoardGame Created', 'Ok');
        }, (error: Error) => {
          this._dialogService.openAlert({message: 'There was an error'});
          this._loadingService.resolve('boardGames.list');
        });
    }
    else {
      this.boardGameService.edit(this.boardGame).subscribe(
        (boardGame) => {
          EmitterService.get(this.boardGameListId).emit(boardGame);
          console.log(boardGame);
          this._loadingService.resolve('boardGames.list');
          this._snackBarService.open('BoardGame Edited', 'Ok');
        }, (error: Error) => {
          this._dialogService.openAlert({message: 'There was an error'});
          this._loadingService.resolve('boardGames.list');
        });
    }
    this.router.navigate(['/boardgames']);
  }

  public goBack(): void {
    window.history.back();
  }

  public fileSelectMsg: String = 'No file selected yet.';
  public fileUploadMsg: String = 'No file uploaded yet.';
  public disabled: boolean = false;

  public selectEvent(file: File): void {
    this.fileSelectMsg = file.name;
  };

  public uploadEvent(file: File): void {
    this.fileUploadMsg = file.name;
  };

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }
}

