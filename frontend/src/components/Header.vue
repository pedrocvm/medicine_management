<template>
  <v-bottom-navigation horizontal>

    <v-btn icon>
    <router-link>
      <v-icon>mdi-history</v-icon>
      <span>Recents</span>
    </router-link>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
      <span>Favorites</span>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-map-marker</v-icon>
      <span>Nearby</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '../sass/master';

.v-bottom-navigation {
  display: flex;
  justify-content: space-around !important;
  width: 100%;
  background-color: navy !important;

  .v-icon,
  span {
    color: #eee !important;
  }
  .v-btn__content {
    display: flex;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;

    i {
      margin: 0 !important;
    }
  }
}
</style>
