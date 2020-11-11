import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import Profile from "./components/Quiz.vue";

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
    component: Profile
  }
];

const router = new VueRouter({
  // mode: 'history',
  routes
});

export default router;
