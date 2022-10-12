import { Auth } from './types/auth';
import { generateAPIServiceScheme } from './api/schemes/api-service';
import { sendRequest } from './api/requests';

export async function sendEvent(auth: Auth, event: string) {
    const apiService = generateAPIServiceScheme();
    const response = await sendRequest(
        apiService,
        auth,
        'forwardsReceivedEvent',
        event
    );
    console.log('KEPTN: Event was sent.');
    if ('keptnContext' in response) {
        console.log(`KEPTN: Event keptnContext: ${response.keptnContext}`);
    } else {
        console.log(
            `KEPNT: Error! keptnContext didn't find in respose. Response: '${response}'`
        );
        throw new Error();
    }
    return response.keptnContext;
}
