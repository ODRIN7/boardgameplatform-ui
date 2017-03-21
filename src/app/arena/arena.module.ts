import {NgModule} from "@angular/core";
import {COMMON_CHILD_MODULES} from "../shared/common/common.modules";
import {ARENA_MODULE} from "./arena.routing";
import {ArenaItemComponent} from "./menu/item/arena-item.component";
import {ArenaComponent} from "./arena.component";
import {ArenaStartComponent} from "./menu/starter/arena.start.component";
import {utilInjectables} from "../shared/utils/util";
import {DashboardModule} from "../dashboard/dashboard.module";
import {ArenaElementComponent} from "./element/arena-element.component";
import {GameComponent} from "./element/game/gameBoard/bga-game-element.component";
import {ChatComponent} from "./element/chat/chat.component";
import {ChatWindow} from "./element/chat/window/chat.window";
import {ChatMessage} from "./element/chat/message/chat.message";
import {ArenaGameDescriptionComponent} from "./element/game/description/arena-game-description.component";

@NgModule({
  imports: [
    ...COMMON_CHILD_MODULES,
    ARENA_MODULE,
    DashboardModule
  ],
  declarations: [
    ArenaComponent,
    ArenaItemComponent,
    ArenaStartComponent,
    ArenaElementComponent,
    GameComponent,
    ChatComponent,
    ChatWindow,
    ChatMessage,
    utilInjectables,
    ArenaGameDescriptionComponent
  ]
})
export class ArenaModule {
}
