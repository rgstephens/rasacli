# rasacli

Rasa API CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/rasacli.svg)](https://npmjs.org/package/rasacli)
[![CircleCI](https://circleci.com/gh/rgstephens/rasacli/tree/master.svg?style=shield)](https://circleci.com/gh/rgstephens/rasacli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/rasacli.svg)](https://npmjs.org/package/rasacli)
[![License](https://img.shields.io/npm/l/rasacli.svg)](https://github.com/rgstephens/rasacli/blob/master/package.json)

This command line tool has initially been developed to import content from existing Rasa bots to Rasa X and to clean-up Rasa X so that you can more easily remove all of the content and upload new content on the same instance.

It has been developed in TypeScript with [oclif](https://oclif.io).

## Rasa X UI & API

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

## Examples

Importing existing content:

```sh
export RASA_HOST=mybot.domain.com
export RASA_PASS=mypass
export RASA_PORT=8080
sudo rasacli updtraining data/training/*md
sudo rasacli addstories data/stories/*md
sudo rasacli upddomain data/domain.yml
sudo rasacli updtemplates data/domain.yml
```

To remove all content:

```sh
rasacli delall
```

## Developer Notes

To add a new command to this project (make sure you save the README.md before running):

```
npx oclif command NAME
```

To test a commmand:

```
./bin/run getstories -v
```

Force update of README.md (make sure you save the README.md before running):

```
yarn prepack
```

Publish an updated version of `rasacli`:

```
npm version (major|minor|patch)
npm publish
```

Publish a beta update:

```
npm version <new version>-beta.0
npm publish --tag beta
```

Install beta release:

```
npm install rasacli@beta.
```

## Environment Variables

The rasacli will use the following environment variables in lieu of their associated command line options:

| Env        | Option     | Description        |
| ---------- | ---------- | ------------------ |
| RASA_HOST  | -n         | Rasa X hostname    |
| RASA_PORT  | -p         | Rasa X server port |
| RASA_PROTO | --protocol | Server protocol    |
| RASA_USER  | --username | Username           |
| RASA_PASS  | --password | Password           |
| RASA_TOKEN | --token    | Token              |

<!-- toc -->
* [rasacli](#rasacli)
* [Release Notes](#release-notes)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Release Notes

#### 0.4.0 - Oct 4, 2019

- Added `vers` to display Rasa & Rasa X version info
- Added `-v` verbose option
- Added `modeltrain` to train the model, returns the name of the new model
- Added `modelactivate` to activate a mode, pass the name of the model with `-m`

#### 0.3.0 - Aug 8, 2019

- Added `updtraining` to replace NLU training data. Accepts a list of markdown files.

#### 0.2.0 - Aug 6, 2019

- Added `updtemplates` to update response templates. This replaces `upddomain -t`
- Added `getentities` command
- Added `deltemplates` to replace `deldomain -t` but discovered a bug in this api, see [#4185](https://github.com/RasaHQ/rasa/issues/4185)
- Added `delall` command which calls all of the delete commands supported by `rasacli`

#### 0.1.3 - Aug 4, 2019

Added `deldomain` command which is the same as an `upddomain` but with an empty dataset (you don't have to supply an empty markdown file). Also fixes an `addstories` file name processing issue.

#### 0.1.2 - Jul 24, 2019

`upddomain` command added `-t` option to specify update of templates. See API domain [PUT](https://rasa.com/docs/rasa-x/api/rasa-x-http-api/#operation/updateDomain) for details on `store_templates` option along with Rasa X API Github issue [#4080](https://github.com/RasaHQ/rasa/issues/4080).

#### 0.1.1 - Jul 23, 2019

Initial set of commands: `addstories`, `delstories`, `deltraining`, `getdomain`, `getstories`, `getstoriesmd`, `gettraining`, `upddomain`

# Usage

<!-- usage -->
```sh-session
$ npm install -g rasacli
$ rasacli COMMAND
running command...
$ rasacli (-v|--version|version)
rasacli/0.4.1-beta.0 darwin-x64 node-v12.9.0
$ rasacli --help [COMMAND]
USAGE
  $ rasacli COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`rasacli addstories FILE`](#rasacli-addstories-file)
* [`rasacli delall [PROJECT]`](#rasacli-delall-project)
* [`rasacli deldomain`](#rasacli-deldomain)
* [`rasacli delstories`](#rasacli-delstories)
* [`rasacli deltemplates`](#rasacli-deltemplates)
* [`rasacli deltraining`](#rasacli-deltraining)
* [`rasacli getdomain`](#rasacli-getdomain)
* [`rasacli getentities [PROJECT]`](#rasacli-getentities-project)
* [`rasacli getstories`](#rasacli-getstories)
* [`rasacli getstoriesmd`](#rasacli-getstoriesmd)
* [`rasacli gettraining [PROJECT]`](#rasacli-gettraining-project)
* [`rasacli help [COMMAND]`](#rasacli-help-command)
* [`rasacli modelactivate`](#rasacli-modelactivate)
* [`rasacli modeltrain`](#rasacli-modeltrain)
* [`rasacli upddomain FILE`](#rasacli-upddomain-file)
* [`rasacli updstories FILE`](#rasacli-updstories-file)
* [`rasacli updtemplates FILE`](#rasacli-updtemplates-file)
* [`rasacli updtraining FILE`](#rasacli-updtraining-file)
* [`rasacli vers`](#rasacli-vers)

## `rasacli addstories FILE`

Add stories

```
USAGE
  $ rasacli addstories FILE

ARGUMENTS
  FILE  Markdown story files (accepts multiple files)

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/addstories.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/addstories.ts)_

## `rasacli delall [PROJECT]`

Update domain

```
USAGE
  $ rasacli delall [PROJECT]

ARGUMENTS
  PROJECT  [default: default] Project name

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/delall.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/delall.ts)_

## `rasacli deldomain`

Delete domain

```
USAGE
  $ rasacli deldomain

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/deldomain.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/deldomain.ts)_

## `rasacli delstories`

Delete all stories

```
USAGE
  $ rasacli delstories

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/delstories.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/delstories.ts)_

## `rasacli deltemplates`

Delete templates

```
USAGE
  $ rasacli deltemplates

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/deltemplates.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/deltemplates.ts)_

## `rasacli deltraining`

Delete all training data

```
USAGE
  $ rasacli deltraining

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --project=project        [default: default] Project name
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/deltraining.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/deltraining.ts)_

## `rasacli getdomain`

Get training data

```
USAGE
  $ rasacli getdomain

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/getdomain.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/getdomain.ts)_

## `rasacli getentities [PROJECT]`

Get entities

```
USAGE
  $ rasacli getentities [PROJECT]

ARGUMENTS
  PROJECT  [default: default] Project name

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/getentities.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/getentities.ts)_

## `rasacli getstories`

Get stories

```
USAGE
  $ rasacli getstories

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/getstories.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/getstories.ts)_

## `rasacli getstoriesmd`

Get stories as markdown

```
USAGE
  $ rasacli getstoriesmd

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/getstoriesmd.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/getstoriesmd.ts)_

## `rasacli gettraining [PROJECT]`

Get training data

```
USAGE
  $ rasacli gettraining [PROJECT]

ARGUMENTS
  PROJECT  [default: default] Project name

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/gettraining.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/gettraining.ts)_

## `rasacli help [COMMAND]`

display help for rasacli

```
USAGE
  $ rasacli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_

## `rasacli modelactivate`

Activate a model

```
USAGE
  $ rasacli modelactivate

OPTIONS
  -h, --help                 show CLI help
  -m, --modelname=modelname  (required) model name
  -n, --hostname=hostname    [default: localhost] hostname
  -p, --port=port            [default: 80] port
  -v, --verbose              verbose
  --password=password        password
  --protocol=protocol        [default: http] protocol
  --token=token              token
  --username=username        [default: me] username
```

_See code: [src/commands/modelactivate.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/modelactivate.ts)_

## `rasacli modeltrain`

Train a new model

```
USAGE
  $ rasacli modeltrain

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/modeltrain.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/modeltrain.ts)_

## `rasacli upddomain FILE`

Update domain

```
USAGE
  $ rasacli upddomain FILE

ARGUMENTS
  FILE  Domain yaml file

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/upddomain.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/upddomain.ts)_

## `rasacli updstories FILE`

Update stories

```
USAGE
  $ rasacli updstories FILE

ARGUMENTS
  FILE  Markdown story files (accepts multiple files)

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/updstories.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/updstories.ts)_

## `rasacli updtemplates FILE`

Update templates

```
USAGE
  $ rasacli updtemplates FILE

ARGUMENTS
  FILE  Domain yaml file

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/updtemplates.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/updtemplates.ts)_

## `rasacli updtraining FILE`

Update training

```
USAGE
  $ rasacli updtraining FILE

ARGUMENTS
  FILE  NLU training files (accepts multiple files)

OPTIONS
  -f, --format=format      [default: md] format (json, md)
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --project=project        [default: default] Project name
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/updtraining.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/updtraining.ts)_

## `rasacli vers`

Show version and status information

```
USAGE
  $ rasacli vers

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/vers.ts](https://github.com/rgstephens/rasacli/blob/v0.4.1-beta.0/src/commands/vers.ts)_
<!-- commandsstop -->
