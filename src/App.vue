<template>
  <div class="container" id="app">
    <router-view />
  </div>
</template>

<script>
//import FormEx from "./components/FormEx.vue";

export default {
  name: "App",
  components: {},
  data() {
    return {
      employeeArr: [],
      loading: true
    };
  },
  mounted() {
    this.getEmployees();
  },
  methods: {
    async getEmployees() {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy"
        );
        const data = await response.json();
        this.employeeArr = data.results;
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    }
  }
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

html,
body,
.container {
  min-height: 100%;
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
