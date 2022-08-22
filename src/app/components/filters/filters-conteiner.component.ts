import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { SideNavService } from "src/app/services/side-nav.service";
@Component({
    selector:    'app-filters-conteiner',
    templateUrl: './filters-conteiner.component.html',
    providers:  []
  })

export class FiltersConteinerComponent implements OnInit {
	
  @ViewChild('rightSidenav', {static: true}) sidenav: MatSidenav;
 
   constructor(private sidenavService: SideNavService) {	}
 
   ngOnInit(): void {
     this.sidenavService.setSidenav(this.sidenav);
   }
 }
 
