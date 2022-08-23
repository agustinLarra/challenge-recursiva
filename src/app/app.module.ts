//commons
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { environment } from 'src/environments/environment';
import { NgxsModule } from '@ngxs/store';
import { FansState } from './ngxs/state/fans.state';
//components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CSVReaderComponent } from './components/csv-reader/csv-reader.component';
import { FiltersConteinerComponent } from './components/filters/filters-conteiner.component';
import { FilterNameComponent } from './components/filters/names/filter-name.component';
//services
import { SideNavService } from './services/side-nav.service';
import { FilterService } from './services/filter.service';
import { FilterMaritialStudyComponent } from './components/filters/marital-study/filter-marital-study.component';
import { FilterAgeComponent } from './components/filters/age/filter-age.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CSVReaderComponent,
    FiltersConteinerComponent,
    FilterNameComponent,
    FilterMaritialStudyComponent,
    FilterAgeComponent
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
  providers: [SideNavService,FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
