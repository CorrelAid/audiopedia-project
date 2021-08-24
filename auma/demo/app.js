auma({
  id: "srq-10",
  questions: [
    {
      id: "slept-badly",
      audioUrl: "/mp3/slept-badly.mp3",
      callbacks: {
        END: (controls) =>
          controls.setOptions([
            {
              id: "no",
              icon: "no",
              callback: (controls) =>
                controls.setQuestionAndPlay("crying-more"),
            },
            {
              id: "yes",
              icon: "yes",
              callback: (controls) =>
                controls.setQuestionAndPlay("crying-more"),
            },
          ]),
      },
    },
    {
      id: "crying-more",
      audioUrl: "/mp3/crying-more.mp3",
      callbacks: {
        END: (controls) =>
          controls.setOptions([
            {
              id: "no",
              icon: "no",
              callback: (controls) =>
                controls.setQuestionAndPlay("not-enjoying-daily-activities"),
            },
            {
              id: "yes",
              icon: "yes",
              callback: (controls) =>
                controls.setQuestionAndPlay("not-enjoying-daily-activities"),
            },
          ]),
      },
    },
    {
      id: "not-enjoying-daily-activities",
      audioUrl: "/mp3/not-enjoying-daily-activities.mp3",
      callbacks: {
        END: (controls) =>
          controls.setOptions([
            {
              id: "no",
              icon: "no",
              callback: (controls) =>
                controls.setQuestionAndPlay("hard-to-make-decisions"),
            },
            {
              id: "yes",
              icon: "yes",
              callback: (controls) =>
                controls.setQuestionAndPlay("hard-to-make-decisions"),
            },
          ]),
      },
    },
    {
      id: "hard-to-make-decisions",
      audioUrl: "/mp3/hard-to-make-decisions.mp3",
      callbacks: {
        END: (controls) =>
          controls.setOptions([
            {
              id: "no",
              icon: "no",
              callback: (controls) =>
                controls.setQuestionAndPlay("daily-life-suffering"),
            },
            {
              id: "yes",
              icon: "yes",
              callback: (controls) =>
                controls.setQuestionAndPlay("daily-life-suffering"),
            },
          ]),
      },
    },
    {
      id: "daily-life-suffering",
      audioUrl: "/mp3/daily-life-suffering.mp3",
      callbacks: {
        END: (controls) =>
          controls.setOptions([
            {
              id: "no",
              icon: "no",
              callback: (controls) =>
                controls.setQuestionAndPlay("playing-a-useful-part"),
            },
            {
              id: "yes",
              icon: "yes",
              callback: (controls) =>
                controls.setQuestionAndPlay("playing-a-useful-part"),
            },
          ]),
      },
    },
    {
      id: "playing-a-useful-part",
      audioUrl: "/mp3/playing-a-useful-part.mp3",
      callbacks: {
        END: (controls) =>
          controls.setOptions([
            {
              id: "no",
              icon: "no",
              callback: (controls) =>
                controls.setQuestionAndPlay("ending-life"),
            },
            {
              id: "yes",
              icon: "yes",
              callback: (controls) =>
                controls.setQuestionAndPlay("ending-life"),
            },
          ]),
      },
    },
    {
      id: "ending-life",
      audioUrl: "/mp3/ending-life.mp3",
      callbacks: {
        END: (controls) =>
          controls.setOptions([
            {
              id: "no",
              icon: "no",
              callback: (controls) =>
                controls.setQuestionAndPlay("feeling-tired"),
            },
            {
              id: "yes",
              icon: "yes",
              callback: (controls) =>
                controls.setQuestionAndPlay("feeling-tired"),
            },
          ]),
      },
    },
    {
      id: "feeling-tired",
      audioUrl: "/mp3/feeling-tired.mp3",
      callbacks: {
        END: (controls) =>
          controls.setOptions([
            {
              id: "no",
              icon: "no",
              callback: (controls) =>
                controls.setQuestionAndPlay("having-headaches"),
            },
            {
              id: "yes",
              icon: "yes",
              callback: (controls) =>
                controls.setQuestionAndPlay("having-headaches"),
            },
          ]),
      },
    },
    {
      id: "having-headaches",
      audioUrl: "/mp3/having-headaches.mp3",
      callbacks: {
        END: (controls) =>
          controls.setOptions([
            {
              id: "no",
              icon: "no",
              callback: (controls) =>
                controls.setQuestionAndPlay("poor-digestion"),
            },
            {
              id: "yes",
              icon: "yes",
              callback: (controls) =>
                controls.setQuestionAndPlay("poor-digestion"),
            },
          ]),
      },
    },
    {
      id: "poor-digestion",
      audioUrl: "/mp3/poor-digestion.mp3",
      callbacks: {
        END: (controls) =>
          controls.setOptions([
            {
              id: "no",
              icon: "no",
              callback: (controls) => controls.submit(),
            },
            {
              id: "yes",
              icon: "yes",
              callback: (controls) => controls.submit(),
            },
          ]),
      },
    },
  ],
});
