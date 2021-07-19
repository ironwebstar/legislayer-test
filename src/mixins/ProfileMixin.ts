import Vue from "vue";
import Component from "vue-class-component";

import { Profile } from "../types";

@Component
export class ProfileMixin extends Vue {
  profile!: Profile;

  get name(): string {
    return `${this.profile.name.title}. ${this.profile.name.first} ${this.profile.name.last}`;
  }
}
