![keptn](https://github.com/keptn/keptn/raw/master/assets/keptn.png)

# Send event to Kubernetes cluster with Keptn

![License](https://img.shields.io/github/license/Moon1706/keptn-provisioning-gha)

This repository contains an action for use with GitHub Actions, which send `keptn` event to Kubernetes cluster.

**Main code** of this tool storage in `develop` branch.

`keptn` [the official tool](https://keptn.sh/).

## Inputs

| parameter  | description                                                      | required | default                                                                                                   |
| ---------- | ---------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| event      | JSON event which will send to Keptn                              | `true`   | `""`                                                                                                      |
| keptn-auth | Auth settings for Keptn connection. Ignore when use 'keptn-kube' | `true`   | `'{"keptnURL": "", "token": ""}'`                                                                         |
| keptn-kube | Kubernetes settings for connection to Keptn service.             | `true`   | `'{"enabled": false, "namespace": "keptn", "secret": "keptn-api-token", "service": "api-gateway-nginx"}'` |


## Workflows

Basic flow with API URL and token:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: "Send event"
        uses: Moon1706/keptn-send-event@v2
        with:
          keptn-auth: |
            keptnURL: "keptn.test.com"
            token: "XXXXXXXXXXXXXXXXXXX"
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
  test:
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

      - name: "Send event"
        uses: Moon1706/keptn-send-event@v2
        with:
          keptn-kube: |
            enabled: true
            namespace: "keptn"
            secret: "keptn-api-token"
            service: "api-gateway-nginx"
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
