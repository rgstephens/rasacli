# rasacli

Rasa API CLI

[![Version](https://img.shields.io/npm/v/rasacli.svg)](https://npmjs.org/package/rasacli)
[![Downloads/week](https://img.shields.io/npm/dw/rasacli.svg)](https://npmjs.org/package/rasacli)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![License](https://img.shields.io/npm/l/rasacli.svg)](https://github.com/rgstephens/rasacli/blob/master/package.json)

This command line tool has initially been developed to import content from existing Rasa bots to Rasa X and to clean-up Rasa X so that you can more easily remove all of the content and upload new content on the same instance.

It has been developed in TypeScript with [oclif](https://oclif.io).

## Table of Contents

<!-- toc -->

- [rasacli](#rasacli)
- [Installation](#install)
- [Examples](#examples)
- [Environment Variables](#environment-variables)
- [Release Notes](#release-notes)
- [Developer Notes](#developer-notes)
- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Installation

To install:

```
npm install -g rasacli
```

If you don't have `node` and `npm` installed, run these commands to install on Debian-based systems:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
source ~/.profile
nvm install 12
node --version
npm install -g rasacli
rasacli --version
```

# Examples

Set environment variables:

```
export RASA_HOST=mybot.domain.com
export RASA_USER=me
export RASA_PASS=mypass
```

| Command           | Details                |
| ----------------- | ---------------------- |
| rasacli --help    | Command options list   |
| rasacli modellist | List models            |
| rasacli delall    | Delete all bot content |

Importing content:

```sh
rasacli updtraining data/training/*md
rasacli addstories data/stories/*md
rasacli upddomain data/domain.yml
rasacli updtemplates data/domain.yml
rasacli updconfig data/config.yml
```

Export existing content:

```
rasacli getdomain > domain.yaml
rasacli getstories > stories.json
rasacli getstoriesmd > stories.md
rasacli gettraining > nlu.json
```

Train, list and activate model:

```sh
MODEL=`rasacli modeltrain`
rasacli modelactivate --model $MODEL
rasacli modellist
```

Rasa, Rasa X & rasacli version information:

```sh
rasacli version
rasacli vers
```

# Environment Variables

The rasacli will use the following environment variables in lieu of their associated command line options:

| Env        | Option     | Description        |
| ---------- | ---------- | ------------------ |
| RASA_HOST  | -n         | Rasa X hostname    |
| RASA_PORT  | -p         | Rasa X server port |
| RASA_PROTO | --protocol | Server protocol    |
| RASA_USER  | --username | Username           |
| RASA_PASS  | --password | Password           |
| RASA_TOKEN | --token    | Token              |

# Release Notes

#### 0.4.5 - Oct 7, 2019

- Fixed `modeltrain` exit code not set
- Added `getconfig` and `updconfig` for config.yml
- Added `modellist`
- Added `modeldelete`
- Added `modeladdtag`, `modeldeletetag`, `modelgettag` - Rasa X enterprise only
- Added `--project` option to `modeltrain`, default value is `default`

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

# Developer Notes

There's a summary of the Rasa X REST endpoints [here](ENDPOINTS.md).

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
npm install -g rasacli@beta.
```

# Usage

<!-- usage -->

```sh-session
$ npm install -g rasacli
$ rasacli COMMAND
running command...
$ rasacli (-v|--version|version)
rasacli/0.4.7 darwin-x64 node-v12.9.0
$ rasacli --help [COMMAND]
USAGE
  $ rasacli COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [rasacli](#rasacli)
  - [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Examples](#examples)
- [Environment Variables](#environment-variables)
- [Release Notes](#release-notes)
      - [0.4.5 - Oct 7, 2019](#045---oct-7-2019)
      - [0.4.0 - Oct 4, 2019](#040---oct-4-2019)
      - [0.3.0 - Aug 8, 2019](#030---aug-8-2019)
      - [0.2.0 - Aug 6, 2019](#020---aug-6-2019)
      - [0.1.3 - Aug 4, 2019](#013---aug-4-2019)
      - [0.1.2 - Jul 24, 2019](#012---jul-24-2019)
      - [0.1.1 - Jul 23, 2019](#011---jul-23-2019)
- [Developer Notes](#developer-notes)
- [Usage](#usage)
- [Commands](#commands)
  - [`rasacli addstories FILE`](#rasacli-addstories-file)
  - [`rasacli delall`](#rasacli-delall)
  - [`rasacli deldomain`](#rasacli-deldomain)
  - [`rasacli delstories`](#rasacli-delstories)
  - [`rasacli deltemplates`](#rasacli-deltemplates)
  - [`rasacli deltraining`](#rasacli-deltraining)
  - [`rasacli getconfig`](#rasacli-getconfig)
  - [`rasacli getdomain`](#rasacli-getdomain)
  - [`rasacli getentities`](#rasacli-getentities)
  - [`rasacli getstories`](#rasacli-getstories)
  - [`rasacli getstoriesmd`](#rasacli-getstoriesmd)
  - [`rasacli gettraining`](#rasacli-gettraining)
  - [`rasacli help [COMMAND]`](#rasacli-help-command)
  - [`rasacli modelactivate`](#rasacli-modelactivate)
  - [`rasacli modeladdtag`](#rasacli-modeladdtag)
  - [`rasacli modeldelete`](#rasacli-modeldelete)
  - [`rasacli modeldeletetag`](#rasacli-modeldeletetag)
  - [`rasacli modelgettag`](#rasacli-modelgettag)
  - [`rasacli modellist`](#rasacli-modellist)
  - [`rasacli modeltrain`](#rasacli-modeltrain)
  - [`rasacli updconfig FILE`](#rasacli-updconfig-file)
  - [`rasacli upddomain FILE`](#rasacli-upddomain-file)
  - [`rasacli updstories FILE`](#rasacli-updstories-file)
  - [`rasacli updtemplates FILE`](#rasacli-updtemplates-file)
  - [`rasacli updtraining FILE`](#rasacli-updtraining-file)
  - [`rasacli vers`](#rasacli-vers)

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

_See code: [src/commands/addstories.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/addstories.ts)_

## `rasacli delall`

Update domain

```
USAGE
  $ rasacli delall

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

_See code: [src/commands/delall.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/delall.ts)_

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

_See code: [src/commands/deldomain.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/deldomain.ts)_

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

_See code: [src/commands/delstories.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/delstories.ts)_

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

_See code: [src/commands/deltemplates.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/deltemplates.ts)_

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

_See code: [src/commands/deltraining.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/deltraining.ts)_

## `rasacli getconfig`

Get config

```
USAGE
  $ rasacli getconfig

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

_See code: [src/commands/getconfig.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/getconfig.ts)_

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

_See code: [src/commands/getdomain.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/getdomain.ts)_

## `rasacli getentities`

Get entities

```
USAGE
  $ rasacli getentities

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

_See code: [src/commands/getentities.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/getentities.ts)_

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

_See code: [src/commands/getstories.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/getstories.ts)_

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

_See code: [src/commands/getstoriesmd.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/getstoriesmd.ts)_

## `rasacli gettraining`

Get training data

```
USAGE
  $ rasacli gettraining

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

_See code: [src/commands/gettraining.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/gettraining.ts)_

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
  -h, --help               show CLI help
  -m, --model=model        (required) model
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --project=project        [default: default] Project name
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/modelactivate.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/modelactivate.ts)_

## `rasacli modeladdtag`

Add tag to model, enterprise vesion only

```
USAGE
  $ rasacli modeladdtag

OPTIONS
  -h, --help               show CLI help
  -m, --model=model        (required) model
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -t, --tag=tag            (required) tag
  -v, --verbose            verbose
  --password=password      password
  --project=project        [default: default] Project name
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/modeladdtag.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/modeladdtag.ts)_

## `rasacli modeldelete`

Delete a model

```
USAGE
  $ rasacli modeldelete

OPTIONS
  -h, --help               show CLI help
  -m, --model=model        (required) model
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -v, --verbose            verbose
  --password=password      password
  --project=project        [default: default] Project name
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/modeldelete.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/modeldelete.ts)_

## `rasacli modeldeletetag`

Delete tag from model, enterprise vesion only

```
USAGE
  $ rasacli modeldeletetag

OPTIONS
  -h, --help               show CLI help
  -m, --model=model        (required) model
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -t, --tag=tag            (required) tag
  -v, --verbose            verbose
  --password=password      password
  --project=project        [default: default] Project name
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/modeldeletetag.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/modeldeletetag.ts)_

## `rasacli modelgettag`

Get model with tag, downloads zipped model

```
USAGE
  $ rasacli modelgettag

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  -t, --tag=tag            (required) tag
  -v, --verbose            verbose
  --password=password      password
  --project=project        [default: default] Project name
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/modelgettag.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/modelgettag.ts)_

## `rasacli modellist`

Activate a model

```
USAGE
  $ rasacli modellist

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

_See code: [src/commands/modellist.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/modellist.ts)_

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
  --project=project        [default: default] Project name
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/modeltrain.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/modeltrain.ts)_

## `rasacli updconfig FILE`

Update config

```
USAGE
  $ rasacli updconfig FILE

ARGUMENTS
  FILE  Domain yaml file

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

_See code: [src/commands/updconfig.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/updconfig.ts)_

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

_See code: [src/commands/upddomain.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/upddomain.ts)_

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

_See code: [src/commands/updstories.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/updstories.ts)_

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

_See code: [src/commands/updtemplates.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/updtemplates.ts)_

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

_See code: [src/commands/updtraining.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/updtraining.ts)_

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

_See code: [src/commands/vers.ts](https://github.com/rgstephens/rasacli/blob/v0.4.7/src/commands/vers.ts)_

<!-- commandsstop -->
