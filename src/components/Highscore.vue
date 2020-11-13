<template>
  <div class="container" id="app">
    <router-link to="/">
        <button class="btn-home-menu">Home</button>
    </router-link>
    <h4>High scores:</h4>
    <p>-------------------------------------------------------</p>
    <ul>
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
  methods: {
    getUserInfo: function (){
    this.userList = JSON.parse(localStorage.getItem("users"))
    this.userList = this.userList.orderBy(this.userList, 'points', 'asc');
    }
  },
  mounted(){
    this.getUserInfo();
  }
};
</script>

<style scoped>
.btn-home-menu{
  background-color: #3366FF;
  font-size: 36px;
  color: #fff;
  width: 100%;
  height: 100%;
  max-width: 100px;
  max-height: 100px;
  cursor: pointer;
  box-shadow: 2px #1fc700;
}


.btn-home-menu:hover {background-color: #37A2EE}

.btn-home-menu:active {
  background-color: #0F4D79;
  transform: translateY(4px);
}

h4 {
  color: #dededa;
  font-size: 48px;
  text-shadow: 3px 3px #0b332e;
}
p {
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

div .container {
  background-color : #15242d;
  border-style: solid;
}

ul {
  list-style: none;
}

#username{
  color: #dededa;
  font-size: 32px;
  text-shadow: 3px 3px #0b332e;
}

#userpoints{
  color: #dededa;
  font-size: 32px;
  text-shadow: 3px 3px #0b332e;
  float: right;
}

</style>
