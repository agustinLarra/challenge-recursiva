import { Component, OnInit, ViewChild } from "@angular/core";
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser'

@Component({
    selector:    'app-csv-reader',
    templateUrl: './csv-reader.component.html',
    styleUrls: ['csv-reader.component.css'],

  })

export class CSVReaderComponent implements OnInit {
  csvRecords: any;
  header: boolean = false;

  constructor(private ngxCsvParser: NgxCsvParser) {
  }
  ngOnInit(): void {
  }

  
  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe({
        next: (result): void => {
          console.log('Result', result);
          this.csvRecords = result;
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });
  }
  
  }