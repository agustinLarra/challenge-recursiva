import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FiltersConteinerComponent } from '../components/filters/filters-conteiner.component';

@Injectable()
export class SideNavService {
	private sidenav: MatSidenav;

	public setSidenav(sidenav: MatSidenav) {
        console.log('que llega',sidenav)
		this.sidenav = sidenav;
        console.log('despues',this.sidenav)

    }

	public open() {
		return this.sidenav.open();
	}

	public close() {
		return this.sidenav.close();
	}

	public toggle(): void {
        console.log('que pasa',this.sidenav)
		this.sidenav.toggle();
	}
}