import {Component, OnInit, AfterViewInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {TdMediaService, TdLoadingService, TdDialogService} from "@covalent/core";
import {User} from "../../shared/domain/user";
import {MdSnackBar} from "@angular/material";
import {EmitterService} from "../../shared/services/emitter.service";
import {Role, Authority} from "../../shared/domain/authority.type";
import {UsersService} from "../../shared/services/users.sevice";


@Component({
  selector: 'qs-user-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class UsersFormComponent implements OnInit, AfterViewInit {

  admin: boolean;
  public user: User;
  private action: string;
  private userId: string;
  private userListItem = 'USER_COMPONENT'

  constructor(public router: Router,
              private _route: ActivatedRoute,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _snackBarService: MdSnackBar,
              private userService: UsersService,
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
        this.userId = params.id;
      });
    }
  }

  private  addPageInit(): void {
    var id: number = Math.floor(Math.random() * (3000 - 2000));
    this.user =
      new User("", "", "", "http://lorempixel.com/40/40/people/7", [], [], []);
  }

  ngAfterViewInit(): void {
    this.media.broadcast();
    if (this.action != 'add') {
      this.userService.getUserByUsername(this.userId).subscribe((user: User) => {
        if (user) {
          this.user = user;
          if (this.hasAdminRole())
            this.admin = true;
        }
      });
    }
  }

  private hasAdminRole(): boolean {
    if( this.user.authorities){
      return this.user.authorities.indexOf(new Authority(Role.ADMIN_ROLE)) > -1;
    }
  }

  public save(): void {
    this.setAuthority();
    this._loadingService.register('users.list');
    if (this.action == 'add') {
      this.userService.create(this.user).subscribe(
        (user) => {
          EmitterService.get(this.userListItem).emit(user);
          this._loadingService.resolve('users.list');
          this._snackBarService.open('User Created', 'Ok');
        }, (error: Error) => {
          console.log(error.message);
          this._dialogService.openAlert({message: 'There was an error'});
          this._loadingService.resolve('users.list');
        });
    }
    else {
      this.userService.edit(this.user).subscribe(
        (user) => {
          EmitterService.get(this.userListItem).emit(user);
          console.log(user);
          this._loadingService.resolve('users.list');
          this._snackBarService.open('User Edited', 'Ok');
        }, (error: Error) => {
          this._dialogService.openAlert({message: 'There was an error'});
          this._loadingService.resolve('user.list');
        });
    }
    this.router.navigate(['/users']);
  }

  private setAuthority() {
    if (this.admin) {
      this.user.authorities.push(new Authority(Role.ADMIN_ROLE));
    }
    this.user.authorities.push(new Authority(Role.USER_ROLE));
  }

  public goBack(): void {
    window.history.back();
  }

  public isEdited():boolean{
    return this.action !='add';
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
