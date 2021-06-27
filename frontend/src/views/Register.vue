<template>
  <v-container class="registerWrapper">
    <v-card>
      <v-form :model="medicine" :rules="!id ? rules : {}" ref="medicine">
        <v-row>
          <v-col>
            <v-text-field
              dense
              prop="name"
              required
              v-model="medicine.name"
              outlined
              label="Nome"
              hide-details
              color="#146A48"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select
              dense
              prop="dayPeriod"
              required
              v-model="medicine.dayPeriod"
              label="Período"
              outlined
              :items="dayPeriods"
              :item-text="'label'"
              :item-value="'value'"
              hide-details
              color="#146A48"
            >
            </v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-if="!uniqueDose">
            <v-text-field
              dense
              hide-details
              color="#146A48"
              prop="doses"
              v-model="medicine.doses"
              type="number"
              outlined
              label="Dosagem"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-checkbox
            hide-details
            color="#146A48"
            v-model="uniqueDose"
            label="Dose Única"
            style="margin: 10px"
            @change="handleUniqueDose()"
          ></v-checkbox>
        </v-row>

        <v-row>
          <v-col v-if="!uniqueDose">
            <v-text-field
              dense
              required
              prop="interval"
              v-model="medicine.interval"
              type="number"
              outlined
              label="Intervalo"
              hide-details
              color="#146A48"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea
              dense
              rows="3"
              no-resize
              required
              prop="description"
              v-model="medicine.description"
              outlined
              label="Descrição"
              hide-details
              color="#146A48"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="actionWrapper">
            <v-btn
              color="primary"
              elevation="2"
              aria-label="action button"
              @click="id ? update() : submit()"
              :disabled="isDisabled()"
              >{{ this.id ? 'Atualizar' : 'Enviar' }}</v-btn
            >
            <v-btn color="warning" elevation="2" @click="clear()">Limpar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import { MedicineService } from '@/services/medicine.service';

export default {
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
    get() {
      const vm = this;
      vm.handleLoad(true);

      const query = `
        {
          findMedicine(
            id: "${vm.id}"
          ) {
            id name description dayPeriod
            doses interval
          }
        }
      `;

      MedicineService.get(query)
        .then((res) => {
          vm.medicine = res;
          if (vm.medicine.doses == 1 && vm.medicine.interval == 24) {
            vm.uniqueDose = true;
          }
        })
        .finally(() => vm.handleLoad(false));
    },

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
            });
          }, 1000);
        }
      });
    },

    update() {
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
          updateMedicine(
            id: "${vm.id}"
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

      MedicineService.update(mutation).then((response) => {
        if (response) {
          setTimeout(() => {
            vm.handleLoad(false);

            setTimeout(() => {
              vm.$router.replace({ name: 'Home' });
            });
          }, 1000);
        }
      });
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
  mounted() {
    const vm = this;
    vm.id = vm.$route.params.id;
    if (vm.id) {
      vm.get();
    }
  },
};
</script>

<style lang="scss">
@import '../sass/master';

.registerWrapper {
  padding: 30px;

  .v-card {
    padding: 20px;
    max-height: 530px;
    overflow: scroll;
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
