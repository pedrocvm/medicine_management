<template>
  <div class="loaderWrapper" v-if="onLoad">
    <v-progress-circular
      :size="60"
      indeterminate
      color="white"
    ></v-progress-circular>
    <span>Carregando</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      onLoad: (state) => state.onLoad,
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '../sass/master';

.loaderWrapper {
  @include flexbox(column, center, center);
  width: 100%;
  height: 100%;
  overflow: hidden;
  gap: 5px;

  span {
    color: $white;
  }
}
</style>
