<template>
  <div class="container" id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
*,
:after,
:before {
  box-sizing: border-box;
}
* {
  padding: 0;
  margin: 0;
}

body,
input,
textarea,
button {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/

  font-family: "VT323", monospace;
}

.container {
  margin: 0 auto;
  max-width: 960px;
  width: 100%;
  padding: 4vw 4vw;
  /*margin-top: 60px;*/
  color: #2c3e50;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (min-width: 320px) {
  html,
  body,
  .container {
    height: 100%;
  }
}

@media (min-width: 768px) {
}

@media (min-width: 992px) {
  html,
  body,
  .container {
    min-height: 100%;
    height: unset;
  }
}

@media (min-width: 1200px) {
}

.row {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
a {
  cursor: pointer;
  outline: none;
  text-decoration: none;
}
</style>
