import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "./shared/services/auth/auth.services";
import {DomSanitizer} from "@angular/platform-browser";
import {MdIconRegistry} from "@angular/material";
import {StoreService} from "./shared/services/store.service";

@Component({
  selector: 'bga-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class BGAMyAppComponent implements OnInit {

  constructor(private _iconRegistry: MdIconRegistry,
              private _domSanitizer: DomSanitizer,
              public authService: AuthService,
              public router: Router,
              public  storeService: StoreService) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/teradata.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/covalent.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/covalent-mark.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
      this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/teradata-ux.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/appcenter.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
      this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/listener.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
      this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/querygrid.svg'));
  }

  ngOnInit(): any {
    console.log('app on init');
  }

}
