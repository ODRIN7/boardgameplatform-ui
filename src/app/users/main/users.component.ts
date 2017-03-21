import {Component, OnChanges, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {MdSnackBar} from "@angular/material";
import {TdLoadingService, TdDialogService, TdMediaService} from "@covalent/core";
import {User} from "../../shared/domain/user";
import {EmitterService} from "../../shared/services/emitter.service";
import {USER_AUTHORITIES} from "../../shared/domain/authority.type";
import {UsersService} from "../../shared/services/users.sevice";


@Component({
  selector: 'bga-users-main',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnChanges {

  public users: User[] = [];
  public filteredUsers: User[] = [];
  public authorityTypes = USER_AUTHORITIES;
  private usersListId = 'USER_COMPONENT'


  constructor(private _titleService: Title,
              private _router: Router,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _snackBarService: MdSnackBar,
              private userService: UsersService,
              private eventEmitter: EmitterService,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this.media.broadcast();
    this._titleService.setTitle('BGA');
    this.loadUsers();
    EmitterService.get(this.usersListId).subscribe((user: User[]) => {
      this.loadUsers()
    });
  }

  ngOnChanges(changes: any) {
    EmitterService.get(this.usersListId).subscribe((users: User[]) => {
      this.loadUsers()
    });
  }

  public filterUsers(displayName: string = ''): void {
    this.filteredUsers = this.users.filter((user: User) => {
      return user.username.toLowerCase().indexOf(displayName.toLowerCase()) > -1;
    });
  }

  public filterUserByAuthority(authority: string = ''): void {
    if (authority == '') {
      this.loadUsers();
    }
    else {
      this.loadUserByAuthority(authority);
    }
  }

  public goBack(route: string): void {
    window.history.back();
  }

  public loadUsers(): void {
    this._loadingService.register('users.list');
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this.filteredUsers = users;
        this._loadingService.resolve('users.list');
      }, (error: Error) => {
        this.userService.getUsers().subscribe((users: User[]) => {
          this.users = users;
          this.filteredUsers = users;
          this._loadingService.resolve('users.list');
        });
      });
  }

  public loadUserByAuthority(authority: string): void {
    this._loadingService.register('users.list');
    this.userService.getUsersByAuthority(authority).subscribe(
      (users: User[]) => {
        this.users = users;
        this.filteredUsers = users;
        this._loadingService.resolve('users.list');
      }, (error: Error) => {
        this.userService.getUsersByAuthority(authority).subscribe((users: User[]) => {
          this.users = users;
          this.filteredUsers = users;
          this._loadingService.resolve('users.list');
        });
      });
  }

  public deleteUser(username: string): void {
    this._dialogService
      .openConfirm({message: 'Are you sure you want to delete this user?'})
      .afterClosed().subscribe((confirm: boolean) => {

      if (confirm) {
        this._loadingService.register('users.list');
        this.userService.deleteByUsername(username).subscribe(
          users => {
            EmitterService.get(this.usersListId).emit(users);
            this._loadingService.resolve('users.list');
            this._snackBarService.open('User deleted', 'Ok');
          }, (error: Error) => {
            this._dialogService.openAlert({message: 'There was an error'});
            this._loadingService.resolve('users.list');
          });
      }
    });

  }
}
