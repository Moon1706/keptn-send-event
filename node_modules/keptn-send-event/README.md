# keptn-send-event

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

[![NPM](https://nodei.co/npm/keptn-send-event.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/keptn-send-event/)

Send event to Keptn in Kubernetes cluster.

#### Example

```js
import { send } from "keptn-send-event";

// If you select this section will use port-forwarding and Keptn API token will get from K8s secrets
const kubeSettings = `{
  "enabled": true,
  "namespace": "keptn",
  "secret": "keptn-api-token",
  "service": "api-gateway-nginx"
}`;

// If you have public Keptn URL and `enabled = false` please fill these settings
const keptnAuth = `{
  "keptnURL": "",
  "token": ""
}`;

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

const keptnContext = send(event, keptnAuth, kubeSettings);
```
