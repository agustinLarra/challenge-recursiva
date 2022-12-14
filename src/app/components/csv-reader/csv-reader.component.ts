import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { Store } from "@ngxs/store";
import { SetClubNames, SetFans } from "src/app/ngxs/action/fans.action";
import { Fan } from "src/app/ngxs/model/fans.model";
import { FansState } from "src/app/ngxs/state/fans.state";
import { SideNavService } from "src/app/services/side-nav.service";
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-csv-reader',
  templateUrl: './csv-reader.component.html',
  styleUrls: ['csv-reader.component.css'],

})

export class CSVReaderComponent implements OnInit {

  fileName: string = ""
  public records: Fan[] = [];
  isFileAttached = false
  @ViewChild('csvReader') csvReader: any;
  @Output() outputEmiter = new EventEmitter<string>();

  constructor(
    private sideNavService: SideNavService,
    private store: Store) { }

  ngOnInit(): void { }


  send() {
    if (this.isFileAttached) {
      this.store.dispatch(new SetFans(this.records)).subscribe(() => {
        this.store.dispatch(new SetClubNames(this.records)).subscribe(() => {
          //this.outputEmiter.emit("true");
          this.sideNavService.toggle();
        })
      })
    } else {
      alert("Primero ingresa un archivo")
    }
  }


  uploadListener($event: any): void {
    let files = $event.srcElement.files;
    this.fileName = files[0].name
    let input = $event.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0], 'ISO-8859-1');
    reader.onload = () => {
      let csvData = reader.result;
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
      let headersRow = this.getHeaderArray(csvRecordsArray);
      this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      this.isFileAttached = true
    };
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let fansArray: Fan[] = [];

    for (let i = 0; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let dataArray = []
        //Separo el string por las comas
        for (let index = 1; index <= 5; index++) {
          let inicio = 0
          let fin = curruntRecord[0].indexOf(";");
          if (fin == -1) { fin = curruntRecord[0].length }
          let extraida = curruntRecord[0].substring(inicio, fin);
          curruntRecord[0] = curruntRecord[0].slice(fin + 1, curruntRecord[0].length)
          dataArray.push(extraida)
        }

        let fan: Fan = {
          name: dataArray[0],
          age: parseInt(dataArray[1]),
          club: dataArray[2],
          maritalStatus: dataArray[3],
          studys: dataArray[4]
        }

        fansArray.push(fan);
      }
    }
    return fansArray;
  }


  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }






}