import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSidenav } from "@angular/material/sidenav";
import { Store } from "@ngxs/store";
import { Fan } from "src/app/ngxs/model/fans.model";
import { FansState } from "src/app/ngxs/state/fans.state";
import { FilterService } from "src/app/services/filter.service";
import { SideNavService } from "src/app/services/side-nav.service";

@Component({
  selector: 'app-filters-conteiner',
  templateUrl: './filters-conteiner.component.html',
  styleUrls: ['filters-conteiner.component.css'],
})

export class FiltersConteinerComponent implements OnInit {

  @ViewChild('rightSidenav', { static: true }) sidenav: MatSidenav;

  fansArray: Fan[] = []
  numberOfFans = 0;


  clubs : {value : string} [] = []
  selectedClub = ''
  filterNameComponent = false
  filterAgeComponent = false
  filterByMaritalStatusAndStudys = false


  constructor(
    private sidenavService: SideNavService,
    private store: Store,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    console.log('en ngOnInit')

    this.sidenavService.setSidenav(this.sidenav);
    this.getClubs()
    this.getAllFans()
    
    
    console.log('en countFans')

    this.countFans()
  }

  getAllFans() {
    this.store.select(FansState.getAllFans).subscribe(data => {
      this.fansArray = data
      this.numberOfFans = data.length

    });
  }
  
  countFans() {
    console.log('en countFans')

    this.store.select(FansState.countFans).subscribe(data => {
      console.log(' countFans',data)

      this.numberOfFans = data
    });
  }
  getClubs() {
    
    this.store.select(FansState.getClubNames).subscribe(clubNames => {
      for (let index = 0; index < clubNames.length; index++) {
        const element = clubNames[index];
        var data = {value: element}
        this.clubs.push(data)
        this.selectedClub = this.clubs[0].value
      }
    })
  }
  filterByNameButton() {
    this.filterNameComponent = true
    this.filterAgeComponent = false
    this.filterByMaritalStatusAndStudys = false
  }

  filterByMaritalStatusAndStudysButton() {
    this.filterNameComponent = false
    this.filterAgeComponent = false
    this.filterByMaritalStatusAndStudys = true
  }

  filterByAgeButton() {
    this.filterNameComponent = false
    this.filterAgeComponent = true
    this.filterByMaritalStatusAndStudys = false
  }
}


