import {NgModule} from "@angular/core";
import {COMMON_CHILD_MODULES} from "../shared/common/common.modules";
import {BOARDGAME_MODULE} from "./boardgames-routing.module";
import {BoardGameManagerComponent} from "./main/boardgames.component";
import {BoardGameFormComponent} from "./+form/boardgame.form.component";

@NgModule({
  imports: [
    COMMON_CHILD_MODULES,
    BOARDGAME_MODULE
  ],
  declarations: [
    BoardGameManagerComponent,
    BoardGameFormComponent
  ]
})
export class BoardGameModule {
}
