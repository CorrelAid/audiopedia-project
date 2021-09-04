import { Survey } from "./survey";
import { Results } from "./results";

import "./auma.css";

const App = {
  template: `
<div class="auma">
  <survey 
    v-if="view == 'survey'" 
    :questions="questions" 
    @submit="handleSurveySubmit"
  ></survey>
  <results 
    v-if="view == 'results'" 
    :id="id"
    :sendResultsTo="sendResultsTo" 
    :results="results"
  ></results>
</div>`,
  data() {
    return {
      view: "init",
      id: undefined,
      sendResultsTo: undefined,
      questions: [],
      results: [],
    };
  },
  methods: {
    start() {
      this.view = "survey";
    },
    handleSurveySubmit(results) {
      this.results = results;
      this.view = "results";
    },
  },
};

function auma({ id, questions }) {
  const vue = document.createElement("script");
  vue.src = "https://unpkg.com/vue@3";

  vue.onload = () => {
    const el = document.createElement("div");
    document.body.append(el);

    const vm = Vue.createApp(App)
      .component("survey", Survey)
      .component("results", Results)
      .mount(el);

    vm.id = id;
    vm.questions = questions;

    vm.sendResultsTo = new URLSearchParams(window.location.search).get(
      "sendResultsTo"
    );
    if (!vm.sendResultsTo) {
      alert(
        "missing sendResultsTo parameter - please provide this via the query parameter"
      );
    }

    vm.start();
  };

  document.head.append(vue);
}

window.auma = auma;
