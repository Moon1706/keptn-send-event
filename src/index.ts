import * as core from '@actions/core';
import { main } from 'keptn-send-event';

const getFromKube = core.getBooleanInput('get-from-kube');
const keptnApiUrl = core.getInput('keptn-api-url');
const keptnApiToken = core.getInput('keptn-api-token');
const kubeSettings = core.getInput('kube-settings');
const event = core.getInput('event');
const config = core.getInput('config');

const response = main(getFromKube, keptnApiUrl, keptnApiToken, kubeSettings, event);
response.then(json =>  {
  if ('keptnContext' in json) {
      core.setOutput("keptnContext", json.keptnContext);
  } else {
      core.setFailed("ERROR: No Keptn context found in response");
  }
}).catch(err => core.setFailed(err));
