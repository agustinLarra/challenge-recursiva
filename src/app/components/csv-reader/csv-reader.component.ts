import { Component, OnInit, ViewChild } from "@angular/core";
import * as XLSX from 'xlsx'
@Component({
    selector:    'app-csv-reader',
    templateUrl: './csv-reader.component.html',
    styleUrls: ['csv-reader.component.css'],

  })

export class CSVReaderComponent implements OnInit {
  ExcelData : any
  constructor() {
  }
  ngOnInit(): void {
  }

  
  readDocument(event: any): void {
    console.log('event',event)
    console.log('event.target.file[0]',event.target.files[0])

    var file = event.target.files[0]
    var fileReader = new FileReader()
    fileReader.readAsBinaryString(file)
    fileReader.onloadend = (e) => {
      var workBook = XLSX.read(fileReader.result,{type:'binary'});
      var sheetName = workBook.SheetNames
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName[0]])
      console.log('this.ExcelData',this.ExcelData)
    }
  }
  
  }