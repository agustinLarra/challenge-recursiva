import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CSVReaderComponent } from './components/csv-reader/csv-reader.component';
import { FiltersConteinerComponent } from './components/filters/filters-conteiner.component';
import { SideNavService } from './services/side-nav.service';
import { environment } from 'src/environments/environment';
import { NgxsModule } from '@ngxs/store';
import { FansState } from './ngxs/state/fans.state';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CSVReaderComponent,
    FiltersConteinerComponent,
    
  ],
  imports: [
    NgxsModule.forRoot([FansState], {
      developmentMode: !environment.production
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [SideNavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
