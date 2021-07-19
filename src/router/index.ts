import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Home from "../views/Home.vue";
import Store from "../store";
import { PROFILES, LOADING_ITEMS } from "../constants";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    async beforeEnter(to, from, next) {
      try {
        console.log(
          "routeing",
          localStorage.getItem(PROFILES)
            ? JSON.parse(localStorage.getItem(PROFILES) || "")
            : []
        );
        if (!localStorage.getItem(PROFILES))
          await Store.dispatch("LOAD_PROFILES", { results: LOADING_ITEMS });
        else
          Store.commit(
            "SET_PROFILES",
            localStorage.getItem(PROFILES)
              ? JSON.parse(localStorage.getItem(PROFILES) || "")
              : []
          );
        next();
      } catch (error) {
        // TODO: Error Handling
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
