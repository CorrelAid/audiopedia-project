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
    :whatsappResults="whatsappResults" 
    :results="results"
  ></results>
</div>`,
  data() {
    return {
      view: "init",
      id: undefined,
      whatsappResults: undefined,
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
<audio 
  ref="audio" 
  :src="currentQuestion.audioUrl"
  @timeupdate="tick"
  @ended="ended"
></audio>

<div class="play-bar">
  <button 
    v-if="showPlayPause" @click="playing ? pause() : play()"
  >{{ playing ? 'pause' : 'play' }}</button>
</div>

<img v-if="imageUrl !== undefined" :src="imageUrl">
<div v-if="imageUrl == undefined" class="img-placeholder"></div>

<div class="options">
  <button 
    class="option" 
    v-for="option of options" 
    @click="choose(option)" 
    :key="currentQuestion.id + option.id"
  >{{ option.id }}</button>
</div>
</template>

<pre>{{ JSON.stringify({playing, time}, null, 2) }}</pre>
<pre>{{ JSON.stringify({results}, null, 2) }}</pre>
`,
  props: {
    questions: Array,
  },
  emits: ["submit"],
  data() {
    return {
      currentQuestionIdx: -1,
      showPlayPause: false,
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
      }

      this.showPlayPause = true;
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
  },
};

const Results = {
  template: `
<a :href="sendResultsURL" target="_blank">Send your results</a>
<pre>{{ JSON.stringify({results}, null, 2) }}</pre>
`,
  props: {
    id: String,
    whatsappResults: String,
    results: Array,
  },
  mounted() {
    // "proxy to object"
    const results = JSON.parse(JSON.stringify(this.results));
    console.log(results);
  },
  computed: {
    sendResultsURL() {
      const phoneNumber = this.whatsappResults;
      const text = encodeURIComponent(
        JSON.stringify({ id: this.id, results: this.results })
      );
      return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${text}`;
    },
  },
};

function auma({ id, whatsappResults, questions }) {
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
    vm.whatsappResults = whatsappResults;
    vm.start();
  };

  document.head.append(vue);
}

window.auma = auma;
