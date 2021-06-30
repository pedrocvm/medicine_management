<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :search="search"
    fixed-header
    height="64vh"
    color="#146A48"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)" aria-label='edit button'>
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)" aria-label="delete button">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from 'vuex';

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
