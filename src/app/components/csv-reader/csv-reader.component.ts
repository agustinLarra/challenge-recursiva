import { Component, OnInit } from "@angular/core";
@Component({
    selector:    'app-csv-reader',
    templateUrl: './csv-reader.component.html',
    styleUrls: ['csv-reader.component.css'],

  })

export class CSVReaderComponent implements OnInit {
   
    constructor() { }
  
    ngOnInit() {
      console.log('reader is working')
    }
  
    
  }