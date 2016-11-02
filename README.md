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
* `[ParallaxAnimate]=""` (works) this is used to animate any css property during the duration of the scrolling

##how to use ng2-parallax

the `<parallax-page></parallax-page>` component is the root container of the parallax scrolling and animations. The parallax-page element contains one `[config]` input field, which will configure the parallax app by passing a JSON object to the config input as follows: 
```Typescript
{

    /* the default height of each section as a css string */
    sectionHeight: string;

    /* whether to display debugging info 
     * if set to true, you will be able to see the underlying `parallax-section` components as grey boxes,
     * and a little debug box on the upper right hand corner of the page indicating the scroll values and which sections
     * are active
     */
    debug: boolean;

    /* whether to fade in a section 
     * when a section passes into thw viewport it is made visible as well as all of its children, the fade makes the 
     * section fade in between the time the top of the section moves from the bottom of the viewport to the top
     */
    sectionFadeIn: boolean;

    /* whether to fade out a section 
     * when a section passes out of the viewport it is hidden as well as all of its children, the fade makes the 
     * section fade out between the time the bottom of the section moves from the bottom of the viewport to the top
     */
    sectionFadeOut: boolean;

}
```

here's an example from the code contained within the `/src/app/app.component.html` page

```html
<!-- the entire parallax experience is wrapped in a parallax-page component -->
<parallax-page [config]="{sectionHeight:'500vh',debug:false,sectionFadeIn:true,sectionFadeOut:true}">
    <!-- each section is wrapped in a parallax-section tag. the parallax sections are the scenes in a parallax scroll experience -->
  <parallax-section>
    
    <!--this animation will animate the background color from black to red during the scrolling-->
    <div class="box" style="position:fixed;width:100vw;height:100vh;top:0;left:0" [ParallaxAnimate]="{
    animations:[
        {cssProperty:'backgroundColor',startValue:'#00000',endValue:'#ff0000'}
      ]
    }">
      </div>
    
    <!--this animation will animate the text-color from white to black and the fontsize from 1em to 3em-->
    <h1 [ParallaxAnimate]="{
      animations:[
          {cssProperty:'fontSize',startValue:1,endValue:3,units:'em'},
          {cssProperty:'color',startValue:'#ffffff',endValue:'#000000'}
        ]
      }">section 1 : color, fontSize, and negative scroll</h1>
    
    <!--this text will scroll down from its origin at 1/20th the scroll speed in the opposite direction-->
    <div class="text" style="position:fixed" [ParallaxScroll]="{origin:{left:0,top:50},scrollMultiplier:-0.05}">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi blandit enim vestibulum, ornare enim non, iaculis nulla. Pellentesque lobortis varius nisl

      sit amet tincidunt. Donec tempus sit amet magna eu scelerisque. Nulla rutrum, massa a accumsan rhoncus, arcu augue eleifend ligula, ut pretium magna arcu ut ipsum.

      Pellentesque ullamcorper felis sit amet nibh elementum, ac maximus nulla bibendum. Donec leo ex, fermentum et lorem quis, dignissim efficitur ligula. Integer condimentum

      ultrices lacus vel iaculis. Aenean leo turpis, vulputate id elementum et, tincidunt vel quam. Nulla suscipit varius libero. Etiam at iaculis tortor,

      a tempus urna. Maecenas eu libero nisi. In ligula erat, dapibus vitae nulla at, semper ultricies ante. Sed luctus enim at lacinia luctus.
    </div>

  </parallax-section>
  <parallax-section>
    <!-- this is scroll that will move in the usual scroll direction but at 1/20th the speed -->
    <img src="assets/images/clouds.jpg" style="width:200vw;position:fixed" [ParallaxScroll]="{origin:{left:0,top:0},scrollMultiplier:0.05,leftDrift:0}"/>
    <!-- this scroll will move in the opposite direction at a speed of 1/10th 
         and will drift 300px to the right -->
    <div style="height:300vh;width:150vw;background:url(assets/images/birds.png) repeat;position:fixed" [ParallaxScroll]="{origin:{left:-500,top:-700},scrollMultiplier:-0.1,leftMovement:300}"></div>
    <h1>section 2 : two layers scrolling, one scrolling with 'leftMovement'</h1>
  </parallax-section>
  <parallax-section><h1>section 3 : square fades-out starting at 0.25 and 0.5  of scroll</h1>
    <!-- this square will fade out starting at 1/4 of the scroll -->
    <div style="position:fixed;top:6em;left:100px;width:200px;height:200px;background-color:#336699" [ParallaxAnimate]="{
      animations:[
        {cssProperty:'opacity',startValue:1,endValue:0,startAt:0.25,easing:'linear'}
      ]
    }"></div>
    <!-- this square will fade out starting at 1/2 of the scroll -->
    <div style="position:fixed;top:6em;left:400px;width:200px;height:200px;background-color:#336699" [ParallaxAnimate]="{
      animations:[
        {cssProperty:'opacity',startValue:1,endValue:0,startAt:0.5,easing:'linear'}
      ]
    }"></div>
  </parallax-section>
  
  <parallax-section [sectionHeight]="'600vh'"><h1>section 4:easing examples</h1>
    <!-- the animations below all start at 1/4 of the scroll and end at 3/4 of the scroll 
         they all start nd end at the same position but use different easing functions
    -->
    
    <!-- linear easing-->
  <div style="position:fixed;height:50px;top:100px;left:100px;background:red;" [ParallaxAnimate]="{
    animations:[
        {cssProperty:'left',startValue:100,endValue:500,units:'px',easing:'linear',startAt:0.25,endAt:0.75}
      ]
    }">Linear</div>
    
    <!-- ease in animation -->
    <div style="position:fixed;height:50px;top:160px;left:100px;background:red;" [ParallaxAnimate]="{
    animations:[
        {cssProperty:'left',startValue:100,endValue:500,units:'px',easing:'easeIn',startAt:0.25,endAt:0.75}
      ]
     }">Ease In</div>
    
    <!-- ease out animation -->
    <div style="position:fixed;height:50px;top:220px;left:100px;background:red;" [ParallaxAnimate]="{
    animations:[
        {cssProperty:'left',startValue:100,endValue:500,units:'px',easing:'easeOut',startAt:0.25,endAt:0.75}
      ]
     }">Ease Out</div>
    
    <!-- ease in and out animation -->
    <div style="position:fixed;height:50px;top:280px;left:100px;background:red;" [ParallaxAnimate]="{
    animations:[
        {cssProperty:'left',startValue:100,endValue:500,units:'px',easing:'easeInOut',startAt:0.25,endAt:0.75}
      ]
    }">Ease In Out</div>
  </parallax-section>
  <parallax-section><h1>section 5</h1></parallax-section>
  <parallax-section><h1>section 6</h1></parallax-section>
</parallax-page>
```

