import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from './services/side-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
	
//	@ViewChild('rightSidenav') public sidenav: MatSidenav;

	constructor(private sidenavService: SideNavService) {	}

	ngOnInit(): void {
		//this.sidenavService.setSidenav(this.sidenav);
	}
}