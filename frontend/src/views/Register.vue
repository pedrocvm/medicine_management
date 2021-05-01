<template>
  <div class="registerWrapper">
    <v-card>
      <v-form>
        <v-row>
          <v-col>
            <v-text-field
              placeholder="Nome do medicamento"
              outlined
              label="Nome"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              placeholder="Quantidade ao dia "
              outlined
              label="Posologia"
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select
              label="Período"
              outlined
              hide-details="auto"
              :items="dayPeriods"
              :item-text="'label'"
              :item-value="'value'"
            >
            </v-select>
          </v-col>

          <v-col>
            <v-text-field
              outlined
              label="Dosagem"
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-checkbox v-model="uniqueDose" label="Dose Única"></v-checkbox>
          </v-col>

          <v-col v-if="!uniqueDose">
            <v-text-field
              outlined
              label="Intervalo"
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row> </v-row>
        <v-row>
          <v-col>
            <v-textarea outlined label="Descrição"></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="actionWrapper">
            <v-btn color="primary" elevation="2">Enviar</v-btn>
            <v-btn color="warning" elevation="2">Limpar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { MedicineService } from '@/services/medicine.service';

export default {
  data() {
    return {
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
    };
  },

  created() {
    const query = `
      {
        findAllMedicine {
          id name description dayPeriod
          doses interval
        }
      }
    `;

    MedicineService.list(query).then((result) => {
      console.log(result);
    });
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
      color: black;
    }
  }
}
</style>
