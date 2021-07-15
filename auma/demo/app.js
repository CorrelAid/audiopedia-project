auma({
  questions: [
    {
      name: "start",
      audioUrl: "/mp3/1.mp3",
      imageUrl: "/img/start.gif",
      callbacks: {
        1: (controls) => controls.setImageUrl("/img/1.gif"),
        7: (controls) => controls.setImageUrl("/img/2.png"),
        23: (controls) => controls.setImageUrl("/img/3.gif"),
        END: (controls) =>
          controls.setOptions([
            {
              name: "blue",
              callback: (controls) => controls.setQuestionAndPlay("blue"),
            },
            {
              name: "green",
              callback: (controls) => controls.setQuestionAndPlay("green"),
            },
          ]),
      },
    },
    {
      name: "blue",
      audioUrl: "/mp3/blue.mp3",
      imageUrl: "/img/5.png",
      callbacks: {
        END: (controls) => controls.submit(),
      },
    },
    {
      name: "green",
      audioUrl: "/mp3/green.mp3",
      imageUrl: "/img/4.png",
      callbacks: {
        END: (controls) => controls.submit(),
      },
    },
  ],
});
