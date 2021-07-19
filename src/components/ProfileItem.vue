<template>
  <div
    class="profile-item"
    :class="{
      'profile-item__selected':
        curProfile &&
        curProfile &&
        profile.id &&
        profile.id.value === curProfile.id.value,
    }"
  >
    <div v-if="profile.picture" class="profile-image">
      <avatar :image="profile.picture.thumbnail" :width="40" :height="40" />
    </div>

    <div class="profile-content">
      <div class="profile-name ellpsis">{{ name }}</div>
      <p class="profile-email ellpsis">{{ profile.email }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";

import Avatar from "./Avatar.vue";
import { Profile } from "../types";

@Component({
  components: {
    Avatar,
  },
})
export default class ProfileItem extends Vue {
  @Prop({ required: true }) profile!: Profile;
  @Getter("curProfile") curProfile!: Profile;

  get name(): string {
    if (this.profile.name)
      return `${this.profile.name.title}. ${this.profile.name.first} ${this.profile.name.last}`;
    return "";
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/theme/variables";

.profile {
  &-item {
    display: flex;
    padding: $spacing * 0.5;
    margin: $spacing * 0.5;
    background-color: $color-2;
    border: 1px solid $color-white;
    cursor: pointer;
    min-width: 200px;

    &__selected,
    &:hover {
      background-color: $color-white;
      border: 1px solid $color-1;
    }
  }

  &-content {
    width: calc(100% - 50px);
    padding: $spacing * 0.5 $spacing;
  }

  &-image {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-name {
    text-align: left;
    font-weight: bold;
    text-transform: capitalize;
  }

  &-email {
    font-size: $font-small;
    text-align: left;
  }
}
</style>
