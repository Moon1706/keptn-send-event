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
        return await sendKubeEvent(kubeSettings, event);
    } else {
        return await sendEvent(keptnApiUrl, keptnApiToken, event);
    }
}
