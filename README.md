# nasa-site

## Project setup
```
npm install

          --------------------------------
Need to add a nasaKey.js file in /src folder with contents 
//  ---- /src/nasaKey.js -------------- //

const APIkey = {
  key: "MyAPIKey"
};

export default APIkey;

Then import file accordingly.
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```


### Important Notes
```
Image src resolving

The src prop (and blank-src prop of <b-img-lazy>), out of the box, works only with absolute or fully-qualified-domain-name URLs. If you are using project assets as image sources you need the vue.config.js file with the settings here. Also You have to wrap the path in require('.. /../.....') to let webpack know that it should handle this string as a dependency.
```

### Using background-image css property
```
Webpack has some specific rules when resolving assets.

In order to resolve an alias (@) it is mandatory webpack handles the request as a module request. Using the prefix ~ enforces webpack treat the request as a module request, similar to require('some-module/image.svg').

So here to use background-image we put on #app element

background-image:  url('~@/assets/night-sky-image.jpg');

!!Important. Property must be unscoped in App.vue.
```

## $ref Usage

You can assign a reference ID to the child component using the ref attribute. For example:

`<template> <!-- Parent component -->
<datepicker ref="datePicked" format="YYYY-M-D" name="date2"></datepicker>
</template>`

Now in the Parent component where you’ve defined this ref, you can use:

this.$refs.datePicked.pickedValue

to access the <datepicker> instance. This may be useful when you want to, for example, programmatically focus this input from a parent. In that case, the <datepicker> component may similarly use a ref to provide access to specific elements inside it.

## Web Deployment
First make sure to install Surge on your machine

` npm install surge -g`

Then issue command to build App

`npm run build `

Then cd to /dist/myApp

and deploy to surge.sh

`$ surge`

Can create a file in home directory called CNAME that will hold 
your App name so dont have to enter it all the time when you redeploy the project.




### Links
[Vue-Carousel-3d site](https://wlada.github.io/vue-carousel-3d/)

[Bootstrap-Vue](https://bootstrap-vue.js.org/)

[Vue-Date-Picker](https://vuejsexamples.com/datepicker-component-for-vue-2/)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


