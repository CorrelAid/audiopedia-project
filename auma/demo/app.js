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
              icon: "yes",
              callback: (controls) => controls.setQuestionAndPlay("hair-color"),
            },
            {
              id: "dogs",
              icon: "no",
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
              icon: "yes",
              callback: (controls) =>
                controls.setQuestionAndPlay("feeling-stressed"),
            },
            {
              id: "red",
              icon: "yes",
              callback: (controls) =>
                controls.setQuestionAndPlay("feeling-stressed"),
            },
            {
              id: "brown",
              icon: "yes",
              callback: (controls) =>
                controls.setQuestionAndPlay("feeling-stressed"),
            },
            {
              id: "black",
              icon: "yes",
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
              icon: "yes",
              callback: (controls) => controls.submit(),
            },
            {
              id: "very-stressed",
              icon: "yes",
              callback: (controls) => controls.submit(),
            },
          ]),
      },
    },
  ],
});
