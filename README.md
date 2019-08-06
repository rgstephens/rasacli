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

| Capability          | UI  | API | rasacli       | Notes                                                                                                                  |
| ------------------- | :-: | :-: | ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Get (md)            |     |     |               | See issue [#4076](https://github.com/RasaHQ/rasa/issues/4076)                                                          |
| Get (json)          |     |  x  |               | See issue [#4175](https://github.com/RasaHQ/rasa/issues/4175)                                                          |
| Get entities (json) |     |  x  |               |                                                                                                                        |
| Get intents (json)  |     |  x  |               |                                                                                                                        |
| Add (md)            |  x  |     |               | See issues [#4076](https://github.com/RasaHQ/rasa/issues/4076) and [#3580](https://github.com/RasaHQ/rasa/issues/3580) |
| Add (json)          |  x  |  x  |               |                                                                                                                        |
| Update (md)         |     |     |               | See issue [#4076](https://github.com/RasaHQ/rasa/issues/4076)                                                          |
| Update (json)       |     |  x  |               |                                                                                                                        |
| Update by id (md)   |  x  |     |               |                                                                                                                        |
| Update by id (json) |  x  |  x  |               |                                                                                                                        |
| Delete              |     |     | `deltraining` |                                                                                                                        |
| Delete by id        |  x  |  x  |               |                                                                                                                        |

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
| Update (json) |     |  x  | `upddomain -t` |       |
| Delete        |     |  x  | `deldomain -t` |       |

### Domain

| Capability | UI  | API | rasacli     | Notes                                                         |
| ---------- | :-: | :-: | ----------- | ------------------------------------------------------------- |
| Get        |  x  |  x  | `getdomain` |                                                               |
| Add        |  x  |     |             | There's no `POST` api call for the domain                     |
| Update     |     |  x  | `upddomain` |                                                               |
| Delete     |     |  x  | `deldomain` | See issue [#4080](https://github.com/RasaHQ/rasa/issues/4080) |

## Examples

To remove all content:

```sh
rasacli deldomain
rasacli deldomain -t
rasacli deltraining
rasacli delstories
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

#### 0.1.1 - Jul 23, 2019

Initial set of commands: `addstories`, `delstories`, `deltraining`, `getdomain`, `getstories`, `getstoriesmd`, `gettraining`, `upddomain`

#### 0.1.2 - Jul 24, 2019

`upddomain` command added `-t` option to specify update of templates. See API domain [PUT](https://rasa.com/docs/rasa-x/api/rasa-x-http-api/#operation/updateDomain) for details on `store_templates` option along with Rasa X API Github issue [#4080](https://github.com/RasaHQ/rasa/issues/4080).

#### 0.1.3 - Aug 4, 2019

Added `deldomain` command which is the same as an `upddomain` but with an empty dataset (you don't have to supply an empty markdown file). Also fixes an `addstories` file name processing issue.

#### 0.2.0 - Aug 6, 2019

* Added `updtemplates` to update response templates. This replaces `upddomain -t`
* Added `getentities` command
* Added `deltemplates` to replace `deldomain -t` but discovered a bug in this api, see [#4185](https://github.com/RasaHQ/rasa/issues/4185)
* Added `delall` command which calls all of the delete commands supported by `rasacli`

# Usage

<!-- usage -->
```sh-session
$ npm install -g rasacli
$ rasacli COMMAND
running command...
$ rasacli (-v|--version|version)
rasacli/0.2.0 darwin-x64 node-v12.4.0
$ rasacli --help [COMMAND]
USAGE
  $ rasacli COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
- [rasacli](#rasacli)
  - [Rasa X UI & API](#rasa-x-ui--api)
    - [NLU Training Data](#nlu-training-data)
    - [Core Stories](#core-stories)
    - [Template Responses](#template-responses)
    - [Domain](#domain)
  - [Examples](#examples)
  - [Environment Variables](#environment-variables)
- [Release Notes](#release-notes)
      - [0.1.1 - Jul 23, 2019](#011---jul-23-2019)
      - [0.1.2 - Jul 24, 2019](#012---jul-24-2019)
      - [0.1.3 - Aug 4, 2019](#013---aug-4-2019)
      - [0.2.0 - Aug 6, 2019](#020---aug-6-2019)
- [Usage](#usage)
- [Commands](#commands)
  - [`rasacli addstories FILE`](#rasacli-addstories-file)
  - [`rasacli delall [FILE]`](#rasacli-delall-file)
  - [`rasacli deldomain`](#rasacli-deldomain)
  - [`rasacli delstories`](#rasacli-delstories)
  - [`rasacli deltemplates`](#rasacli-deltemplates)
  - [`rasacli deltraining [PROJECT]`](#rasacli-deltraining-project)
  - [`rasacli getdomain`](#rasacli-getdomain)
  - [`rasacli getentities [PROJECT]`](#rasacli-getentities-project)
  - [`rasacli getstories`](#rasacli-getstories)
  - [`rasacli getstoriesmd`](#rasacli-getstoriesmd)
  - [`rasacli gettraining [PROJECT]`](#rasacli-gettraining-project)
  - [`rasacli help [COMMAND]`](#rasacli-help-command)
  - [`rasacli upddomain FILE`](#rasacli-upddomain-file)
  - [`rasacli updstories FILE`](#rasacli-updstories-file)
  - [`rasacli updtemplates FILE`](#rasacli-updtemplates-file)

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

_See code: [src/commands/addstories.ts](https://github.com/rgstephens/rasacli/blob/v0.2.0/src/commands/addstories.ts)_

## `rasacli delall [FILE]`

describe the command here

```
USAGE
  $ rasacli delall [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/delall.ts](https://github.com/rgstephens/rasacli/blob/v0.2.0/src/commands/delall.ts)_

## `rasacli deldomain`

Update domain

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

_See code: [src/commands/deldomain.ts](https://github.com/rgstephens/rasacli/blob/v0.2.0/src/commands/deldomain.ts)_

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

_See code: [src/commands/delstories.ts](https://github.com/rgstephens/rasacli/blob/v0.2.0/src/commands/delstories.ts)_

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

_See code: [src/commands/deltemplates.ts](https://github.com/rgstephens/rasacli/blob/v0.2.0/src/commands/deltemplates.ts)_

## `rasacli deltraining [PROJECT]`

Delete all training data

```
USAGE
  $ rasacli deltraining [PROJECT]

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

_See code: [src/commands/deltraining.ts](https://github.com/rgstephens/rasacli/blob/v0.2.0/src/commands/deltraining.ts)_

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

_See code: [src/commands/getdomain.ts](https://github.com/rgstephens/rasacli/blob/v0.2.0/src/commands/getdomain.ts)_

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

_See code: [src/commands/getentities.ts](https://github.com/rgstephens/rasacli/blob/v0.2.0/src/commands/getentities.ts)_

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

_See code: [src/commands/getstories.ts](https://github.com/rgstephens/rasacli/blob/v0.2.0/src/commands/getstories.ts)_

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

_See code: [src/commands/getstoriesmd.ts](https://github.com/rgstephens/rasacli/blob/v0.2.0/src/commands/getstoriesmd.ts)_

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

_See code: [src/commands/gettraining.ts](https://github.com/rgstephens/rasacli/blob/v0.2.0/src/commands/gettraining.ts)_

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

_See code: [src/commands/upddomain.ts](https://github.com/rgstephens/rasacli/blob/v0.2.0/src/commands/upddomain.ts)_

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

_See code: [src/commands/updstories.ts](https://github.com/rgstephens/rasacli/blob/v0.2.0/src/commands/updstories.ts)_

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

_See code: [src/commands/updtemplates.ts](https://github.com/rgstephens/rasacli/blob/v0.2.0/src/commands/updtemplates.ts)_
<!-- commandsstop -->
