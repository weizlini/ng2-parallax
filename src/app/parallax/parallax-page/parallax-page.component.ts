import {Component, OnInit, Input, Output, ContentChildren, QueryList, AfterViewInit} from '@angular/core';
import {ParallaxSectionComponent} from '../parallax-section/parallax-section.component';
import {ParallaxConfig} from '../types/parallax-config-interface';


/**
 * ParallaxPageComponent
 *
 * this is the root element of a parallax enabled site, this component will monitor the scrolling
 * of the window, and show any sections that scroll into view. a <parallax-section> that is active during the scrolling
 * will receive the onScroll Event and manage its internal content. others will be hidden (visibility)
 *
 */
@Component({
    selector: 'parallax-page',
    templateUrl: './parallax-page.component.html',
    styleUrls: ['./parallax-page.component.scss']
})
export class ParallaxPageComponent implements OnInit,AfterViewInit {
    @Input() config: ParallaxConfig;
    @ContentChildren(ParallaxSectionComponent) ParallaxSections: QueryList<ParallaxSectionComponent>;

    private _winScroll: number = 0;
    private _viewportBottomY: number = 0;

    private _currentSection: ParallaxSectionComponent;
    private _nextSection: ParallaxSectionComponent;
    private _currentSectionIndex :number;
    private _nextSectionIndex:number;
    constructor() {

    }

    ngOnInit() {
        window.addEventListener('scroll', (e)=> {
            this.onScroll()
        });


    }

    ngAfterViewInit() {
        this.ParallaxSections.forEach((section)=> {
            setTimeout(()=> {
                this.setSectionHeight(section)
            }, 0)
        })
        setTimeout(()=>{this.onScroll()},0);
    }

    /**
     * this is the main handler of the parallax scrolling.
     * It shows and hides sections and sets their opacity
     */
    onScroll() {
        var offsets = this.ParallaxSections.map((section)=> {
            return section.element.nativeElement.offsetTop
        });
        var bottoms = this.ParallaxSections.map((section)=> {
            return section.element.nativeElement.offsetTop + section.element.nativeElement.offsetHeight
        });
        console.log(offsets,bottoms)
        var doc = document.documentElement;
        var scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this._winScroll = scrollTop;
        this._viewportBottomY = scrollTop + viewportHeight;
        var current, next: any = null;
        var currentIndex,nextIndex:number = -1;
        this.ParallaxSections.forEach((section, i)=> {

            // check to see if it is the current section
            // currently we definte a section to be the current section once the top of the section
            // has reached the top of the screen
            if (scrollTop >= offsets[i] && scrollTop < bottoms[i]) {
                current = section;
                currentIndex = i;
            }

            //we check to see if the next section is visible (and not yet at the top)
            else if (scrollTop < offsets[i] && this._viewportBottomY > offsets[i]) {
                next = section;
                nextIndex = i;
            }
        });

        // we check to see if the old current and next are still visible
        // if they are not, then we hide the visibility to instantly hide
        // any absolutely or fixed positioned html children of the section that would
        // still be visible

        if (this._currentSection && this._currentSection != current && this._currentSection != next) {
            this._currentSection.hide();
        }
        if (this._nextSection && this._nextSection != current && this._nextSection != next) {
            this._nextSection.hide();
        }

        // now at this point anything that needs to have been hidden
        // has been done so, we can concentrate on the local current and next
        // we first will check to see if in the config we have a the options
        // for fading in or fading out and will do those
        // since the current is the current section, it can only be fading out
        // likewise the next section must be fading in.
        // the fade in and the fade out happen during the span on one viewport height unit.

        if (next &&this.config.sectionFadeIn) {
            var visibleHeight = this._viewportBottomY - next.element.nativeElement.offsetTop;
            var ratio = visibleHeight / viewportHeight;
            if (ratio > 1)
                ratio = 1;
            next.element.nativeElement.style.opacity = ratio;
        }

        if (current && this.config.sectionFadeOut) {
            var visibleHeight = current.element.nativeElement.offsetTop + current.element.nativeElement.offsetHeight - scrollTop;
            var ratio = visibleHeight / viewportHeight;
            if (ratio > 1)
                ratio = 1;
            current.element.nativeElement.style.opacity = ratio;
        }


        // we check to see if the current or next are already visible
        // if either has not previously been visible we show them
        // this would instantly show any fixed position html elemtns
        // although the elements could also be affected by various directives
        // such as [parallaxFade] or some other directive
        // the section itself if it has been faded will already have
        // an opacity set, so we don't have to worry about a flicker effect

        if (current && current != this._currentSection && current != this._nextSection) {
            current.show();
        }
        if (next && next != this._currentSection && next != this._nextSection) {
            next.show();
        }

        //finally we set the class vars to our local current and next values;
        this._currentSection = current;
        this._currentSectionIndex = currentIndex;
        this._nextSection = next;
        this._nextSectionIndex = nextIndex;
        this.activeSectionsScroll()


    }

    /**
     *  for each scroll event pass the values to
     */
    activeSectionsScroll(){
        if(this._currentSection)
            this._currentSection.onScroll(this._winScroll,this._viewportBottomY);
        if(this._nextSection)
            this._nextSection.onScroll(this._winScroll,this._viewportBottomY);
    }
    /**
     *
     * Once the ParallaxPageComponent view and it's children's views have been initialized
     * the parallax page will set the default height for each section unless that section
     * has a custom height that is defined
     *
     * @param section
     */
    private setSectionHeight(section: ParallaxSectionComponent): void {
        if (!section.sectionHeight) {
            section.height = this.config.sectionHeight;
        }
    }

}
