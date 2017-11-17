import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DataBaseService} from './data-base.service';

import { AppComponent } from './app.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroClienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
