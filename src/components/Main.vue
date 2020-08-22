<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container class="pa-0 ma-5">
          <v-row v-if="isLoading">
            <v-progress-linear
              height="50px"
              indeterminate
              :isLoading="isLoading"
            >Lade Bahnhofsdaten...</v-progress-linear>
          </v-row>
          <v-row v-else>
            <v-col class="ma-2 pa-0">
              <v-card class="mb-4">
                <v-expansion-panels :value="0" hover class="px-0 mx-0 mb-0 pb-0">
                  <v-expansion-panel class="px-0 mx-0 my-0 py-0">
                    <v-expansion-panel-header
                      ripple
                      class="my-0 py-0"
                      style="font-size: 15pt; min-height: 55px"
                    >Spezifikation</v-expansion-panel-header>
                    <v-expansion-panel-content class="ma-0 pa-0">
                      <v-divider class="mb-2 pa-0"></v-divider>
                      <v-card-text class="px-0 mx-0 mb-0 pb-0">
                        <v-text-field
                          v-model="specName"
                          required
                          dense
                          label="Name der Spezifikation"
                          @input="updateMarkdown"
                          outlined
                        />
                        <v-text-field
                          v-model="specComment"
                          required
                          dense
                          label="Kommentar"
                          @input="updateMarkdown"
                          outlined
                        />
                        <TagBox
                          v-model="specTagsSelected"
                          :items="specTags"
                          @input="updateMarkdown"
                        />
                      </v-card-text>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
              <v-card class="mb-4">
                <v-expansion-panels :value="0" hover class="px-0 mx-0">
                  <v-expansion-panel class="px-0 mx-0 my-0 py-0">
                    <v-expansion-panel-header
                      ripple
                      class="my-0 py-0"
                      style="font-size: 15pt; min-height: 55px"
                    >1. Szenario</v-expansion-panel-header>
                    <v-expansion-panel-content class="ma-0 pa-0">
                      <v-divider class="mb-2 pa-0"></v-divider>
                      <v-card-text class="px-0 mx-0 mb-0 pb-0">
                        <v-text-field
                          v-model="scenName"
                          required
                          dense
                          label="Name des 1. Szenarios"
                          @input="updateMarkdown"
                          outlined
                        />
                        <TagBox
                          v-model="scenTagsSelected"
                          :items="scenTags"
                          @input="updateMarkdown"
                        />
                        <v-text-field
                          v-model="scenComment"
                          required
                          dense
                          label="Beschreibung"
                          @input="updateMarkdown"
                          outlined
                        />
                        <BhfBox label="Abgangsbahnhof" v-model="scenAbgBhf" :items="bhfList"/>
                      </v-card-text>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
            </v-col>
            <MarkdownCard :html="compiledMarkdown"/>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template> 

<script>
import TagBox from "./TagBox";
import BhfBox from "./BhfBox";
import MarkdownCard from "./MarkdownCard";
import marked from "marked";

export default {
  name: "Main",
  components: {
    TagBox,
    BhfBox,
    MarkdownCard
  },
  data() {
    return {
      bhfList: [],
      compileMarkdown: false,
      markdown: "",
      isLoading: true,
      specName: "Sparpreise",
      specComment: "Test von SPEU und SPDEU",
      specTags: ["PEP", "WSD"],
      specTagsSelected: ["PEP"],
      scenName: "Sparpreis Deutschland",
      scenComment: "Fahrt in Deutschland mit Sparpreis",
      scenAbgBhf: "",
      scenTags: ["PEP", "WSD"],
      scenTagsSelected: []
    };
  },
  async mounted() {
    this.updateMarkdown();
    this.bhfList = await this.getBhfList();
    this.isLoading = false;
  },
  watch: {
    specTagsSelected: function(newSet, oldSet) {
      this.updateMarkdown();
    }
  },
  computed: {
    compiledMarkdown() {
      let html = this.compileMarkdown
        ? marked(this.markdown, {})
        : this.markdown.replace(/\n/g, "<br/>");

      if (html.length === 0) {
        html = "-";
      }
      return html;
    }
  },
  methods: {
    // update: _.debounce(compiledMarkdown, 300)
    updateMarkdown() {
      this.markdown = this.createMarkdown();
    },
    createMarkdown() {
      let markdown = [];
      markdown.push(this.getSpecName());
      markdown.push(this.getSpecTags());
      markdown.push(this.getSpecComment());
      markdown.push(this.getScenName());
      markdown.push(this.getScenTags());
      markdown.push(this.getScenComment());
      markdown.push(this.getScenBhfe());

      console.log(markdown);
      const markdownWithoutEmptyVals = markdown.filter(e => e);
      return markdownWithoutEmptyVals.join("\n");
    },
    getSpecName() {
      return this.specName ? "# " + this.specName : "";
    },
    getSpecTags() {
      if (this.specTagsSelected.length > 0) {
        return "Tags: " + this.specTagsSelected.join(", ");
      } else {
        return "";
      }
    },
    getSpecComment() {
      return this.specComment;
    },
    getScenName() {
      return this.scenName ? "## " + this.scenName : "";
    },
    getScenTags() {
      if (this.scenTagsSelected.length > 0) {
        return "Tags: " + this.scenTagsSelected.join(", ");
      } else {
        return "";
      }
    },
    getScenComment() {
      return this.scenComment;
    },
    getScenBhfe() {
      return "";
    },
    async getBhfList() {
      await this.sleep(2000);
      return [
        { eva: "8000001", name: "Aachen Hbf", verbund: "AVV" },
        { eva: "8000105", name: "Frankfurt(Main)Hbf", verbund: "RMV" },
        { eva: "8000314", name: "Reutlingen Hbf", verbund: "NAL" },
        { eva: "8000191", name: "Karlsruhe Hbf", verbund: "KVV" },
        { eva: "8000261", name: "München Hbf", verbund: "MVV" },
        { eva: "8000141", name: "Tübingen Hbf", verbund: "NAL" }
      ];
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
};
</script>

<style>
input,
.v-select * {
  font-size: 10pt;
}

#markdown {
  background-color: #f5f5f5;
  line-height: 25pt;
}
</style>
