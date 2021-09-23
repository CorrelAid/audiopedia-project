import { Audio } from "./audio";

import "./survey.css";

const IconChoiceYes = {
  template: `
<svg xmlns="http://www.w3.org/2000/svg" width="64" viewBox="0 0 24 24">
  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
</svg>`,
};

const IconChoiceNo = {
  template: `
<svg xmlns="http://www.w3.org/2000/svg" width="64" viewBox="0 0 24 24">
  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
</svg>`,
};

const IconChoiceSkip = {
  template: `
<svg xmlns="http://www.w3.org/2000/svg" width="32" viewBox="0 0 24 24">
  <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
</svg>`,
};

export const Survey = {
  components: {
    "icon-choice-yes": IconChoiceYes,
    "icon-choice-no": IconChoiceNo,
    "icon-choice-skip": IconChoiceSkip,
    "app-audio": Audio,
    
  },
  template: `
<div class="survey">

  <p>{{ currentQuestionIdx} of {questions.length}}</p>

  <app-audio 
    ref="audio"
    :url="currentQuestion.audioUrl" 
    @ready="onAudioReady"
    @ended="onAudioEnded" 
    @replay="onAudioReplay"/>
  

  <div class="survey__options" :class="{disabled: optionsDisabled}">
    <button 
      class="survey__options-button" 
      @click="choose('no')" 
      :disabled="optionsDisabled"
    >
      <icon-choice-no/>
    </button>
    <button 
      class="survey__options-button" 
      @click="choose('yes')" 
      :disabled="optionsDisabled"
    >
      <icon-choice-yes/> 
    </button>
  </div>

  <div class="survey__options" :class="{disabled: optionsDisabled}">
    <button 
      class="survey__options-button" 
      @click="choose('skip')" 
      :disabled="optionsDisabled"
    >
      <icon-choice-skip/> 
    </button>
  </div>
</div>
  `,
  props: {
    questions: Array,
  },
  emits: ["submit"],
  data() {
    return {
      currentQuestionIdx: 0,
      optionsDisabled: true,
      results: [],
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIdx];
    },
  },
  methods: {
    choose(option) {
      this.optionsDisabled = true;
      this.results.push({
        question: this.currentQuestion.id,
        option: option,
      });

      if (!this.questions[this.currentQuestionIdx + 1]) {
        this.$emit("submit", this.results);
        return;
      }

      this.setQuestion(this.currentQuestionIdx + 1);
    },
    onAudioReady() {
      if (this.currentQuestionIdx > 0) {
        this.$refs.audio.play();
      }
    },
    onAudioEnded() {
      this.optionsDisabled = false;
    },
    onAudioReplay() {
      this.optionsDisabled = true;
    },
    setQuestion(idx) {
      this.currentQuestionIdx = idx;
      this.optionsDisabled = true;
    },
  },
};
