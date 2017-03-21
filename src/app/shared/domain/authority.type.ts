export enum Role {
  ADMIN_ROLE,
  USER_ROLE
}
export class UserAuthority {
  public icon: string;
  public displayName:string;
  public realName:string
  public authorityType: Role;


  constructor(icon: string, authorityType: Role, displayName:string, realName:string) {
    this.icon = icon;
    this.authorityType = authorityType;
    this.displayName = displayName;
  }
}
export const USER_AUTHORITIES: Array<UserAuthority> = ([
  new UserAuthority("account_circle", Role.ADMIN_ROLE, "Admins","ADMIN_ROLE"),
  new UserAuthority("account_circle", Role.USER_ROLE, "Users", "USER_ROLE")
]);

export class Authority {
  public role:Role;

  constructor(role: Role) {
    this.role = role;
  }
}

