<template>
  <div id="app">
    <div id="midground"></div>
    <div id="foreground"></div>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span>&#124;</span>
      <router-link to="/solarsystem">Solar System</router-link>
      <span>&#124;</span>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body {
  background: url("~@/assets/background.png") repeat 5% 5%;
}

#midground {
  background: url("~@/assets/midground.png") repeat 20% 20%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -997;
}
#foreground {
  background: url("~@/assets/foreground.png") repeat 90% 110%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -998;
}
</style>


<style scoped>
#app {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-size: 2.1rem;
  font-weight: bold;
  color: rgba(242, 202, 39, 0.609);
}

#nav a.router-link-exact-active {
  color: rgba(242, 202, 39, 0.8);
}

span {
  font-size: 2.6rem;
  color: rgba(242, 202, 39, 1);
  padding: 0 25px;
}
</style>
