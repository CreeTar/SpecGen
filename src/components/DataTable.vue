<template>
  <v-container class="ma-5">
    <v-data-table
      :id="tableId"
      dense
      hide-default-footer
      disable-pagination
      v-bind:headers="tableHeaders"
      :items="tableSeries"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
    <v-btn class="mt-5" @click="fakeError">fake Error</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tableId: null
    };
  },
  mounted() {
    this.tableId = "tbl" + this._uid;
  },
  components: {},
  props: {
    values: Object
  },
  computed: {
    tableHeaders() {
      const keys = [
        ...new Set(this.values.map(value => Object.keys(value)).flat())
      ];
      const headers = keys.map(key => {
        return {
          text: key,
          align: "start",
          sortable: true,
          value: key
        };
      });
      return headers;
    },
    tableSeries() {
      return this.values;
    }
  },
  methods: {
    fakeError() {
      const msg = "Err: " + Math.random();
      const lvl = "info";
      this.$store.commit("showError", { msg, lvl });
    }
  }
};
</script>
