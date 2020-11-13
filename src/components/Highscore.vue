<template>
  <div class="container" id="app">
    <router-link to="/">
      <button class="btn-home-menu">Home</button>
    </router-link>
    <h4>High scores:</h4>

    <h2 v-if="userList.length <= 0">
      No High scores yet. Play a game and save yours!
    </h2>

    <ul v-else>
      <li v-for="user in userList" :key="user.name">
        <pre><span id="username">{{ user.name }}</span><span id="userpoints">{{ user.points }}</span></pre>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Highscore",
  data() {
    return {
      userList: []
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    // Users, with their high scores, are saved in localstorage.
    // We sort the list according to points: highest to low.
    getUserInfo: function() {
      let sortList = JSON.parse(localStorage.getItem("users"));

      if (sortList === null || sortList === undefined) {
        return;
      }

      sortList = sortList.sort(function(a, b) {
        return b.points - a.points;
      });

      this.userList = sortList;
    }
  }
};
</script>

<style scoped>
.btn-home-menu {
  background-color: #3366ff;
  font-size: 36px;
  color: #fff;
  width: 100%;
  height: 100%;
  max-width: 100px;
  max-height: 100px;
  cursor: pointer;
  box-shadow: 2px #1fc700;
}

.btn-home-menu:hover {
  background-color: #37a2ee;
}

.btn-home-menu:active {
  background-color: #0f4d79;
  transform: translateY(4px);
}

h4 {
  color: #dededa;
  font-size: 48px;
  text-shadow: 3px 3px #0b332e;
  display: table-cell;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

h2 {
  margin-top: 20px;
  color: antiquewhite;
}

p {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

div .container {
  background-color: #15242d;
  border-style: solid;
}

ul {
  margin-top: 20px;
  list-style: none;
}

#username {
  color: #dededa;
  font-size: 32px;
  text-shadow: 3px 3px #0b332e;
}

#userpoints {
  color: #dededa;
  font-size: 32px;
  text-shadow: 3px 3px #0b332e;
  float: right;
}
</style>
