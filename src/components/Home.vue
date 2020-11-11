<template>
  <div class="container" id="app">
    <div style="height:100%; align-items:center;" class="row">
      <router-link to="/quiz">
        <button class="btn-start-game">Start game</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
.btn-start-game {
  margin-bottom: 1em;
  width: 100%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  color: #fff;
  background-color: #92cc41;
  padding: 6px 8px;
  border-style: solid;
  border-width: 4px;
  font-size: 1.2rem;
  cursor: pointer;
}

a {
  flex-grow: 1;
  display: flex;
}
</style>
