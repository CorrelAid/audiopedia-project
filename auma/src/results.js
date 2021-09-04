export const Results = {
  template: `
  <p>Your score is {{ score }}</p>
  <a :href="sendResultsURL" target="_blank">Send your results</a>
  <pre>{{ JSON.stringify({results}, null, 2) }}</pre>
  `,
  props: {
    id: String,
    sendResultsTo: String,
    results: Array,
  },
  computed: {
    score() {
      return `${this.results.filter((r) => r.option === "yes").length}/${
        this.results.length
      }`;
    },
    sendResultsURL() {
      const text = JSON.stringify({ id: this.id, score: this.score }, null, 2);
      return `https://api.whatsapp.com/send?phone=${
        this.sendResultsTo
      }&text=${encodeURIComponent(text)}`;
    },
  },
};
