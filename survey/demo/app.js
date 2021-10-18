survey({
  id: "Audiopedia-CorrelAid",
  welcome: {
    audioUrl: "/mp3/01.mp3",
  },
  questions: [
    {
      id: "slept-badly",
      audioUrl: "/mp3/02.mp3",
    },
    {
      id: "crying-more",
      audioUrl: "/mp3/03.mp3",
    },
    {
      id: "not-enjoying-daily-activities",
      audioUrl: "/mp3/04.mp3",
    },
    {
      id: "hard-to-make-decisions",
      audioUrl: "/mp3/05.mp3",
    },
    {
      id: "daily-life-suffering",
      audioUrl: "/mp3/06.mp3",
    },
    {
      id: "playing-a-useful-part",
      audioUrl: "/mp3/07.mp3",
    },
    {
      id: "ending-life",
      audioUrl: "/mp3/08.mp3",
    },
    {
      id: "feeling-tired",
      audioUrl: "/mp3/09.mp3",
    },
    {
      id: "having-headaches",
      audioUrl: "/mp3/10.mp3",
    },
    {
      id: "poor-digestion",
      audioUrl: "/mp3/11.mp3",
    },
  ],
  results: [
    {
      from: 0,
      to: 3,
      audioUrl: "/mp3/12.mp3",
    },
    {
      from: 4,
      to: 6,
      audioUrl: "/mp3/13.mp3",
    },
    {
      from: 7,
      to: 10,
      audioUrl: "/mp3/14.mp3",
    },
  ],
  trackFn: function (event, extraData = {}) {
    console.log({ event, extraData });
    window.splitbee.track(event, extraData);
  },
});
