import { Component, OnInit } from "@angular/core";
@Component({
    selector:    'app-home',
    templateUrl: './home.component.html',
    providers:  []
  })

export class HomeComponent implements OnInit {
   
    constructor() { }
  
    ngOnInit() {
      console.log('home is working')
    }
  
    
  }