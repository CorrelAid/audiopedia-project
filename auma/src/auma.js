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

let surveyControls;

const Survey = {
  template: `
<template v-if="currentQuestion">

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
  @timeupdate="tick"
  @ended="ended"
></audio>

<img v-if="!!imageUrl" :src="imageUrl">
<div v-if="!imageUrl" class="img-placeholder"></div>

<div class="options">
  <button 
    class="option" 
    v-for="option of options" 
    @click="choose(option)" 
    :key="currentQuestion.id + option.id"
  >
    <component :is="'icon-choice-' + option.icon"></component>
  </button>
</div>
</template>
`,
  props: {
    questions: Array,
  },
  emits: ["submit"],
  data() {
    return {
      currentQuestionIdx: -1,
      showPlayPause: false,
      showReplayButton: false,
      playing: false,
      time: 0,
      imageUrl: undefined,
      options: [],
      results: [],
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIdx];
    },
  },
  mounted() {
    surveyControls = {
      play: this.play,
      pause: this.pause,
      setImageUrl: this.setImageUrl,
      clearImageUrl: this.clearImageUrl,
      setQuestion: this.setQuestion,
      setQuestionAndPlay: this.setQuestionAndPlay,
      setOptions: this.setOptions,
      submit: this.submit,
    };
    this.setQuestion(0);
  },
  methods: {
    tick() {
      const time = this.$refs.audio.currentTime;
      for (let i = Math.ceil(this.time); i <= Math.floor(time); i++) {
        const callback = (this.currentQuestion.callbacks || {})[i];
        if (callback) {
          callback(surveyControls);
        }
      }
      this.time = time;
    },
    ended() {
      this.showPlayPause = false;
      this.showReplayButton = true;
      this.playing = false;
      const callback = (this.currentQuestion.callbacks || {}).END;
      if (callback) {
        callback(surveyControls);
      }
    },
    play() {
      this.$refs.audio.play();
      this.playing = true;
    },
    pause() {
      this.$refs.audio.pause();
      this.playing = false;
    },
    setImageUrl(url) {
      this.imageUrl = url;
    },
    clearImageUrl() {
      this.imageUrl = undefined;
    },
    setQuestion(idOrIdx) {
      if (typeof idOrIdx == "string") {
        this.currentQuestionIdx = this.questions
          .map((q) => q.id)
          .indexOf(idOrIdx);
      } else {
        this.currentQuestionIdx = idOrIdx;
      }

      const question = this.questions[this.currentQuestionIdx];
      if (question.imageUrl) {
        this.imageUrl = question.imageUrl;
      } else {
        this.imageUrl = undefined;
      }

      this.showPlayPause = true;
      this.showReplayButton = false;
      this.playing = false;
      this.time = 0;
    },
    setQuestionAndPlay(idOrIdx) {
      this.setQuestion(idOrIdx);
      this.$nextTick(this.play);
    },
    setOptions(options) {
      this.options = options;
      this.pause();
      this.showPlayPause = false;
    },
    choose(option) {
      this.options = [];
      this.results.push({
        question: this.currentQuestion.id,
        option: option.id,
      });
      option.callback(surveyControls);
    },
    submit() {
      this.$emit("submit", this.results);
    },
    replay() {
      this.options = [];
      this.setQuestionAndPlay(this.currentQuestionIdx);
    },
  },
};

const Results = {
  template: `
<a :href="sendResultsURL" target="_blank">Send your results</a>
<pre>{{ JSON.stringify({results}, null, 2) }}</pre>
`,
  props: {
    id: String,
    sendResultsTo: String,
    results: Array,
  },
  mounted() {
    // "proxy to object"
    const results = JSON.parse(JSON.stringify(this.results));
    console.log(results);
  },
  computed: {
    sendResultsURL() {
      const text = JSON.stringify(
        { id: this.id, results: this.results },
        null,
        2
      );
      return `https://api.whatsapp.com/send?phone=${
        this.sendResultsTo
      }&text=${encodeURIComponent(text)}`;
    },
  },
};

function auma({ id, questions, sendResultsTo }) {
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
      .mount(el);

    vm.id = id;
    vm.questions = questions;
    vm.sendResultsTo =
      new URLSearchParams(window.location.search).get("sendResultsTo") ||
      sendResultsTo;
    if (!vm.sendResultsTo) {
      throw new Error(
        "missing sendResultsTo parameter - please provide this via the survey config or query parameter"
      );
    }
    vm.start();
  };

  document.head.append(vue);
}

window.auma = auma;
