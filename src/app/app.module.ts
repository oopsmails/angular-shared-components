import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularOopsSharedComponentsModule } from 'angular-oops-shared-components';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HelloComponent } from './components/hello.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HelloComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularOopsSharedComponentsModule,
    SharedModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
