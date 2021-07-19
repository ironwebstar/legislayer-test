<template>
  <div class="home">
    <div class="search">
      <div class="search-input">
        <input class="" v-model="search" @input="searchHandle" />
      </div>

      <div class="search-list">
        <profile-item
          v-for="(profile, index) in filteredProfiles"
          :key="index"
          :profile="profile"
          @click.native="selectProfile(profile)"
        />
        <infinite-loading
          :identifier="infiniteId"
          @infinite="infiniteHandler"
        ></infinite-loading>
      </div>
    </div>

    <div class="profile">
      <div v-if="curProfile">
        <div class="current-profile">
          <div class="current-profile-top">
            <avatar
              :image="curProfile.picture.thumbnail"
              :width="100"
              :height="100"
            />
            <div class="current-profile-top-content">
              <div class="current-profile-name">
                {{
                  `${curProfile.name.title}. ${curProfile.name.first} ${curProfile.name.last}`
                }}
              </div>
              <p class="current-profile-username">
                {{ `@${curProfile.login.username}` }}
              </p>
              <a
                class="current-profile-email"
                :href="`mailto:${curProfile.email}`"
              >
                Email: {{ curProfile.email }}
              </a>
              <a class="current-profile-cell" :href="`tel:${curProfile.cell}`">
                Phone: {{ curProfile.cell }}
              </a>
            </div>
          </div>

          <div class="current-profile-bottom">
            <p><b>Location:</b> {{ profileLocation }}</p>
            <p><b>Timezone:</b> {{ profileTimezone }}</p>
            <p><b>Birthday:</b> {{ curProfile.dob.age }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import debounce from "debounce";
import { Getter, Mutation, Action } from "vuex-class";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import InfiniteLoading from "vue-infinite-loading";

import ProfileItem from "../components/ProfileItem.vue";
import Avatar from "../components/Avatar.vue";

import { Profile } from "../types";
import { SELECTED_USER, LOADING_ITEMS } from "../constants";

@Component({
  components: { ProfileItem, Avatar, InfiniteLoading },
})
export default class Home extends Vue {
  @Getter("profiles") profiles!: Profile[];
  @Getter("curProfile") curProfile!: Profile;

  @Mutation("SET_PROFILES") setProfiles: any;
  @Mutation("SET_CUR_PROFILE") setCurProfile: any;
  @Action("LOAD_PROFILES") loadProfiles: any;

  search = "";
  filteredProfiles: Profile[] = [];
  infiniteId = +new Date();

  @Watch("profiles")
  onProfilesChange(): void {
    this.filteredProfiles = this.profiles;
  }

  created(): void {
    this.filteredProfiles = this.profiles;
    this.setCurProfile(
      localStorage.getItem(SELECTED_USER)
        ? JSON.parse(localStorage.getItem(SELECTED_USER) || "")
        : null
    );
  }

  infiniteHandler(): void {
    this.loadProfiles({ results: LOADING_ITEMS });
  }

  async searchHandle(): Promise<void> {
    this.setProfiles([]);
    debounce(async () => {
      if (this.search) await this.searchProfile();
    }, 500);
  }

  async searchProfile(): Promise<void> {
    const search = this.search.toLowerCase();

    if (this.profiles.length < LOADING_ITEMS) {
      await this.loadProfiles({ results: LOADING_ITEMS });
    }

    if (search) {
      const filtered = await this.profiles.filter(
        (profile: Profile) =>
          profile.name.first.toLowerCase().includes(search) ||
          profile.name.last.toLowerCase().includes(search)
      );
      if (filtered.length > LOADING_ITEMS) filtered.length = LOADING_ITEMS;

      this.filteredProfiles = filtered;
    }
  }

  selectProfile(profile: Profile): void {
    this.setCurProfile(profile);
  }

  get profileLocation(): string {
    if (this.curProfile) {
      const { location } = this.curProfile;
      return `${location.street.name} ${location.street.number}, ${location.city}, ${location.state}, ${location.country}`;
    }
    return "";
  }

  get profileTimezone(): string {
    if (this.curProfile) {
      const { location } = this.curProfile;
      return `${location.timezone.description} ${location.timezone.offset}`;
    }
    return "";
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/theme/variables";

.home {
  margin: $spacing * 2 auto;
  display: flex;
  width: 90%;
}

.search {
  width: 25%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;

  &-input {
    width: 100%;

    input {
      width: 90%;
      padding: $spacing * 0.5;
      margin: 0 auto;
    }
  }

  &-list {
    display: flex;
    flex-direction: column;
    padding: $spacing 0;
  }
}

.profile {
  width: 75%;
  padding: $spacing $spacing * 2;
  text-align: left;
}

.current-profile {
  &-top {
    display: flex;
    width: 100%;

    &-content {
      padding-left: $spacing * 3;
      display: flex;
      flex-direction: column;
    }
  }

  &-name {
    font-weight: bold;
    font-size: $font-big;
    padding-bottom: $spacing * 0.5;
  }

  &-bottom {
    padding: $spacing * 2 0;
    p {
      display: flex;
      flex-direction: column;
      margin-bottom: $spacing;
    }
  }
}
</style>
