import { Component } from '@angular/core';
import { directiveDef } from '@angular/core/src/view/provider';
import {DataBaseService} from './services/data-base/data-base.service';
import { HttpClientModule } from '@angular/common/http';
import {OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})


export class AppComponent implements OnInit {
  constructor(private userService: DataBaseService) {}
  profile = {};
ngOnInit() {
  }
}
 