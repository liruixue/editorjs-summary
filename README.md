# Editor.js summary Tool

[![npm](https://img.shields.io/npm/v/editorjs-summary.svg?style=?style=flat&logo=appveyor)](https://www.npmjs.com/package/editorjs-summary) ![Version of EditorJS that the plugin is compatible with](https://badgen.net/badge/Editor.js/v2.0/blue)

Provides Summary blocks for the [Editor.js](https://editorjs.io/).

## Features

- 8 different summary block styes
- Convert from other blocks into an Summary block
- Convert an Summary block into other blocks

## How does it look like?

Watch this tool in action in the following short GIF movie.

<p align="center">
  <img src="https://user-images.githubusercontent.com/876195/87923460-294ee780-ca9b-11ea-8a73-009453d77478.gif" alt="Summary sneak peek GIF!">

**Try it out yourself on the [demo page](https://vishaltelangre.github.io/editorjs-summary/examples/demo.html).**

## Installation

### Install via NPM

Get the package

```sh
npm i --save editorjs-summary
```

Include module at your application

```js
const Summary = require('editorjs-summary');

// OR

import Summary from 'editorjs-summary';
```

### Download to your project's source dir

Copy [`dist/bundle.js`](./dist/bundle.js) file to your page.

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/editorjs-summary).

```html
<script src="https://cdn.jsdelivr.net/npm/editorjs-summary@latest"></script>
```

## Usage

Add a new Tool `summary` to the `tools` property of the Editor.js initial config.

```js
var editor = EditorJS({
  // ...

  tools: {
    // ...
    summary: Summary,
  },

  // ...
});
```

Or initialize Summary tool with additional optional settings

```js
var editor = EditorJS({
  //...

  tools: {
    //...
    summary: {
      class: Summary,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+A',
      config: {
        defaultType: 'primary',
        messagePlaceholder: 'Enter something',
      },
    },
  },

  //...
});
```

## Config Params

All properties are optional.

| Field                | Type     | Default Value  | Description                                                                                                                |
| -------------------- | -------- | -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `defaultType`        | `string` | `info`         | default Summary type (should be either of `primary`, `secondary`, `info`, `success`, `warning`, `danger`, `light` or `dark`) |
| `messagePlaceholder` | `string` | `Type here...` | placeholder to show in Summary`s message input                                                                               |

## Output data

| Field   | Type     | Description                                                                                               |
| ------- | -------- | --------------------------------------------------------------------------------------------------------- |
| message | `string` | Summary message                                                                                             |
| type    | `string` | Summary type among one of `primary`, `secondary`, `info`, `success`, `warning`, `danger`, `light` or `dark` |

```json
{
  "type": "summary",
  "data": {
    "type": "danger",
    "text": "<strong>Holy smokes!</strong><br>Something seriously <em>bad</em> happened."
  }
}
```

## Local Development

- Run `yarn install`.
- Run `yarn dev` to continuously watch for the changes made in `./src/index.js` and updates a development bundle under `./dist` folder.
- Open `./examples/development.html` in the browser to verify the tool's functionality.

## License

This project is licensed under the [MIT License](LICENSE).
