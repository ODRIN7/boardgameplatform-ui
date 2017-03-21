import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core/src/metadata/ng_module';
import {UsersComponent} from "./main/users.component";
import {UsersFormComponent} from "./+form/form.component";


export const routes: Routes = [
  {path: '', pathMatch: 'full', component: UsersComponent},
  {path: 'add', component: UsersFormComponent},
  {path: ':id/delete', component: UsersFormComponent},
  {path: ':id/edit', component: UsersFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class USER_MODULE {
}



