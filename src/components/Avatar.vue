<template>
  <div
    class="profile-avatar"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <img :src="image" alt="Avatar" :width="width" :height="height" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class Avatar extends Vue {
  @Prop({ required: true }) image!: string;
  @Prop({ default: 50 }) width!: number;
  @Prop({ default: 50 }) height!: number;
}
</script>

<style lang="scss" scoped>
@import "../assets/theme/variables";

.profile-avatar {
  img {
    border-radius: 50%;
  }
}
</style>
