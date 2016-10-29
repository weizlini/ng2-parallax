import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'parallax-section',
  templateUrl: './parallax-section.component.html',
  styleUrls: ['./parallax-section.component.scss']
})
export class ParallaxSectionComponent implements OnInit {
  @Input() sectionHeight:any;
  @ViewChild('element') element:ElementRef;
  public height:any = 'auto';
  public isInitialized:boolean = false;

  constructor() { }

  ngOnInit() {
    if(this.sectionHeight)
    {
      this.height = this.sectionHeight;
    }
    this.isInitialized = true;
  }


  public show(){
    if(!this.isInitialized)
      return;
    this.element.nativeElement.style.visibility='visible';
  }
  public hide(){
    if(!this.isInitialized)
      return;
    this.element.nativeElement.style.visibility='hidden';
  }

  public onScroll(viewPortTop:number,viewPortBottom:number){

  }
}
