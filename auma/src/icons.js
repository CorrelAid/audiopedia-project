const choiceIconProps = {
  props: {
    width: {
      type: Number,
      default: 48,
    },
  },
};

export const IconChoiceYes = {
  ...choiceIconProps,
  template: `
<svg xmlns="http://www.w3.org/2000/svg" :width="width" viewBox="0 0 24 24">
  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
</svg>`,
};

export const IconChoiceNo = {
  ...choiceIconProps,
  template: `
<svg xmlns="http://www.w3.org/2000/svg" :width="width" viewBox="0 0 24 24">
  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
</svg>`,
};

export const IconChoiceSkip = {
  ...choiceIconProps,
  template: `
<svg xmlns="http://www.w3.org/2000/svg" :width="width" viewBox="0 0 24 24">
  <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
</svg>`,
};
