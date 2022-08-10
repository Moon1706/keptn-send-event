# keptn-send-event

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

[![NPM](https://nodei.co/npm/keptn-send-event.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/keptn-send-event/)

Send event to Keptn in Kubernetes cluster.

#### Example

```js
import { main } from "keptn-send-event";

// Send event with the Kube connection
const getFromKube = true;
const kubeSettings = `
namespace: keptn
secret: keptn-api-token
service: api-gateway-nginx`;
const event = `{
  "data": {
    "project": "test",
    "stage": "develop",
    "service": "k6",
    "message": "",
    "status": "",
    "result": ""
  },
  "source": "gh",
  "specversion": "1.0",
  "type": "sh.keptn.event.develop.performance.triggered",
  "shkeptnspecversion": "0.2.3"
}`;
const keptnApiUrl = '';
const keptnApiToken = '';


// Send event with Keptn API URL and token
const getFromKube = false;
const kubeSettings = '';
const event = `{
  "data": {
    "project": "test",
    "stage": "develop",
    "service": "k6",
    "message": "",
    "status": "",
    "result": ""
  },
  "source": "gh",
  "specversion": "1.0",
  "type": "sh.keptn.event.develop.performance.triggered",
  "shkeptnspecversion": "0.2.3"
}`;
const keptnApiUrl = 'http://example.nip.io/api/v1/event';
const keptnApiToken = 'XXXXXXXXXXXXXXXXXXXXXXXXXXX';

const response = main(getFromKube, keptnApiUrl, keptnApiToken, kubeSettings, event);
```
