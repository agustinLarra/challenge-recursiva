import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { SideNavService } from "src/app/services/side-nav.service";
import * as XLSX from 'xlsx'

@Component({
    selector:    'app-csv-reader',
    templateUrl: './csv-reader.component.html',
    styleUrls: ['csv-reader.component.css'],

  })

export class CSVReaderComponent implements OnInit {

  showFiller = false;

  ExcelData : any = null
  fileName : string = ""
  fileAdded = true

  @Output()
  eventoHijo = new EventEmitter<string>();

  
  constructor( private sideNavService : SideNavService) {}

  ngOnInit(): void {  }

  
  readDocument(event: any): void {
    console.log('event',event)
    console.log('event.target.file[0]',event.target.files[0])

    var file = event.target.files[0]
    this.fileName = file.name
    var fileReader = new FileReader()
    fileReader.readAsBinaryString(file)
    fileReader.onloadend = (e) => {
      var workBook = XLSX.read(fileReader.result,{type:'binary'});
      var sheetName = workBook.SheetNames
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName[0]])
      console.log('this.ExcelData',this.ExcelData)
    }
  }
  
  send(){
    if(this.ExcelData != null){
      this.sideNavService.toggle();
    }else{
      alert("Primero ingresa un archivo")    
    }
  }
  }