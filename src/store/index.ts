import Vue from "vue";
import Vuex from "vuex";
import { MutationTree, GetterTree, ActionTree, ActionContext } from "vuex";

import { getProfiles } from "../util/rest";
// import { mergeProfiles } from "../util/transforms";
import { Profile } from "../types";
import { LOADING_ITEMS, PROFILES, SELECTED_USER } from "../constants";

Vue.use(Vuex);

export interface RootState {
  profiles: Profile[];
  curProfile: Profile | null;
}
interface RootStateFactory {
  (): RootState;
}

export const rootState: RootStateFactory = () => ({
  profiles: [],
  curProfile: null,
});

export const actions: ActionTree<RootState, any> = {
  async LOAD_PROFILES(
    ctx: ActionContext<RootState, any>,
    payload: {
      results?: number;
      gender?: boolean;
    }
  ) {
    const { results, gender } = payload;
    const loadingResults = results || LOADING_ITEMS;

    try {
      const profiles = await getProfiles({ results: loadingResults, gender });
      // const curProfiles = mergeProfiles(profiles.results, ctx.state.profiles);

      ctx.commit("SET_PROFILES", [...ctx.state.profiles, ...profiles.results]);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("ERROR: NO PROFILE DATA");
      }
      return { error };
    }
  },
};

export const mutations: MutationTree<RootState> = {
  SET_PROFILES(state: RootState, profiles: Profile[]) {
    state.profiles = [...profiles];
    console.log(profiles);
    localStorage.setItem(PROFILES, JSON.stringify(state.profiles));
  },

  SET_CUR_PROFILE(state: RootState, curProfile: Profile) {
    state.curProfile = curProfile;
    localStorage.setItem(SELECTED_USER, JSON.stringify(curProfile));
  },
};

export const getters: GetterTree<RootState, any> = {
  profiles: (state: RootState) => state.profiles,
  curProfile: (state: RootState) => state.curProfile,
};

export default new Vuex.Store({
  state: rootState,
  mutations,
  getters,
  actions,
});
