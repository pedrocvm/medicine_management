<template>
  <v-app>
    <div class="loaderWrapper">
      <Loader />
    </div>

    <v-main>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-main>
    <Header />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';
import Loader from '@/components/Loader.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Header,
    Loader,
  },

  data: () => ({}),
});
</script>

<style lang='scss'>
@import './sass/master';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.loaderWrapper{
  z-index: 99;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.514);
  @include flexbox(row, center, center);
  position: fixed;
  right: 0;
  overflow: hidden;
}
</style>
