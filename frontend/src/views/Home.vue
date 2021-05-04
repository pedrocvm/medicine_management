<template>
  <div class="homeWrapper">
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
        :search="search">
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { MedicineService } from '@/services/medicine.service';

export default {
  data() {
    return {
      search: '',
      medicines: [],
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
  methods: {
    fetchData() {
      const vm = this;

      const query = `
        {
          findAllMedicine {
            id name description dayPeriod
            doses interval
          }
        }
      `;
      MedicineService.list(query).then((result) => {
        vm.tableData = result;

        vm.tableData.forEach((item) => {
          switch (item.dayPeriod) {
            case 'MORNING':
              item.dayPeriod = 'Manhã';
              break;

            case 'AFTERNOON':
              item.dayPeriod = 'Tarde';
              break;

            case 'NIGHT':
              item.dayPeriod = 'Noite';
              break;

            default:
              return;
          }
        });
      });
    },
    editItem(id) {},
    deleteItem(id) {},
  },

  mounted() {
    const vm = this;
    vm.fetchData();
  },
};
</script>

<style scoped lang="scss">
@import '../sass/master';

.homeWrapper {
  height: calc(100vh - 70px);
  padding: 30px;

  .v-card {
    padding: 0px 30px 30px;
  }

  .v-card__title {
    max-width: 300px;
  }

  @media (max-width: 599px) {
    .v-card__title {
      margin: 0 auto;
      max-width: 100%;
    }
  }
}
</style>
