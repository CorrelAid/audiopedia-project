auma({
  id: "srq-10",
  welcome: {
    audioUrl: "/mp3/welcome.mp3",
  },
  questions: [
    {
      id: "slept-badly",
      audioUrl: "/mp3/slept-badly.mp3",
    },
    {
      id: "crying-more",
      audioUrl: "/mp3/crying-more.mp3",
    },
    {
      id: "not-enjoying-daily-activities",
      audioUrl: "/mp3/not-enjoying-daily-activities.mp3",
    },
    {
      id: "hard-to-make-decisions",
      audioUrl: "/mp3/hard-to-make-decisions.mp3",
    },
    {
      id: "daily-life-suffering",
      audioUrl: "/mp3/daily-life-suffering.mp3",
    },
    {
      id: "playing-a-useful-part",
      audioUrl: "/mp3/playing-a-useful-part.mp3",
    },
    {
      id: "ending-life",
      audioUrl: "/mp3/ending-life.mp3",
    },
    {
      id: "feeling-tired",
      audioUrl: "/mp3/feeling-tired.mp3",
    },
    {
      id: "having-headaches",
      audioUrl: "/mp3/having-headaches.mp3",
    },
    {
      id: "poor-digestion",
      audioUrl: "/mp3/poor-digestion.mp3",
    },
  ],
  results: [
    {
      from: 0,
      to: 3,
      audioUrl: "/mp3/result_0-3.mp3",
    },
    {
      from: 4,
      to: 6,
      audioUrl: "/mp3/result_4-6.mp3",
    },
    {
      from: 7,
      to: 10,
      audioUrl: "/mp3/result_7-10.mp3",
    },
  ],
  trackFn: function (event, extraData = {}) {
    console.log({ event, extraData });
    // window.splitbee.track(event, extraData);
  },
});
