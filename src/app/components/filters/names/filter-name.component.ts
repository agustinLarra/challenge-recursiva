import { Component, Input, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSidenav } from "@angular/material/sidenav";
import { Store } from "@ngxs/store";
import { Fan } from "src/app/ngxs/model/fans.model";
import { NameCount } from "src/app/ngxs/model/nameCount.model";
import { FansState } from "src/app/ngxs/state/fans.state";
import { FilterService } from "src/app/services/filter.service";

export class TableData  {
    number : number;
    name : string ;
}

@Component({
    selector: 'app-filter-name',
    templateUrl: './filter-name.component.html',
    styleUrls: ['filter-name.component.css'],
})

export class FilterNameComponent implements OnInit {

    //data
    @Input() selectedClub: string;
    fansArray: Fan[] = []
    fansByName: NameCount[] = []
    //table
    displayedColumns: string[] = ['number', 'name'];
    dataSource: TableData[] = [];
    isLoading :boolean = true
    constructor(
        private store: Store,
        private filterService: FilterService
    ) { }

    ngOnInit(): void {
        this.getAllFans()
        this.filterByName()
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

    filterByName() {
        this.fansByName = this.filterService.getPopularNamesByClub(this.fansArray, this.selectedClub)
    }

    setTableData() {
        var tableData :TableData[] = [
            { number: this.fansByName[0].count, name: this.fansByName[0].fan.name},
            { number: this.fansByName[1].count, name: this.fansByName[1].fan.name},
            { number: this.fansByName[2].count, name: this.fansByName[2].fan.name},
            { number: this.fansByName[3].count, name: this.fansByName[3].fan.name},
            { number: this.fansByName[4].count, name: this.fansByName[4].fan.name},
        ];

        this.dataSource = tableData;
        this.isLoading = false
    }

}


