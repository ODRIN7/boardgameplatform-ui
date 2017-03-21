import {Component, OnInit} from "@angular/core";
import {User} from "../../shared/domain/user";
import {EmitterService} from "../../shared/services/emitter.service";
import {TdMediaService, TdDialogService, TdLoadingService} from "@covalent/core";
import {MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {UsersService} from "../../shared/services/users.sevice";

@Component({
  selector: 'bga-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit{
  public users: User[] = [];
  private usersListId = 'USER_COMPONENT'


  constructor(private _titleService: Title,
              private _router: Router,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _snackBarService: MdSnackBar,
              private userService: UsersService,
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

  public loadUsers(): void {
    this._loadingService.register('users.list');
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this._loadingService.resolve('users.list');
      }, (error: Error) => {
        this.userService.getUsers().subscribe((users: User[]) => {
          this.users = users;
          this._loadingService.resolve('users.list');
        });
      });
  }
}

