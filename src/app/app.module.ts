import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ParallaxPageComponent } from './parallax/parallax-page/parallax-page.component';
import { ParallaxSectionComponent } from './parallax/parallax-section/parallax-section.component';
import { ParallaxScrollDirective } from './parallax/directives/parallax-scroll.directive';
import { ParallaxAnimateDirective } from './parallax/directives/parallax-animate.directive';
import {ParallaxConfig,ParallaxScrollConfig,ParallaxAnimateConfig,ParallaxAnimation,PllxAnimationEasing} from './parallax/types/interfaces'


@NgModule({
  declarations: [
    AppComponent,
    ParallaxPageComponent,
    ParallaxSectionComponent,
    ParallaxScrollDirective,
    ParallaxAnimateDirective
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
