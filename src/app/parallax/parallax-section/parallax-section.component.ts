import {
    Component, OnInit, Input, ViewChild, ElementRef, ContentChildren, QueryList,
    AfterContentInit
} from '@angular/core';
import {ParallaxScrollDirective} from '../directives/parallax-scroll.directive';
import {ParallaxAnimateDirective} from "../directives/parallax-animate.directive";
@Component({
    selector: 'parallax-section',
    templateUrl: './parallax-section.component.html',
    styleUrls: ['./parallax-section.component.scss'],
})
export class ParallaxSectionComponent implements OnInit,AfterContentInit {
    @Input() sectionHeight: any;
    @ViewChild('element') element: ElementRef;
    @ContentChildren(ParallaxScrollDirective) scrollDirectives: QueryList<ParallaxScrollDirective>;
    @ContentChildren(ParallaxAnimateDirective) animateDirectives: QueryList<ParallaxAnimateDirective>;
    public height: any = 'auto';
    public isInitialized: boolean = false;

    constructor() {
    }

    ngOnInit() {
        if (this.sectionHeight) {
            this.height = this.sectionHeight;
        }
        this.isInitialized = true;
    }

    ngAfterContentInit() {
        console.log(this.scrollDirectives)
        console.log(this.animateDirectives)
    }

    public show() {
        if (!this.isInitialized)
            return;
        this.element.nativeElement.style.visibility = 'visible';
    }

    public hide() {
        if (!this.isInitialized)
            return;
        this.element.nativeElement.style.visibility = 'hidden';
    }

    public onScroll(viewPortTop: number, viewPortBottom: number) {
        var delta = viewPortBottom - this.element.nativeElement.offsetTop;
        var ratio = delta/this.element.nativeElement.offsetHeight;

        this.scrollDirectives.forEach((scrollDir)=> {
            scrollDir.onScroll(delta,ratio);
        })
        this.animateDirectives.forEach((animateDir)=>{
            animateDir.onScroll(delta,ratio);
        })

    }
}
