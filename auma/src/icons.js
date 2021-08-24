const playBarIcon = {
  props: {
    width: {
      type: Number,
      default: 48,
    },
    color: {
      type: String,
      default: "#000",
    },
    bgColor: {
      type: String,
      default: "#ddd",
    },
  },
};

export const IconPlay = {
  ...playBarIcon,
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="24" :fill="bgColor"/>
    <path d="M3 22v-20l18 10-18 10z" :fill="color" transform="translate(14, 12)"/>
  </svg>`,
};

export const IconPause = {
  ...playBarIcon,
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="24" :fill="bgColor"/>
    <path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" :fill="color" transform="translate(12, 12)"/>
  </svg>`,
};

export const IconReplay = {
  ...playBarIcon,
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="24" :fill="bgColor"/>
    <path d="M18.885 3.515c-4.617-4.618-12.056-4.676-16.756-.195l-2.129-2.258v7.938h7.484l-2.066-2.191c2.82-2.706 7.297-2.676 10.073.1 4.341 4.341 1.737 12.291-5.491 12.291v4.8c3.708 0 6.614-1.244 8.885-3.515 4.686-4.686 4.686-12.284 0-16.97z"
      :fill="color" transform="translate(12, 12)"/>
  </svg>`,
};

export const IconChoiceYes = {
  template: `
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
</svg>`,
};

export const IconChoiceNo = {
  template: `
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
</svg>`,
};
