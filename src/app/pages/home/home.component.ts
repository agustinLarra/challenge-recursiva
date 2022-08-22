import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { SideNavService } from "src/app/services/side-nav.service";
@Component({
    selector:    'app-home',
    templateUrl: './home.component.html',
    providers:  []
  })

export class HomeComponent implements OnInit {

  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

	constructor(private sidenavService: SideNavService) {	}

	ngOnInit(): void {
    console.log(this.sidenav)
		this.sidenavService.setSidenav(this.sidenav);
    console.log(this.sidenav)
  }
	
}