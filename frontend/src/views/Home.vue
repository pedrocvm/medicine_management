<template>
  <div class="app">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="tableData"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import * as medicines from '../../database/db';

export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Nome',
          value: 'name',
        },
        { text: 'Período', value: 'dayPeriod' },
        { text: 'Doses', value: 'doses' },
        { text: 'Intervalo', value: 'interval' },
        { text: 'Descrição', value: 'description' },
      ],
      tableData: [],
    };
  },

  mounted() {
    this.tableData = medicines;

    this.tableData.forEach((item) => {
      switch (item.dayPeriod) {
        case 'MORNING':
          item.dayPeriod = 'Manhã'
          break;

        case 'AFTERNOON':
          item.dayPeriod = 'Tarde'
          break;

        case 'NIGHT':
          item.dayPeriod = 'Noite'
          break;

        default:
          return;
      }
    });
  },
};
</script>

<style scoped lang="scss">
@import '../sass/master';

.app {
  height: calc(100vh - 70px);
}
</style>
