import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DragComponent } from './components/drag/drag.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  declarations: [AppComponent, HelloComponent, DragComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
