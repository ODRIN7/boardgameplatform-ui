import {NgModule, Type} from "@angular/core";
import {LoginComponent} from "./signIn/login.component";
import {COMMON_ROOT_MODULES} from "./shared/common/common.modules";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {appRoutes, appRoutingProviders} from "./app.routing";
import {CovalentExpansionPanelModule, CovalentCoreModule} from "@covalent/core";
import {CovalentMarkdownModule} from "@covalent/markdown";
import {CovalentHighlightModule} from "@covalent/highlight";
import {CovalentHttpModule} from "@covalent/http";
import {CovalentChartsModule} from "@covalent/charts";
import {BrowserModule, Title} from "@angular/platform-browser";
import {AuthService} from "./shared/services/auth/auth.services";
import {RequestInterceptor} from "./config/interceptors/request.interceptor";
import {BGAMyAppComponent} from "./app.component";
import {MainComponent} from "./main/main.component";
import {SignUpComponent} from "./signUp/signUp.component";
import {StoreService} from "./shared/services/store.service";
import {MessagesService} from "./shared/services/messages.service";
import {NotificationComponent} from "./notifications/notifications.component";
import {ShoppingComponent} from "./store/card/shopping/shopping.component";
import {BoardGameService} from "./shared/services/boardGame.service";
import {EmitterService} from "./shared/services/emitter.service";
import {GameService} from "./shared/services/game.service";
import {UsersService} from "./shared/services/users.sevice";

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

@NgModule({
  declarations: [
    BGAMyAppComponent,
    LoginComponent,
    MainComponent,
    SignUpComponent,
    NotificationComponent,
    ShoppingComponent,
  ],
  imports: [
    BrowserModule,
    CovalentCoreModule.forRoot(),
    CovalentChartsModule.forRoot(),
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentHighlightModule.forRoot(),
    CovalentMarkdownModule.forRoot(),
    CovalentExpansionPanelModule.forRoot(),
    appRoutes,
    NgxChartsModule,
    COMMON_ROOT_MODULES
  ],
  providers: [
    AuthService,
    StoreService,
    appRoutingProviders,
    httpInterceptorProviders,
    MessagesService,
    Title,
    BoardGameService,
    EmitterService,
    GameService,
    UsersService
  ], // additional providers needed for this module
  entryComponents: [],
  bootstrap: [BGAMyAppComponent]
})
export class AppModule {

}
