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

and 3 directives which are placed as attributes of HTML elements contained within a

* `[ParallaxPath]=""` (not implemented yet)
* `[ParallaxFade]=""` (not implemented yet)
* `[ParallaxScroll]=""` (works)

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
