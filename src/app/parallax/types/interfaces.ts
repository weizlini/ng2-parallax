export interface ParallaxConfig {

    /* the default height of each section as a css string */
    sectionHeight: string;

    /* whether to display debugging info */
    debug: boolean;

    /* whether to fade in a section */
    sectionFadeIn: boolean;

    /* whether to fade out a section */
    sectionFadeOut: boolean;

}
export interface position {
    top: string;
    left: string;
}

export interface ParallaxScrollConfig {
    origin: position;
    scrollMultiplier: number;
    leftMovement: number;
}

export interface ParallaxAnimateConfig {
    animations: Array<ParallaxAnimation>;
}
export interface ParallaxAnimation {
    cssProperty: string;
    startValue:any;
    endValue:any;
    startAt?:number; //default 0
    endAt?:number; //default 1
    units?:string; //default is none
    easing?:any;//default is PllxAnimationEasing.easeInOut
    customFunction?:Function//default is undefined
}



export class PllxAnimationEasing {
    
    public static linear(current:number, start:number, delta:number, duration:number) {
        return delta * current / duration + start;
    };

    public static easeInOut(current:number, start:number, delta:number, duration:number) {
        current /= duration / 2;
        if (current < 1) return delta / 2 * current * current + start;
        current--;
        return -delta / 2 * (current * (current - 2) - 1) + start;
    };

    public static easeIn(current:number, start:number, delta:number, duration:number) {
        current /= duration;
        return delta * current * current + start;
    };
    public static easeOut(current:number, start:number, delta:number, duration:number) {
        current /= duration;
        return -delta * current *(current -2) + start;
    };


}


