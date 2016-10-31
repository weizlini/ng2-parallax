# ng2-parallax

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.18. It is a small library of components and directives that allow you to easily create parallax scrolling websites

## Installation
clone the repository and run the command `npm install`

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

#ng2-parallax components and directives

The paralax library is composed of 2 components: 

* `<parallax-page>` component (works)
* `<parallax-section>` component (works)

and 2 directives which are placed as attributes of HTML elements contained within a

* `[ParallaxScroll]=""` (works) this is mostly used to alter the scroll speed of an element to create a depth effect
* `[ParallaxAnimate]=""` (in progress) this is used to animate any css property during the duration of the scrolling

##how to use ng2-parallax

here's an example from the code contained within the `/src/app/app.component.html` page

```
<parallax-page [config]="{sectionHeight:'500vh',debug:false,sectionFadeIn:true,sectionFadeOut:true}">
  <parallax-section><h1>section 1</h1></parallax-section>
  <parallax-section>
    <img src="assets/images/clouds.jpg" style="width:100vw;position:fixed" [ParallaxScroll]="{origin:{left:0,top:0},scrollMultiplier:0.05,leftDrift:0}"/>
    <div style="height:300vh;width:150vw;background:url(assets/images/birds.png) repeat;position:fixed" [ParallaxScroll]="{origin:{left:-500,top:-700},scrollMultiplier:-0.1,leftMovement:300}"></div>
    <h1>section 2 : The Birds</h1>
  </parallax-section>
  <parallax-section><h1>section 3</h1></parallax-section>
  <parallax-section [sectionHeight]="'600vh'"><h1>section 4</h1></parallax-section>
  <parallax-section><h1>section 5</h1></parallax-section>
  <parallax-section><h1>section 6</h1></parallax-section>
</parallax-page>
```

##[ParallaxScroll]

##[ParallaxAnimate]

Set the ParallaxAnimate attribute to the following type in JSON 

```
export interface ParallaxAnimateConfig {
    animations: Array<ParallaxAnimation>;
}
```

each ParallaxAnimation has the following properties to be written as a JSON object.. the properties with a `?` are optional

```
export interface ParallaxAnimation {
    cssProperty: string; // the property to animate must be camelCase such as "backgroundColor"
    startValue:any; // the property value, without the units, for for colors use '#xxx','#xxxxxx','rgb(x,x,x)','rgba(x,x,x,x)'
    endValue:any; // the final value of the property
    startAt?:number; //default 0
    endAt?:number; //default 1
    units?:string; //default is ''
    easing?:Function; //default is PllxAnimationEasing.easeInOut
    customFunction?:Function // a custom function for the animation with the same (current,start,delta,duration) signature
}
```