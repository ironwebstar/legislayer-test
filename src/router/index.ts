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
        if (!localStorage.getItem(PROFILES))
          await Store.dispatch("LOAD_PROFILES", { results: LOADING_ITEMS });
        else {
          const localProfiles = localStorage.getItem(PROFILES)
            ? JSON.parse(localStorage.getItem(PROFILES) || "")
            : [];
          if (localProfiles.length > LOADING_ITEMS)
            localProfiles.length = LOADING_ITEMS;
          Store.commit("SET_PROFILES", localProfiles);
        }
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
