<template>
  <v-col class="ma-2 pa-0 d-flex align-stretch">
    <v-card class="d-flex flex-column align-stretch">
      <v-card-title>Spezifikation</v-card-title>
      <v-card-text align="left" class="ma-0 pt-0 pa-3">
        <div id="markdown" style="height: 100vh;" class="pa-2 pt-0" v-html="html"></div>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["html"]
};
</script>