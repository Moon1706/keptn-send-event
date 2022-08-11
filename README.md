# Send event to Kubernetes cluster with Keptn

This repository contains an action for use with GitHub Actions, which send `keptn` event to Kubernetes cluster.

**Main code** of this tool storage in `develop` branch.

`keptn` [the official tool](https://keptn.sh/).

## Usage

Basic action with API URL and token:

```yaml
- name: "Send event"
  uses: Moon1706/keptn-send-event@v1
  with:
    keptn-api-url: http://example.nip.io/api/v1/event
    keptn-api-token: XXXXXXXXXXXXXXXXXXX
    event: |
      {
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
      }
```


Basic action with Kubernetes connection:

```yaml
- name: "Send event"
  uses: Moon1706/keptn-send-event@v1
  with:
    get-from-kube: true
    event: |
      {
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
      }
```

Basic flow with Kubernetes connection:

```yaml
jobs:
  send-event:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      # Connection to GCP.
      # You can use your cloud or infra.
      # Main requirement, kubectl must connect to your cluster.
      - name: "Auth to GCP exist env"
        uses: google-github-actions/auth@v0
        with:
          credentials_json: ${{ secrets.GOOGLE_SERVICE_ACCOUNT }}
      - name: "Set up Cloud SDK"
        uses: google-github-actions/setup-gcloud@v0
      - name: "Connect to cluster"
        uses: google-github-actions/get-gke-credentials@v0
        with:
          cluster_name: keptn-test
          location: europe-west3-c
          project_id: keptn-test
      
      # Send event to defalut Kubernetes cluster
      - name: "Send event"
        id: send-keptn-event
        uses: Moon1706/keptn-send-event@v1
        with:
          get-from-kube: true
          # Default settings
          kube-settings: |
            "namespace": "keptn"
            "secret": "keptn-api-token"
            "sevice": "api-gateway-nginx"
          event: |
            {
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
            }
      - name: Print the Keptn Context
        run: echo "The keptn context is ${{ steps.send-keptn-event.outputs.keptnContext }}"
```

## Configuration

The action can be configured with the following arguments:

- `get-from-kube` (required) - Use Kubernetes connection to send event. Default is `false`. 
- `keptn-api-url` (required) - URL pointing to the keptn events API. Example `http://example.nip.io/api/v1/event`. Default is `""`.
- `keptn-api-token` (required) - API Token to be used for sending the event. Default is `""`.
- `kube-settings` (optional) - Basic Kubernetes connection settings. Default is `{'namespace': 'keptn', 'secret': 'keptn-api-token', 'service': 'api-gateway-nginx'}`. **NOTE! If need to change only namespace you must write all other settings!**
- `event` (required) - Keptn event type to send. (See: [Keptn Cloud Events](https://www.google.com/search?q=keptn%20spec)).
