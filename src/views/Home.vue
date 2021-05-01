<template>
  <div class="app">
    <h1>Home</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.app {
  height: calc(100vh - 70px);
}
</style>
