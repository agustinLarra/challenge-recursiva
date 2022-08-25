import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { SideNavService } from "src/app/services/side-nav.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: []
})

export class HomeComponent implements OnInit {
  @ViewChild('rightSidenav', { static: true }) sidenav: MatSidenav;

  filtersReady = false
  constructor(private sidenavService: SideNavService,) { }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);

  }

  ouputEmiter($event: any) {
    if ($event) {
      this.filtersReady = true
    }
  }
}