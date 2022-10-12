"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const keptn_send_event_1 = require("keptn-send-event");
const keptnResourcesInKubernetes = core.getInput('keptn-kube');
const keptnAuth = core.getInput('keptn-auth');
const event = core.getInput('event');
try {
    core.setOutput("keptnContext", (0, keptn_send_event_1.send)(event, keptnAuth, keptnResourcesInKubernetes));
}
catch (err) {
    core.setFailed(err);
}
