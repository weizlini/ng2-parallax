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
  <parallax-section>
    
    <!--this animation will animate the color from black to white during the scrolling-->
    <div class="box" style="position:fixed;width:100vw;height:100vh;top:0;left:0" [ParallaxAnimate]="{
    animations:[
        {cssProperty:'backgroundColor',startValue:'#00000',endValue:'#ff0000'}
      ]
    }">
      </div>
    
    <!--this animation will animate the color white to black and the fontsize from 1em to 3em-->
    <h1 [ParallaxAnimate]="{
      animations:[
          {cssProperty:'fontSize',startValue:1,endValue:3,units:'em'},
          {cssProperty:'color',startValue:'#ffffff',endValue:'#000000'}
        ]
      }">section 1 : color, fontSize, and negative scroll</h1>
    
    <!--this text will scroll down from its origin at 1/20th the scroll speed-->
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