import {NgModule} from "@angular/core";
import {UsersComponent} from "./main/users.component";
import {USER_MODULE} from "./users-routing.module";
import {UsersFormComponent} from "./+form/form.component";
import {COMMON_CHILD_MODULES} from "../shared/common/common.modules";

@NgModule({
  imports: [
    COMMON_CHILD_MODULES,
    USER_MODULE
  ],
  declarations: [
    UsersComponent,
    UsersFormComponent
  ]
})
export class UserModule {
}
