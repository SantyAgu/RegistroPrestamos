import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DataBaseService} from './services/data-base/data-base.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { RouterModule, Routes } from '@angular/router';
import {AprobacionClienteComponent} from './aprobacion-cliente/aprobacion-cliente.component';
import { CookieModule } from 'ngx-cookie';


const appRoutes: Routes = [
  { path: 'Inicio', component: RegistroClienteComponent },
  { path: 'Aprobacion',  component: AprobacionClienteComponent },  
  { path: '',
    redirectTo: '/Inicio',
    pathMatch: 'full'
  },
  { path: '**', component: RegistroClienteComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegistroClienteComponent,
    AprobacionClienteComponent
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    CookieModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [DataBaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
