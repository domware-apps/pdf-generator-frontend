This project is an example implementation of the [Pdf Generator API](https://rapidapi.com/domware.apps/api/pdf-generator3) hosted on [RapidApi](https://rapidapi.com/)

## Pdf Generator API

This API allows you to quickly generate a PDF document from HTML or from an URL.

### Quick start

1. Go on https://rapidapi.com/domware.apps/api/pdf-generator3 and register a free subscription. You will receive the **X-RapidAPI-Key** that you will need to make API calls
2. Go [here](https://domware-apps.github.io/pdf-generator-frontend/) and have fun testing all the available options.

Simple and high customizable api to Generate PDF documents.

Find here some example on how to use it from a front-end: https://github.com/domware-apps/pdf-generator-frontend

### Endpoints

| Endpoint | Method | Description                        |
| :------: | ------ | ---------------------------------- |
|  /html   | POST   | convert HTML to PDF document       |
|   /url   | POST   | generate PDF from a public website |

### Options

|       Key       | Type    | Options             | Default                                               |
| :-------------: | ------- | ------------------- | ----------------------------------------------------- |
|     output      | object  | [outputs](#outputs) | { "type": "application/pdf", "name": "download.pdf" } |
| printBackground | boolean |                     | false                                                 |

#### Outputs

You can choose the type of output you want.

| Key  | Type   | Options                     | Default           | Note                                                |
| :--: | ------ | --------------------------- | ----------------- | --------------------------------------------------- |
| type | string | "base64", "application/pdf" | "application/pdf" |                                                     |
| name | string |                             | download.pdf      | This will work only for `"type": "application/pdf"` |

### Examples

You can find some examples of implementations of this API here:

1. [React](https://github.com/domware-apps/pdf-generator-frontend/tree/master/examples/react)

### Changelog

- v1.1.0 (20191223)
  - Fix `output` option validation
  - `type: application/pdf`
  - option `output.name` added
- v1.0.0 - First release
