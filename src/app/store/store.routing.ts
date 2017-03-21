import {Routes, RouterModule} from "@angular/router";
import {StoreComponent} from "./store.component";
import {StoreDetailComponent} from "./detail/store-detail.component";
import {NgModule} from "@angular/core";
import {StoreStartComponent} from "./starter/StoreStartComponent";


export const routes: Routes = [
  {
    path: '', component: StoreComponent,
    children: [
      {path: '', component: StoreStartComponent},
    ]
  },
  {path: ':id', component: StoreDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class STORE_MODULE {
}
