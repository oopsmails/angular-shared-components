import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BackAngleComponent } from './components/back-angle/back.angle.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ElementChangingDirective } from './directives/element-changing.directive';
import { MouseoverColorDirective } from './directives/mouseover-color.directive';
import { HighlightHtmlPipe } from './pipes/highlight.html.pipe';
import { HighlighterPipe } from './pipes/highlighter.pipe';
import { CarDataService } from './services/car.service';
import { CardDataService } from './services/card.service';
import { GithubService } from './services/github.service';
import { SharedDataService } from './services/shared.data.service';
import { StateService } from './services/state.service';
import { UtilsService } from './services/utils.service';
import { WikipediaService } from './services/wikipedia.service';

@NgModule({
  declarations: [
    HighlighterPipe,
    HighlightHtmlPipe,
    NotFoundComponent,
    FooterComponent,
    NavBarComponent,
    BackAngleComponent,
    ElementChangingDirective,
    MouseoverColorDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    HighlighterPipe,
    HighlightHtmlPipe,
    NotFoundComponent,
    NavBarComponent,
    FooterComponent,
    BackAngleComponent,
    ElementChangingDirective,
    MouseoverColorDirective,
  ],
  providers: [
    CarDataService,
    CardDataService,
    GithubService,
    SharedDataService,
    StateService,
    UtilsService,
    WikipediaService,
  ],
})
export class SharedModule {}
