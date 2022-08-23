import { Component, Input, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSidenav } from "@angular/material/sidenav";
import { Store } from "@ngxs/store";
import { Fan } from "src/app/ngxs/model/fans.model";
import { NameCount } from "src/app/ngxs/model/nameCount.model";
import { FansState } from "src/app/ngxs/state/fans.state";
import { FilterService } from "src/app/services/filter.service";

export class TableData  {
    name : string ;
    age : number;
    club : string;
}

@Component({
    selector: 'app-filter-age',
    templateUrl: './filter-age.component.html',
    styleUrls: ['filter-age.component.css'],
})

export class FilterAgeComponent implements OnInit {

    //data
    @Input() selectedClub: string;
    fansArray: Fan[] = []
    fansFiltereds: Fan[] = []
    ageAverage : number
    //table
    displayedColumns: string[] = ['name', 'age', 'club'];
    dataSource: TableData[] = [];
    isLoading :boolean = true

    constructor(
        private store: Store,
        private filterService: FilterService
    ) { }

    ngOnInit(): void {
        this.getAllFans()
        this.getAgeAverageByClub()
        this.setTableData()
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        this.ngOnInit()
      }

    getAllFans() {
        this.store.select(FansState.getAllFans).subscribe(data => {
            this.fansArray = data
        });
    }

    getAgeAverageByClub() {
      //  this.fansFiltereds = this.filterService.filterByMaritalStatusAndStudysSortedByAge(this.fansArray,'Casado','Universitario')
        this.ageAverage = this.filterService.getAgeAverageByClub(this.fansArray,this.selectedClub)  
    }

    setTableData() {
         var tableData :TableData[] = [ ];
         for (let index = 0; index < this.fansFiltereds.length && index < 100; index++) {
            const element = this.fansFiltereds[index];
            const data : TableData =  {
                name :  element.name,
                age : element.age,
                club : element.club
            }
            tableData.push(data)
         }

        this.dataSource = tableData;
        this.isLoading = false 
    }

}


