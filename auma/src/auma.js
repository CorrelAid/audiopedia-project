import * as Icons from "./icons";

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

const Survey = {
  template: `
<div class="play-bar">
  <button 
    v-if="showPlayPause" @click="playing ? pause() : play()"
  >
    <icon-pause v-if="playing"></icon-pause>
    <icon-play v-if="!playing"></icon-play>
  </button>
  <button 
    v-if="showReplayButton" @click="replay"
  >
    <icon-replay></icon-replay>
  </button>
</div>

<audio 
  ref="audio" 
  :src="currentQuestion.audioUrl"
  @ended="onTrackEnded"
></audio>

<img v-if="!!imageUrl" :src="imageUrl">
<div v-if="!imageUrl" class="img-placeholder"></div>

<div class="options">
  <template v-if="showOptions">
    <button 
      class="option" 
      @click="choose('no')" 
    >
      <icon-choice-no/>
    </button>
    <button 
      class="option" 
      @click="choose('yes')" 
    >
      <icon-choice-yes/> 
    </button>
    <button 
      class="option" 
      @click="choose('skip')" 
    >
      <icon-choice-skip/> 
    </button>
  </template>
</div>
`,
  props: {
    questions: Array,
  },
  emits: ["submit"],
  data() {
    return {
      currentQuestionIdx: 0,
      showPlayPause: false,
      showReplayButton: false,
      showOptions: false,
      playing: false,
      results: [],
      imageUrl: undefined,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIdx];
    },
  },
  mounted() {
    this.setQuestion(0);
  },
  methods: {
    play() {
      this.$refs.audio.play();
      this.playing = true;
    },
    pause() {
      this.$refs.audio.pause();
      this.playing = false;
    },
    onTrackEnded() {
      this.playing = false;
      this.showPlayPause = false;
      this.showReplayButton = true;
      this.showOptions = true;
    },
    choose(option) {
      this.showOptions = false;
      this.results.push({
        question: this.currentQuestion.id,
        option: option,
      });

      if (!this.questions[this.currentQuestionIdx + 1]) {
        this.$emit("submit", this.results);
        return;
      }

      this.setQuestion(this.currentQuestionIdx + 1);
      this.$nextTick(this.play);
    },
    replay() {
      this.$refs.audio.time = 0;
      this.showPlayPause = true;
      this.showReplayButton = false;
      this.showOptions = false;
      this.play();
    },
    setQuestion(idx) {
      this.currentQuestionIdx = idx;
      this.showPlayPause = true;
      this.showReplayButton = false;
      this.showOptions = false;

      const question = this.questions[idx];
      if (question.imageUrl) {
        this.imageUrl = question.imageUrl;
      }
    },
  },
};

const Results = {
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

function auma({ id, questions }) {
  const vue = document.createElement("script");
  vue.src = "https://unpkg.com/vue@3";

  vue.onload = () => {
    const el = document.createElement("div");
    document.body.append(el);

    const vm = Vue.createApp(App)
      .component("survey", Survey)
      .component("results", Results)
      .component("icon-play", Icons.IconPlay)
      .component("icon-pause", Icons.IconPause)
      .component("icon-replay", Icons.IconReplay)
      .component("icon-choice-yes", Icons.IconChoiceYes)
      .component("icon-choice-no", Icons.IconChoiceNo)
      .component("icon-choice-skip", Icons.IconChoiceSkip)
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
