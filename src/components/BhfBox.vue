<template>
  <v-autocomplete
    :items="items"
    :label="label"
    item-text="name"
    return-object
    no-data-text="Keinen passenden Bahnhof gefunden"
    clearable
    dense
    disable-lookup
    disable-keyb
    :filter="filterList"
    persistent-hint
    outlined
    hint="Mehrere Suchbegriffe mit + (z.B. RMV+Frank)"
  >
    <template v-slot:selection="{ attr, on, item, selected }">
      <span style="font-size: 10pt;" v-text="item.name + ' (' + item.eva + ')'"></span>
    </template>
    <template v-slot:item="{ item }">
      <v-list-item-avatar size="30" color="indigo" class="headline font-weight-light white--text">
        <span style="font-size: 8pt;">{{ item.verbund }}</span>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="item.name"></v-list-item-title>
        <v-list-item-subtitle v-text="item.eva"></v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    label: String,
    key: String,
    items: Array
  },
  methods: {
    filterList(item, needle, itemText) {
      const haystack = item.name + item.verbund + item.eva.toString();
      const needles = needle.split("+");
      let match = true;
      needles.forEach(findme => {
        match &= haystack.indexOf(findme) > -1;
      });
      return match;
    }
  }
};
</script>