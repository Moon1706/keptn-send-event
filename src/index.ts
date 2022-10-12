import * as core from '@actions/core';
import { send } from 'keptn-send-event';

const keptnResourcesInKubernetes = core.getInput('keptn-kube');
const keptnAuth = core.getInput('keptn-auth');
const event = core.getInput('event');
try {
    core.setOutput("keptnContext", send(event, keptnAuth, keptnResourcesInKubernetes));
} catch (err: any) {
    core.setFailed(err);
}