##How `<parallax-page>` and `<parallax-sectiom>` work
the ParallaxPageComponent upon view init, will keep a list of all the parallax sections, it will set their heights unless overridden in the section itself, and activate the sections that are visible on the screen. The minimum height that a section must be is 100vh, or the height of the screen, which means that no more than 2 sections can be visible at the same time. 

the two active sections are known internally to the page component as the `currentSection` and the `nextSection` the currentSection is the current section if the top of the top of the section has reached the top of the screen. The nextSection is the section after it with a portion visible on the screen.

By default the Parallax routine will fade in a section as it becomes visible, and normally as the nextSection is becoming visible, the currentSection is fading out; the nextSection becomes the currentSection, and the next section is usually NULL at this point until the next section becomes visible

Regular HTML elements can have their css properties animated and synchronized with the scrolling of the page. Since Each animation object will animate only 1 css property, the `[ParallaxAnimate]` directive contains an array so that multiple animations can be performed.

Elements which only scroll at different rates can use the the `[ParallaxScroll]` directive which will modify the scroll speed of an absolutely or fixed position HTML element and move it in either direction as a multiplier of the scroll. so setting the scrollMultiplier to 1 will cause an element to scroll at the same speed as the underlying section. setting it to 0.05 will move it in the direction of the scroll at 1/20th the speed. You can also effect a horizontal moment by setting the LeftMovement attrobite, or by setting a `[ParallaxAnimation]` on the left property 

##[ParallaxScroll]
set the `[ParallaxScroll]` attribute to the following type in JSON
```typescript
export interface ParallaxScrollConfig {
    origin: position; // an object with left and top values e.g. {left:'10px',top:'10px'}
    scrollMultiplier: number; // the scroll multiplier adjusts the regular scroll which is set to "1"..it can be any value between -infinity and +infinity
    leftMovement: number; // a movement to the left for a drifting scrolling effect. can be also done with ParallaxAnimate
}
```

##[ParallaxAnimate]

Set the `[ParallaxAnimate]` attribute to the following type in JSON. 

```typescript
export interface ParallaxAnimateConfig {
    animations: Array<ParallaxAnimation>;
}
```
The property animations is an array of ParallaxAnimation objects which will allow you to animate any number of css properties.
each ParallaxAnimation has the following properties to be written as a JSON object.. the properties with a `?` are optional

```typescript
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

the `startAt` and `endAt` respresent a fraction (a percent if you will) of the total amount of scrolling. 0 being the start and 1 being the end. the 0 and 1 range represents the amount of scroll needed from when the top of the `<parallax-section>` first appears at the bottom of the viewport (screen) to when the bottom of the `<parallax-section>` scrolls out of view beyond the top of the viewport (screen). 

