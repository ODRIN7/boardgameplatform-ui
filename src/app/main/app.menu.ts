import {Role} from "../shared/domain/authority.type";
export const MAIN_MENU: AppMenuItem[] = [

  {
    title: 'Feeds',
    icon: 'dashboard',
    link: '',
  },
  {
    title: 'Store',
    icon: 'receipt',
    link: '/store',
  },
  {
    title: 'Arena',
    icon: 'view_quilt',
    link: '/arena',
  },  {
    title: 'Shoppinglist',
    icon: 'view_quilt',
    link: '/shopping',
  },
  {
    title: 'Manage Users',
    icon: 'people',
    link: '/users',
    roles: [Role.ADMIN_ROLE],
  },
  {
    title: 'Manage BoardGames',
    icon: 'people',
    link: '/boardgames',
    roles: [Role.ADMIN_ROLE],
  },
  {
    title: 'Notifications',
    icon: 'people',
    link: '/notifications',
    roles: [Role.ADMIN_ROLE],
  }
];

export interface AppMenuItem {
  title: string;
  icon: string;
  link: string;
  roles?: Role[];
}
