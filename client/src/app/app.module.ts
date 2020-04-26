import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { ApiInterceptor } from './interceptors/app.interceptor';
import { MaterialModule } from './material.module';
import { HttpService } from './services/http.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortfolioInvestComponent } from './components/portfolio-invest/portfolio-invest.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioInvestComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    NgxChartsModule
  ],
  providers: [
    DatePipe, 
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
