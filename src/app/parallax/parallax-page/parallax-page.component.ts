import { Component, OnInit,Input,Output,ContentChildren,QueryList,AfterViewInit} from '@angular/core';
import {ParallaxSectionComponent} from '../parallax-section/parallax-section.component';
import {ParallaxConfig} from '../types/parallax-config-interface';


/**
 * ParallaxPageComponent
 *
 * this is the root element of a parallax enabled site, this component will monitor the scrolling
 * of the window, and activate any sections that scroll into view. a <parallax-section> that is active during the scrolling
 * will receive the onScroll Event and manage its internal content. others will be hidden (visibility)
 *
 */
@Component({
  selector: 'parallax-page',
  templateUrl: './parallax-page.component.html',
  styleUrls: ['./parallax-page.component.scss']
})
export class ParallaxPageComponent implements OnInit,AfterViewInit {
  @Input() config : ParallaxConfig;
  @ContentChildren(ParallaxSectionComponent) ParallaxSections : QueryList<ParallaxSectionComponent>;

  private _winScroll:number = 0;
  private _activeSection:ParallaxSectionComponent = null;
  private _activeSectionIndex:number = 0;

  constructor() {

  }
  ngOnInit() {
    window.addEventListener('scroll',(e)=>{this.onScroll(e)})
  }

  ngAfterViewInit(){
    this.ParallaxSections.forEach((section)=>{setTimeout(()=>{this.setSectionHeight(section)},0)})
  }

  onScroll(e){
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    this._winScroll = top;
  }

  /**
   *
   * Once the ParallaxPageComponent view and it's children's views have been initialized
   * the parallax page will set the default height for each section unless that section
   * has a custom height that is defined
   *
   * @param section
   */
  private setSectionHeight(section:ParallaxSectionComponent):void{
      if(!section.sectionHeight)
      {
        section.height = this.config.sectionHeight;
      }
  }

}
