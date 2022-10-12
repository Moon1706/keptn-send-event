import { KubeConnect } from './types/kube-config';
import { Auth } from './types/auth';
import { load } from 'js-yaml';
import { kubeUpdateService } from './kube/kube-port-forward';
import { sendEvent } from './event';

export async function send(
    event: string,
    keptnAuth = '',
    kubeSettings = `{"enabled": false}`
) {
    const kubeConnectObject = load(kubeSettings);
    const kubeConnect = kubeConnectObject as KubeConnect;
    console.log(`GLOBAL: Event: ${event}`);
    if (kubeConnect.enabled) {
        console.log('GLOBAL: Update services with Kubernetes connection.');
        console.log(
            `KUBE: KubeAPISettings: ${JSON.stringify(kubeConnectObject)}`
        );
        return await kubeUpdateService(kubeConnect, event);
    } else {
        console.log('GLOBAL: Update services with API URL and token.');
        return sendEvent(load(keptnAuth) as Auth, event);
    }
}
