import { Audio } from "./audio";

import "./results.css";

const IconSendResults = {
  template: `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="24" fill="#ddd"/>
  <path 
    d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"
    fill="#000" transform="translate(10, 12)"/>
</svg>`,
};

export const Results = {
  components: {
    "app-audio": Audio,
    "icon-send-results": IconSendResults,
  },
  template: `
<div class="results">
  <app-audio :url="audioUrl" @ended="audioEnded = true"/>
  <a 
    :href="sendResultsUrl" target="_blank" class="results__send" 
    :style="{marginTop: audioEnded ? '6rem' : '0', width: audioEnded ? '240px' : '0'}">
    <icon-send-results/>
  </a>
</div>`,
  props: {
    config: Object,
    results: Array,
  },
  data() {
    return { audioEnded: false };
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
