import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DataBaseService} from './services/data-base/data-base.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroClienteComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [DataBaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
