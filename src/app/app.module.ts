import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fas, faThermometerEmpty, faThermometerFull, faTemperatureLow, faWind, faTint } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos específicos

import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Añade los iconos específicos que necesitas
    library.addIcons(faThermometerEmpty, faThermometerFull, faTemperatureLow, faWind, faTint);
  }
}
