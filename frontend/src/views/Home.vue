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

      <Table
        :headers="headers"
        :items="tableData"
        :search="search"
        :delete="deleteItem"
      />
    </v-card>
  </div>
</template>

<script>
import { MedicineService } from '@/services/medicine.service';
import { mapActions } from 'vuex';
import Loader from '@/components/Loader';
import Table from '@/components/Table';

export default {
  components: {
    Loader,
    Table,
  },
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
        { text: '', value: 'actions', sortable: false },
      ],
      tableData: [],
    };
  },
  methods: {
    ...mapActions(['handleLoad']),
    fetchData() {
      const vm = this;
      vm.handleLoad(true);

      const query = `
        {
          findAllMedicine {
            id name description dayPeriod
            doses interval
          }
        }
      `;
      MedicineService.list(query)
        .then((result) => {
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
        })
        .finally(() => vm.handleLoad(false));
    },

    deleteItem(id) {
      const vm = this;

      this.$confirm('Tem certeza que deseja remover esse item?').then((res) => {
        if (res) {
          vm.handleLoad(true);

          const query = `
              mutation {
                deleteMedicine(
                  id: "${id}"
                )
              }
            `;
          MedicineService.delete(query)
            .then((result) => {
              const index = vm.tableData.findIndex((item) => item.id == id);
              vm.tableData.splice(index, 1);
            })
            .finally(() => vm.handleLoad(false));
        }
      });
    },
  },

  mounted() {
    const vm = this;
    vm.fetchData();
  },
};
</script>

<style lang="scss">
@import '../sass/master';

.homeWrapper {
  height: calc(100vh - 70px);
  padding: 12px;

  .v-card {
    padding: 20px;
    max-height: 530px;
    overflow: scroll;
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
