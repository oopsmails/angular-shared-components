import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HighlighterPipe } from './pipes/highlighter.pipe';
import { GithubService } from './services/github.service';
import { SharedDataService } from './services/shared.data.service';
import { StateService } from './services/state.service';
import { UtilsService } from './services/utils.service';
import { WikipediaService } from './services/wikipedia.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BackAngleComponent } from './components/back-angle/back.angle.component';
import { ElementChangingDirective } from './directives/element-changing.directive';
import { MouseoverColorDirective } from './directives/mouseover-color.directive';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    HighlighterPipe,
    NotFoundComponent,
    FooterComponent,
    NavBarComponent,
    BackAngleComponent,
    ElementChangingDirective,
    MouseoverColorDirective,
  ],
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    HighlighterPipe,
    NotFoundComponent,
    NavBarComponent,
    FooterComponent,
    BackAngleComponent,
    ElementChangingDirective,
    MouseoverColorDirective,
  ],
  providers: [UtilsService, SharedDataService, WikipediaService, GithubService, StateService],
})
export class SharedModule {}
