import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import Quiz from "./components/Quiz.vue";
import Highscore from "./components/Highscore.vue";
import Categories from "./components/Categories.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/quiz",
    name: "quiz",
    component: Quiz,
    props: true
  },
  {
    path: "/highscore",
    name: "highscore",
    component: Highscore
  },
  {
    path: "/categories",
    name: "categories",
    component: Categories
  }
];

const router = new VueRouter({
  // mode: 'history',
  routes
});

export default router;
