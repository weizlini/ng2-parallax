import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ParallaxPageComponent } from './parallax/parallax-page/parallax-page.component';
import { ParallaxSectionComponent } from './parallax/parallax-section/parallax-section.component';
import { ParallaxFadeDirective } from './parallax/directives/parallax-fade.directive';
import { ParallaxPathDirective } from './parallax/directives/parallax-path.directive';
import { ParallaxScrollDirective } from './parallax/directives/parallax-scroll.directive';



@NgModule({
  declarations: [
    AppComponent,
    ParallaxPageComponent,
    ParallaxSectionComponent,
    ParallaxFadeDirective,
    ParallaxPathDirective,
    ParallaxScrollDirective,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
