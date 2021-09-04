# auma

"Augmented Audio Framework"

A framework for building augmented audio surveys.

## Getting started with development

NodeJS should be installed on your machine https://nodejs.org/en/. It is recommended to install the latest Long Term Support (LTS) version.

Once NodeJS is installed run these commands in your terminal (from the `auma/` folder):

```
# install the development dependencies
npm install

# starts building the framework & serving the demo
# visit the demo in your web browser at http://localhost:8080/
npm start
```

## The demo

The demo lives in the `demo/` folder. The demo survey is configured via `app.js`. Apart from adding audio files this configuration file is the only file a survey implementer needs to consider.

## The framework

The framework lives in the `src/` folder.

- `npm start` starts [webpack](https://webpack.js.org/) in watch mode. The framework will be continuously built to `demo/dist/auma.js`.
- We are using [VueJS](https://v3.vuejs.org/) for UI.
- We make use of the browsers [`<audio/>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) element, the [`timeupdate`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event) event is used to synchronize survey callbacks with the audio.
