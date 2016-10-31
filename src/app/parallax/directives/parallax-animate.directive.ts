import {Directive, Input, ElementRef, Renderer, OnInit} from '@angular/core';
import {
    ParallaxAnimation, PllxAnimationEasing,
    ParallaxAnimateConfig
} from '../types/interfaces';
import {tools} from '../types/tools';

@Directive({
    selector: '[ParallaxAnimate]'
})
export class ParallaxAnimateDirective implements OnInit {
    @Input('ParallaxAnimate') config: ParallaxAnimateConfig;

    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    onScroll(absolutePixels:number, ratio:number) {
        this.config.animations.forEach((animation)=> {
            switch (animation.cssProperty) {
                case 'color':
                case'backgroundColor':
                    this.animateColor(animation, ratio);
                    break;
                default:
                    this.animateLength(animation,ratio)
                    break;
            }
        })
    }

    ngOnInit() {
        this.config.animations = this.config.animations.map((animation)=>{
            var defaults = {
                easing:PllxAnimationEasing.easeInOut,
                startAt:0,
                endAt:1,
                units:'',
            }
            if(animation.easing)
            {
                if(PllxAnimationEasing[animation.easing])
                {
                    animation.easing = PllxAnimationEasing[animation.easing];
                }
                else{
                    console.warn('value for animation easing :"'+animation.easing+'" does not exist, default easeInOut used instead')
                    animation.easing = PllxAnimationEasing.easeInOut;
                }
            }
           return <ParallaxAnimation> tools.extend(false,defaults,animation);

        })

    }

    parseColor(color: string): Array<number> {
        if (color.substr(0, 1) == "#") {
            color = color.substr(1);
            if (color.length == 3) {
                colors = [
                    parseInt(color.substr(0, 1), 16) * 2 + parseInt(color.substr(0, 1), 16),
                    parseInt(color.substr(1, 1), 16) * 2 + parseInt(color.substr(1, 1), 16),
                    parseInt(color.substr(2, 1), 16) * 2 + parseInt(color.substr(2, 1), 16),
                    1
                ]
            } else {
                colors = [
                    parseInt(color.substr(0, 2), 16),
                    parseInt(color.substr(2, 2), 16),
                    parseInt(color.substr(4, 2), 16),
                    1
                ]
            }
        } else if (color.substr(0, 3) == "rgb") {
            var colors = color.substr(4).replace(/\(|\)/g, "").split(",").map((s)=> {
                return parseInt(s)
            })
            colors.push[1];
        } else if (color.substr(0, 4 )== "rgba") {
            var colors = color.substr(4).replace(/\(|\)/g, "").split(",").map((s)=> {
                return parseFloat(s)
            })
        }

        return colors
    }

    animateColor(animation: ParallaxAnimation, ratio:number) {
        var startcolors = this.parseColor(animation.startValue.toString().trim());
        var endcolors = this.parseColor(animation.endValue.toString().trim());
        ratio = this.mapRatio(animation,ratio);
        if(ratio === null)
            return;
        var currentColor =
            startcolors.map((startColor, indx)=> {
                return parseInt(animation.easing(ratio, startColor, endcolors[indx] - startColor, 1));
            });
        console.log(currentColor);
        this.el.nativeElement.style[animation.cssProperty]
            = "rgba(" + currentColor[0] + "," + currentColor[1] + "," + currentColor[2] + "," + currentColor[3] + ")"


    }

    /**
     * For animations that do not start at the beginning (0) or end (1) of the scrolling
     * this method will adjust the value of the ratio
     *
     * @param animation the ParallaxAnimation object
     * @param ratio a number between 0 and 1 indicating the progress of the animation
     * @returns {number}
     */


    mapRatio(animation:ParallaxAnimation,ratio:number):number{
        if(animation.startAt>ratio)
        {
            this.el.nativeElement.style[animation.cssProperty]=animation.startValue+animation.units;
            return null;
        }
        if(animation.endAt<ratio)
        {
            this.el.nativeElement.style[animation.cssProperty]=animation.endValue+animation.units;
            return null;
        }

        if((animation.startAt<=ratio && animation.startAt>0)||(animation.endAt>=ratio && animation.endAt<1)) {
            //remap 0 ratio value to startAt
            ratio = ratio - animation.startAt; //remap start

            //adjust ratio based on duration < 1
            ratio = ratio / (animation.endAt - animation.startAt);
            return ratio;
        }
        return ratio;
    }
    animateLength(animation: ParallaxAnimation, ratio:number) {


        ratio = this.mapRatio(animation,ratio);
        if(ratio === null)
            return;

        this.el.nativeElement.style[animation.cssProperty]
            = animation.easing(ratio, animation.startValue, animation.endValue-animation.startValue,1)+animation.units;
    }
}
