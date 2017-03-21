import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./signIn/login.component";
import {SignUpComponent} from "./signUp/signUp.component";
import {MainComponent} from "./main/main.component";
import {NotificationComponent} from "./notifications/notifications.component";
import {ShoppingComponent} from "./store/card/shopping/shopping.component";

const routes: Routes = [
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'store',
        loadChildren: './store/store.module#StoreModule'
      },
      {
        path: 'arena',
        loadChildren: './arena/arena.module#ArenaModule'
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UserModule'
      },
      {
        path: 'notifications',
        component: NotificationComponent,
      },
      {
        path: 'boardgames',
        loadChildren: './boardgames/boardgames.module#BoardGameModule'
      }, {
        path: 'shopping',
        component: ShoppingComponent
      },
    ]
  }

];
export const appRoutingProviders: any[] = [];

export const appRoutes: any = RouterModule.forRoot(routes, {useHash: true});
