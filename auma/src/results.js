import { Audio } from "./audio";

import "./results.css";

export const Results = {
  components: {
    "app-audio": Audio,
  },
  template: `
<div class="results">
  <app-audio :url="audioUrl"/>
  <a :href="sendResultsUrl" target="_blank" style="margin-top: 4rem;">Send your results</a>
</div>`,
  props: {
    config: Object,
    results: Array,
  },
  mounted() {
    if (this.results.length != this.config.questions.length) {
      throw new Error("results and questions have different length");
    }
  },
  computed: {
    numberYes() {
      return this.results.filter((r) => r.option === "yes").length;
    },
    audioUrl() {
      for (let i = 0; i < this.config.results.length; i++) {
        if (
          this.numberYes >= this.config.results[i].from &&
          this.numberYes <= this.config.results[i].to
        ) {
          return this.config.results[i].audioUrl;
        }
      }
      throw new Error("could not find results audio");
    },
    sendResultsUrl() {
      const text = encodeURIComponent(`
My survey score (${this.config.id}): 
${this.numberYes}/${this.results.length}
`);
      return `https://api.whatsapp.com/send?phone=${this.config.sendResultsTo}&text=${text}`;
    },
  },
};
