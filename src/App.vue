<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/Ranking">Ranking</router-link>
    </div>

    <router-view />
  </div>
</template>

<script></script>

<style>
#app {
  font-family: "Nunito Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #818181;
  width: 100%;
  height: 100%;
  background-color: #000;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #818181;
  opacity: 1;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
