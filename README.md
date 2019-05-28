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
#### Image src resolving

The src prop (and blank-src prop of <b-img-lazy>), out of the box, works only with absolute or fully-qualified-domain-name URLs. If you are using project assets as image sources you need the vue.config.js file with the settings here. Also You have to wrap the path in require('.. /../.....') to let webpack know that it should handle this string as a dependency.
```
### Links
[Vue-Carousel-3d site](https://wlada.github.io/vue-carousel-3d/)

[Bootstrap-Vue](https://bootstrap-vue.js.org/)

[Vue-Date-Picker](https://vuejsexamples.com/datepicker-component-for-vue-2/)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


