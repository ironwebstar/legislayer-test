import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuex, { GetterTree, MutationTree, ActionTree } from "vuex";

import Home from "../../src/views/Home.vue";
import { profiles } from "../mock-data/profiles";
import { RootState } from "../../src/store";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Home", () => {
  let actions: ActionTree<RootState, any>;
  let state: RootState;
  let store;
  let getters: GetterTree<RootState, any>;
  let mutations: MutationTree<RootState>;

  let wrapper: Wrapper<any>;
  beforeEach(() => {
    state = {
      profiles,
      curProfile: null,
    };
    actions = {
      LOAD_PROFILES: jest.fn(),
    };

    mutations = {
      SET_CUR_PROFILE: () => jest.fn(),
    };

    getters = {
      profiles: () => profiles,
      curProfile: () => profiles[0],
    };

    store = new Vuex.Store({
      state,
      actions,
      getters,
      mutations,
    });

    wrapper = shallowMount(Home, { store, localVue });
  });

  it("snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("get profile location if current profile is existed", () => {
    expect(wrapper.vm.profileLocation).toBe(
      "Mill Lane 2958, Swords, Galway, Ireland"
    );
    expect(wrapper.vm.profileTimezone).toBe("Almaty, Dhaka, Colombo +6:00");
  });

  it("get profile location if current profile is not existed", async () => {
    store = new Vuex.Store({
      state,
      actions,
      getters: {
        ...getters,
        curProfile: () => null,
      },
      mutations,
    });
    wrapper = shallowMount(Home, { store, localVue });
    expect(wrapper.vm.profileLocation).toBe("");
    expect(wrapper.vm.profileTimezone).toBe("");
  });

  it("select profile", async () => {
    await wrapper.vm.selectProfile(profiles[0]);
    expect(wrapper.vm.curProfile).toBe(profiles[0]);
  });
});
