<template>
  <v-bottom-navigation horizontal>

    <v-btn icon>
    <router-link to="/home">
      <v-icon>mdi-home</v-icon>
      <span>Home</span>
    </router-link>
    </v-btn>

    <v-btn icon>
    <router-link to="/register">
      <v-icon>mdi-plus</v-icon>
      <span>Register</span>
    </router-link>
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

  a {
    @include flexbox(column, center, center);
    gap: 2px;
    font-size: 14px;
    text-decoration-line: none;
  }
}
</style>
