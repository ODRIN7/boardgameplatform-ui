import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ArenaComponent} from "./arena.component";
import {ArenaStartComponent} from "./menu/starter/arena.start.component";
import {ArenaElementComponent} from "./element/arena-element.component";


export const routes: Routes = [
  {
    path: '', component: ArenaComponent,
    children: [
      {path: '', component: ArenaStartComponent},
      {path: ':id', component: ArenaElementComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ARENA_MODULE {
}
