import { Component, Input } from '@angular/core';
import {Boardgame} from "../../shared/domain/boardgame";


@Component({
  selector: 'bga-store-item',
  templateUrl: 'store-item.component.html'
})
export class StoreItemComponent {
  @Input() boardGame: Boardgame;
  @Input() boardGameId: number;
}
