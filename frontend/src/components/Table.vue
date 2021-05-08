<template>
  <v-data-table :headers="headers" :items="items" :search="search">
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from 'vuex';
import { MedicineService } from '@/services/medicine.service';

export default {
  props: ['headers', 'items', 'search', 'delete'],

  data() {
    return {
      dialogDelete: true,
    };
  },

  methods: {
    ...mapActions(['handleLoad']),
    editItem(item) {
      const vm = this;

      vm.$router.push({ name: 'EditRegister', params: { id: item.id } });
    },

    deleteItem({ id }) {
      this.delete(id);
    },
  },
};
</script>

<style></style>
