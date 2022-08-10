import { sendKubeEvent } from './kube';
import { sendEvent } from './fetch';

export async function main(
    getFromKube: boolean,
    keptnApiUrl: string,
    keptnApiToken: string,
    kubeSettings: string,
    event: string
) {
    if (getFromKube) {
        console.log('Send event with Kubernetes connection.');
        return await sendKubeEvent(kubeSettings, event);
    } else {
        console.log('Send event with API URL and token.');
        return await sendEvent(keptnApiUrl, keptnApiToken, event);
    }
}
