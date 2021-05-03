<template>
  <div class="registerWrapper">
    <v-card>
      <v-form :model="medicine" :rules="!id ? rules : {}" ref="medicine">
        <v-row>
          <v-col>
            <v-text-field
              prop="name"
              required
              v-model="medicine.name"
              outlined
              label="Nome"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select
              prop="dayPeriod"
              required
              v-model="medicine.dayPeriod"
              label="Período"
              outlined
              :items="dayPeriods"
              :item-text="'label'"
              :item-value="'value'"
              hide-details
            >
            </v-select>
          </v-col>

          <v-col>
            <v-text-field
              v-if="!uniqueDose"
              hide-details
              prop="doses"
              v-model="medicine.doses"
              type="number"
              outlined
              label="Dosagem"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-checkbox
              v-model="uniqueDose"
              label="Dose Única"
              @change="handleUniqueDose()"
            ></v-checkbox>
          </v-col>

          <v-col v-if="!uniqueDose">
            <v-text-field
              required
              prop="interval"
              v-model="medicine.interval"
              type="number"
              outlined
              label="Intervalo"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea
              required
              prop="description"
              v-model="medicine.description"
              outlined
              label="Descrição"
              hide-details
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="actionWrapper">
            <v-btn
              color="primary"
              elevation="2"
              @click="submit()"
              :disabled="isDisabled()"
              >Enviar</v-btn
            >
            <v-btn color="warning" elevation="2" @click="clear()">Limpar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { MedicineService } from '@/services/medicine.service';
import Loader from '@/components/Loader';

export default {
  components: {
    Loader,
  },
  data() {
    return {
      id: '',
      dayPeriods: [
        {
          label: 'Manhã',
          value: 'MORNING',
        },
        {
          label: 'Tarde',
          value: 'AFTERNOON',
        },
        {
          label: 'Noite',
          value: 'NIGHT',
        },
      ],
      uniqueDose: false,

      rules: {
        name: [
          {
            required: true,
            message: 'Nome Obrigatorio',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: 'Descrição Obrigatoria',
            trigger: 'blur',
          },
        ],
        dayPeriod: [
          {
            required: true,
            message: 'Período do Dia Obrigatorio',
            trigger: 'blur',
          },
        ],
        interval: [
          {
            required: true,
            message: 'Intervalo Obrigatorio',
            trigger: 'blur',
          },
        ],
        doses: [
          {
            required: true,
            message: 'Quantidade de Doses Obrigatoria',
            trigger: 'blur',
          },
        ],
      },

      medicine: {
        name: '',
        description: '',
        dayPeriod: '',
        interval: '',
        doses: '',
      },
    };
  },

  methods: {
    ...mapActions(['handleLoad']),
    submit() {
      const vm = this;
      vm.handleLoad(true);

      if (vm.uniqueDose) {
        vm.medicine.doses = 1;
        vm.medicine.interval = 24;
      }

      vm.medicine.interval = +vm.medicine.interval;
      vm.medicine.doses = +vm.medicine.doses;

      const { name, description, dayPeriod, interval, doses } = vm.medicine;

      const mutation = `
        mutation {
          createMedicine(
            data: {
              name: "${name}",
              description: "${description}",
              dayPeriod: ${dayPeriod},
              interval: ${interval},
              doses: ${doses}
            }
          ){
            id name description dayPeriod
            doses interval
          }
        }`;

      MedicineService.post(mutation).then((response) => {
        if (response) {
          setTimeout(() => {
            vm.handleLoad(false);

            setTimeout(() => {
              vm.$router.replace({ name: 'Home' });
            }, 1000);
          }, 1000);
        }
      });

      console.log(vm.medicine);
    },

    clear() {
      const vm = this;
      vm.$refs.medicine.reset();
    },

    isDisabled() {
      const vm = this;

      const { name, description, dayPeriod, interval, doses } = vm.medicine;
      if (!name || !description || !dayPeriod || !interval || !doses) {
        return true;
      }
    },

    handleUniqueDose() {
      const vm = this;

      if (vm.uniqueDose) {
        vm.medicine.interval = 24;
        vm.medicine.doses = 1;
      } else {
        vm.medicine.interval = '';
        vm.medicine.doses = '';
      }
    },
  },

  created() {
    // const query = `
    //   {
    //     findAllMedicine {
    //       id name description dayPeriod
    //       doses interval
    //     }
    //   }
    // `;
    // MedicineService.list(query).then((result) => {
    //   console.log(result);
    // });
  },
};
</script>

<style lang="scss">
@import '../sass/master';

.registerWrapper {
  height: calc(100vh - 70px);
  padding: 30px;

  .v-card {
    padding: 30px;
  }

  .actionWrapper {
    @include flexbox(row, center, center);
    gap: 30px;
  }

  .infoBtn {
    i {
      color: $black;
    }
  }

  .actionWrapper {
    & button:first-child {
      background-color: lighten($primary, 10) !important;
    }

    & button:last-child {
      background-color: lighten($red, 10) !important;
    }
  }
}
</style>
