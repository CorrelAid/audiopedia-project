auma({
  id: "my-survey",
  sendResultsTo: "12345678910", // put a real phone number here, or use query param
  questions: [
    {
      id: "cats-or-dogs",
      audioUrl: "/mp3/do-you-prefer-cats-or-dogs.mp3",
      imageUrl: "/img/cat-dog.jpg",
      callbacks: {
        END: (controls) =>
          controls.setOptions([
            {
              id: "cats",
              callback: (controls) => controls.setQuestionAndPlay("hair-color"),
            },
            {
              id: "dogs",
              callback: (controls) => controls.setQuestionAndPlay("hair-color"),
            },
          ]),
      },
    },
    {
      id: "hair-color",
      audioUrl: "/mp3/what-is-your-hair-color.mp3",
      imageUrl: "/img/hair-color.jpg",
      callbacks: {
        END: (controls) =>
          controls.setOptions([
            {
              id: "blonde",
              callback: (controls) =>
                controls.setQuestionAndPlay("feeling-stressed"),
            },
            {
              id: "red",
              callback: (controls) =>
                controls.setQuestionAndPlay("feeling-stressed"),
            },
            {
              id: "brown",
              callback: (controls) =>
                controls.setQuestionAndPlay("feeling-stressed"),
            },
            {
              id: "black",
              callback: (controls) =>
                controls.setQuestionAndPlay("feeling-stressed"),
            },
          ]),
      },
    },
    {
      id: "feeling-stressed",
      audioUrl: "/mp3/are-you-feeling-stressed.mp3",
      imageUrl: "/img/stressed.jpg",
      callbacks: {
        END: (controls) =>
          controls.setOptions([
            {
              id: "not-stressed",
              callback: (controls) => controls.submit(),
            },
            {
              id: "very-stressed",
              callback: (controls) => controls.submit(),
            },
          ]),
      },
    },
  ],
});
