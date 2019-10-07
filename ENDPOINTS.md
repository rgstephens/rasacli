# Rasa X UI & API

As of the 0.20.0 release of Rasa X, there are limitations on bulk import and delete of content. These limitations prompted the development of _rasacli_. Here's a comparison of the capabilities of the Rasa X UI, API and rasacli:

### NLU Training Data

In past releases of Rasa, the NLU training data could be formatted as `json` or `markdown`. The Rasa team has encouraged developers to move to `markdown` and this is what I have used.

Please note that the tables below refer to **bulk** operations unless otherwise noted. The UI supports CRUD operations on individual items.

| Capability          | UI  | API | rasacli               | Notes                                                                                                                  |
| ------------------- | :-: | :-: | --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Get (md)            |     |     |                       | See issue [#4076](https://github.com/RasaHQ/rasa/issues/4076)                                                          |
| Get (json)          |     |  x  | `gettraining`         |                                                                                                                        |
| Get entities (json) |     |  x  | `getentities`         |                                                                                                                        |
| Get intents (json)  |     |  x  |                       |                                                                                                                        |
| Add (md)            |  x  |     |                       | See issues [#4076](https://github.com/RasaHQ/rasa/issues/4076) and [#3580](https://github.com/RasaHQ/rasa/issues/3580) |
| Add (json)          |  x  |  x  |                       |                                                                                                                        |
| Update (md)         |     |     | `updtraining`         |                                                                                                                        |
| Update (json)       |     |  x  | `updtraining -f json` |                                                                                                                        |
| Update by id (md)   |  x  |     |                       |                                                                                                                        |
| Update by id (json) |  x  |  x  |                       |                                                                                                                        |
| Delete              |     |     | `deltraining`         |                                                                                                                        |
| Delete by id        |  x  |  x  |                       |                                                                                                                        |

### Core Stories

| Capability          | UI  | API | rasacli        | Notes                                                                       |
| ------------------- | :-: | :-: | -------------- | --------------------------------------------------------------------------- |
| Get (md)            |  x  |  x  | `getstoriesmd` |                                                                             |
| Get (json)          |     |  x  | `getstories`   |                                                                             |
| Add (md)            |     |  x  | `addstories`   |                                                                             |
| Update (md)         |     |  x  | `updstories`   | There's a known API bug [#4168](https://github.com/RasaHQ/rasa/issues/4168) |
| Update by id (json) |     |  x  |                |                                                                             |
| Delete              |     |     | `delstories`   |                                                                             |
| Delete by id        |     |  x  |                |                                                                             |

### Template Responses

| Capability    | UI  | API | rasacli        | Notes |
| ------------- | :-: | :-: | -------------- | ----- |
| Get           |  x  |  x  |                |       |
| Add (json)    |  x  |  x  |                |       |
| Update (json) |     |  x  | `updtemplates` |       |
| Delete        |     |  x  | `deltemplates` |       |

### Rasa X Environments

The **Rasa X** environments configuration. The Rasa X API has calls to [get and put](https://rasa.com/docs/rasa-x/api/rasa-x-http-api/#tag/Environments) the environment config.

### Rasa Configuration - NLU & Core

The Rasa configuration file, typically in `config.yml`, this defines the pipeline for the **Rasa NLU** and policies for the **Rasa Core**. The Rasa X API has [undocumented](https://github.com/RasaHQ/rasa/issues/4290) calls to get the config.

### Rasa Core Domain

The Rasa domain configuration, stored in the `domain.yml`.

| Capability | UI  | API | rasacli     | Notes                                                         |
| ---------- | :-: | :-: | ----------- | ------------------------------------------------------------- |
| Get        |  x  |  x  | `getdomain` |                                                               |
| Add        |  x  |     |             | There's no `POST` api call for the domain                     |
| Update     |     |  x  | `upddomain` |                                                               |
| Delete     |     |  x  | `deldomain` | See issue [#4080](https://github.com/RasaHQ/rasa/issues/4080) |

### Rasa Core Credentials

The Rasa credentials file used by **Rasa Core** to allow access by external services. Typically stored in `credentials.yml`. The REST interface can be enabled by adding a single line:

```
rest:
```

### Rasa Core Endpoints

The Rasa endpoints file, typically in `endpoints.yml`, tells the **Rasa Core** where to find components including the **action_endpoint** and **tracker_store**.

There's no API for the endpoints configuration. The filename is passed to the [rasa core commandline](https://rasa.com/docs/rasa/user-guide/running-the-server/#endpoint-configuration) in the --endpoints parameter.

## Rasa X REST Endpoint Summary

The Rasa column denotes the Rasa component that handles the request.

| Endpoint              | Rasa | Details        |
| --------------------- | ---- | -------------- |
| /projects/<id>/data   | NLU  | Training       |
| /projects/<id>/logs   | NLU  | Test intent    |
| /projects/<id>/models | Core | Models         |
| /chat                 | Core | Chat interface |
| /auth                 | X    | Authentication |
| /conversations/<id>   |      |                |

The endpoints to retrieve config items:

| Endpoint                | Rasa | Details         |
| ----------------------- | ---- | --------------- |
| /projects/<id>/data     | NLU  | Training        |
| /stories                | Core | Stories         |
| /templates              | Core | Templates       |
| /environments           | X    | Env file        |
| /domain                 | Core | Domain file     |
| /projects/<id>/settings | NLU  | Pipeline Config |
|                         | Core | Policy Config   |
|                         | Core | Credentials     |
|                         | Core | Endpoints       |
