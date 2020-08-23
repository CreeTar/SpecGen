<template>
  <div>
    <v-card class="ma-0 pa-0 mb-4">
      <v-card-title class="my-0 py-0">Tabelle
        <v-col class="text-right my-0 py-0">
          <v-btn class x-small color="success" @click="addCol" title="Spalte hinzufügen">+</v-btn>
          <v-btn class x-small color="error" @click="delCol" title="Spalte entfernen">-</v-btn>
          <v-icon>mdi-plus</v-icon>
        </v-col>
      </v-card-title>
      <v-card-text>
        <v-divider></v-divider>content
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions class="my-0 py-0">
        <v-col class="text-left my-0 py-0 pb-2">
          <v-btn
            class="ma-0 pa-0"
            x-small
            color="success"
            @click="addRow"
            title="Zeile hinzufügen"
          >+</v-btn>
          <v-btn class x-small color="error" @click="delRow" title="Zeile entfernen">-</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
    <v-row class="mx-auto">
      <v-text-field
        class="pr-1"
        type="number"
        label="Spalten"
        outlined
        dense
        min="0"
        max="5"
        v-model="countCols"
        @input="updateTable"
      />
      <v-text-field
        class="pl-1"
        type="number"
        label="Zeilen"
        outlined
        dense
        min="0"
        max="5"
        v-model="countRows"
        @input="updateTable"
      />
    </v-row>
    <v-data-table
      v-if="countCols+countRows > 0"
      :items="entries"
      :headers="captions"
      no-data-text="Keine Tabelle definiert"
      fixed-header
      disable-sort
      disable-pagination
      disable-filtering
      hide-default-footer
      dense
    >
      <template v-slot:item="{ item }">
        <v-input>{{ item }}</v-input>
      </template>
    </v-data-table>
    <v-btn @click="updateTable" dense>upd</v-btn>
  </div>
</template>
<script>
import "material-design-icons-iconfont/dist/material-design-icons.css";

import "@mdi/font/css/materialdesignicons.css";
export default {
  data() {
    return {
      countCols: "0",
      countRows: "0",
      entries: [],
      captions: []
    };
  },
  props: {},
  methods: {
    updateTable() {
      if (Number(this.countCols) + Number(this.countRows) === 1) {
        this.countCols = "1";
        this.countRows = "1";
      }
      this.entries = [];
      this.captions = [];
      for (let col = 1; col <= Number(this.countCols); col++) {
        const colName = "col" + col;
        this.captions.push({ text: colName, value: colName });
      }
      for (let row = 1; row <= Number(this.countRows); row++) {
        const rowName = "row" + row;
        let entry = {};
        for (let col = 1; col <= Number(this.countCols); col++) {
          const colName = "col" + col;
          entry[colName] = rowName;
        }
        this.entries.push(entry);
      }
    }
  }
};
</script>
