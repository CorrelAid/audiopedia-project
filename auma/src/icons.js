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
