import { Component, Input, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSidenav } from "@angular/material/sidenav";
import { Store } from "@ngxs/store";
import { AgeDataTable } from "src/app/ngxs/model/agesTable.model";
import { Fan } from "src/app/ngxs/model/fans.model";
import { FansState } from "src/app/ngxs/state/fans.state";
import { FilterService } from "src/app/services/filter.service";

export class TableData {
    name: string;
    age: number;
    club: string;
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
    ageAverage: string
    //table
    displayedColumns: string[] = ['club', 'numberOfFans', 'minAge', 'maxAge', 'ageAverage'];
    dataSource: AgeDataTable[] = [];

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
        this.ageAverage = this.filterService.getAgeAverageByClub(this.fansArray, this.selectedClub)
    }


    setTableData() {
        var clubs: string[] = []
        this.store.select(FansState.getClubNames).subscribe(clubNames => {
            clubs = clubNames
        })
        this.dataSource = this.filterService.getAgesTable(this.fansArray, clubs);
    }

}


