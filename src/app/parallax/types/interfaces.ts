
export interface ParallaxConfig{

    /* the default height of each section as a css string */
    sectionHeight:string;

    /* whether to display debugging info */
    debug:boolean;

    /* whether to fade in a section */
    sectionFadeIn:boolean;

    /* whether to fade out a section */
    sectionFadeOut:boolean;

}
export interface position{
    top:string;
    left:string;
}

export interface ParallaxScrollConfig{
    origin:position;
    scrollMultiplier:number;
    leftMovement:number;

}