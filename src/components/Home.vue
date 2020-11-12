<template>
  <div
    style="padding-bottom:3rem; padding-top:3rem;"
    class="container"
    id="app"
  >
    <div class="outside-div">
      <div class="middle-div">
        <div class="inside-div">
          <h1>
            <span id="ultimate">Ultimate</span><br />
            <span id="trivia-master">Trivia Master</span>
          </h1>
        </div>
      </div>
    </div>
    <div style=" margin-top:20px; height:100%; align-items:center;" class="row">
      <router-link to="/categories">
        <button class="btn-start-game">Play!</button>
      </router-link>
      <router-link to="/highscore">
        <button class="btn-high-score">High score</button>
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
  background-color: #1fc700;
  padding: 6px 8px;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 2px #1fc700;
}

.btn-start-game:hover {
  background-color: #39ff14;
}

.btn-start-game:active {
  background-color: #23e000;
  transform: translateY(4px);
}

.btn-high-score {
  margin-bottom: 1em;
  width: 100%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  color: #fff;
  background-color: #1fc700;
  padding: 6px 8px;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 2px #1fc700;
}

a {
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
}

div .container {
  background-color: #15242d;
  border-style: solid;
}

h1 {
  text-align: center;
  font-size: 48px;
  color: #000000;
  font-family: Fantasy;
}

#ultimate {
  color: #dededa;
  text-shadow: 3px 3px #0b332e, 4px 4px #39ff14;
}

#trivia-master {
  color: #dededa;
  text-shadow: 3px 3px #0b332e, 4px 4px #39ff14;
}

.outside-div {
  border-style: solid;
  border-color: #ffffff;
  width: 100%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

.middle-div {
  border-style: solid;
  border-color: #39ff14;
}

.inside-div {
  background-color: #15242d;
  border-color: #d2af58;
  border-style: solid;
}
</style>
