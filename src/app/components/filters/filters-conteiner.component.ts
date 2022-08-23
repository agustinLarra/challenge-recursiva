import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSidenav } from "@angular/material/sidenav";
import { Store } from "@ngxs/store";
import { GetPopularNamesByClub } from "src/app/ngxs/action/fans.action";
import { FansState } from "src/app/ngxs/state/fans.state";
import { SideNavService } from "src/app/services/side-nav.service";
interface Animal {
  name: string;
  sound: string;
}
@Component({
  selector: 'app-filters-conteiner',
  templateUrl: './filters-conteiner.component.html',
  styleUrls: ['filters-conteiner.component.css'],
})

export class FiltersConteinerComponent implements OnInit {

  @ViewChild('rightSidenav', { static: true }) sidenav: MatSidenav;
  numberOfFans = 0;
  selectedValue: string;
  
  animalControl = new FormControl(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  clubs = [{value: 'Boca'},{value: 'River'},{value: 'Racing'},{value: 'San Lorenzo'},{value: 'Independiente'},{value: 'Velez'},{value: 'Estudiantes'},{value: 'Gimanasia LP'},{value: 'Huracan'},{value: 'Rosario Central'},{value: 'Newells'},]


  selectedClub = this.clubs[0].value
  
  constructor(private sidenavService: SideNavService,
    private store: Store) { }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.countFans()
  }

  countFans() {
    this.store.select(FansState.countFans).subscribe(data => {
      this.numberOfFans = data
    });
  }

  filterByName(){
    this.store.dispatch(new GetPopularNamesByClub(this.selectedClub)).subscribe(data => {
    
    });
  } 

}


