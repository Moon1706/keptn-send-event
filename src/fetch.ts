export function sendEvent(url: string, token: string, event: string): any {
    return fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            'x-token': token,
        },
        body: event,
    })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            throw error;
        });
}
