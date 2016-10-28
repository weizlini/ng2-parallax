import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'parallax-section',
  templateUrl: './parallax-section.component.html',
  styleUrls: ['./parallax-section.component.scss']
})
export class ParallaxSectionComponent implements OnInit {
  @Input() sectionHeight:any;
  public height:any = 'auto';
  public isInitialized:boolean = false;

  constructor() { }

  ngOnInit() {
    if(this.sectionHeight)
    {
      this.height = this.sectionHeight;
    }
  }

  public activate(){
    if(!this.isInitialized)
      return;
  }

  public onScroll(){

  }
}
