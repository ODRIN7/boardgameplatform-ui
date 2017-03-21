import {NgModule} from "@angular/core";
import {StoreDetailComponent} from "./detail/store-detail.component";
import {StoreComponent} from "./store.component";
import {STORE_MODULE} from "./store.routing";
import {COMMON_CHILD_MODULES} from "../shared/common/common.modules";
import {StoreItemComponent} from "./item/store-item.component";
import {StoreStartComponent} from "./starter/StoreStartComponent";
import {CardItemComponent} from "./card/item/card-item.component";


@NgModule({
  imports: [
    ...COMMON_CHILD_MODULES,
    STORE_MODULE
  ],
  declarations: [
    StoreDetailComponent,
    StoreComponent,
    StoreItemComponent,
    StoreStartComponent,
    CardItemComponent
  ]
})
export class StoreModule {
}
