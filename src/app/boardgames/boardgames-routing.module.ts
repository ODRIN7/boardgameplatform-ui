import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core/src/metadata/ng_module';
import {BoardGameFormComponent} from "./+form/boardgame.form.component";
import {BoardGameManagerComponent} from "./main/boardgames.component";


export const routes: Routes = [
  {path: '', pathMatch: 'full', component: BoardGameManagerComponent},
  {path: 'add', component: BoardGameFormComponent},
  {path: ':id/delete', component: BoardGameManagerComponent},
  {path: ':id/edit', component: BoardGameFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BOARDGAME_MODULE
{
}



