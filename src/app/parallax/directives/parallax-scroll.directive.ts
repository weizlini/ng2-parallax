import { Directive,Input,AfterViewInit,Renderer,ElementRef } from '@angular/core';
import {position,ParallaxScrollConfig} from '../types/interfaces';
@Directive({
  selector: '[ParallaxScroll]'
})
export class ParallaxScrollDirective implements AfterViewInit {
  @Input('ParallaxScroll') config :ParallaxScrollConfig;
  constructor(private el:ElementRef,private renderer:Renderer) { }
  ngAfterViewInit(){
    if(this.el.nativeElement.style.position!='fixed')
      this.renderer.setElementStyle(this.el.nativeElement,'position','absolute');
    this.renderer.setElementStyle(this.el.nativeElement,'top',this.config.origin.top);
    this.renderer.setElementStyle(this.el.nativeElement,'left',this.config.origin.left);
  }
  onScroll(absolutePixelsScrolled:number,ratio:number){
  console.log(absolutePixelsScrolled,ratio);
    if(this.el.nativeElement.style.position=='fixed'){
      this.el.nativeElement.style.top = parseInt(this.config.origin.top)-absolutePixelsScrolled+absolutePixelsScrolled*(1-this.config.scrollMultiplier)+"px";
    }
    else{
      this.el.nativeElement.style.top = this.config.origin.top+absolutePixelsScrolled*(1-this.config.scrollMultiplier)+"px";
    }

    this.el.nativeElement.style.left = this.config.origin.left+this.config.leftMovement*ratio+'px';
  }
}
