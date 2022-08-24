import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { Store } from "@ngxs/store";
import { SetFans } from "src/app/ngxs/action/fans.action";
import { Fan } from "src/app/ngxs/model/fans.model";
import { SideNavService } from "src/app/services/side-nav.service";
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-csv-reader',
  templateUrl: './csv-reader.component.html',
  styleUrls: ['csv-reader.component.css'],

})

export class CSVReaderComponent implements OnInit {

  fileName: string = ""
  loading = false
  public records: Fan[] = [];

  @ViewChild('csvReader') csvReader: any;

  constructor(
    private sideNavService: SideNavService,
    private store: Store) { }

  ngOnInit(): void { }


  send() {
    /*  if(this.records != []){
       this.sideNavService.toggle();
     }else{
       alert("Primero ingresa un archivo")    
     } */
    this.store.dispatch(new SetFans(this.records)).subscribe(() => {
      this.sideNavService.toggle();
    })


  }


  uploadListener($event: any): void {
    this.loading = true
    let text = [];
    let files = $event.srcElement.files;
    let input = $event.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {
      let csvData = reader.result;
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
      let headersRow = this.getHeaderArray(csvRecordsArray);
      this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
    };
    this.loading = false
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
        //Convierto el dato en una clase
        let fan: Fan = {
          name: this.removeAccents(dataArray[0]),
          age: parseInt(dataArray[1]),
          club: this.removeAccents(dataArray[2]),
          maritalStatus: dataArray[3],
          studys: dataArray[4]
        }

        fansArray.push(fan);
      }
    }
    return fansArray;
  }
  removeAccents(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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