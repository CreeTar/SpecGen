<template>
  <v-combobox
    :value="selectedTags"
    @input="$emit('input', $event)"
    :items="items"
    ref="list"
    chips
    label="Tags"
    multiple
    outlined
    dense
    hint="Neue Tags mit [Return] bestätigen"
    persistent-hint
    class="mb-0 pb-0"
  >
    <template v-slot:selection="{ attrs, item, select, selected }">
      <v-chip
        v-bind="attrs"
        :input-value="selected"
        close
        small
        outlined
        @click:close="removeTagFromList(item)"
      >{{ item }}</v-chip>
    </template>
  </v-combobox>
</template>

<script>
export default {
  data() {
    return {
      selectedTags: []
    };
  },
  props: ["value", "items"],
  mounted() {
    this.selectedTags = this.value;
  },
  methods: {
    removeTagFromList(item) {
      this.selectedTags.splice(this.selectedTags.indexOf(item), 1);
      this.selectedTags = [...this.selectedTags];
    }
  }
};
</script>
