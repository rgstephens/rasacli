rasaapi
=======

Rasa API CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/rasaapi.svg)](https://npmjs.org/package/rasaapi)
[![CircleCI](https://circleci.com/gh/rgstephens/rasaapi/tree/master.svg?style=shield)](https://circleci.com/gh/rgstephens/rasaapi/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/rasaapi.svg)](https://npmjs.org/package/rasaapi)
[![License](https://img.shields.io/npm/l/rasaapi.svg)](https://github.com/rgstephens/rasaapi/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g rasacli
$ rasaapi COMMAND
running command...
$ rasaapi (-v|--version|version)
rasacli/0.1.0 darwin-x64 node-v12.4.0
$ rasaapi --help [COMMAND]
USAGE
  $ rasaapi COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`rasaapi addstories FILE`](#rasaapi-addstories-file)
* [`rasaapi delstories`](#rasaapi-delstories)
* [`rasaapi deltraining [PROJECT]`](#rasaapi-deltraining-project)
* [`rasaapi getdomain`](#rasaapi-getdomain)
* [`rasaapi getstories`](#rasaapi-getstories)
* [`rasaapi getstoriesmd`](#rasaapi-getstoriesmd)
* [`rasaapi gettraining [PROJECT]`](#rasaapi-gettraining-project)
* [`rasaapi help [COMMAND]`](#rasaapi-help-command)
* [`rasaapi upddomain FILE`](#rasaapi-upddomain-file)

## `rasaapi addstories FILE`

Add stories

```
USAGE
  $ rasaapi addstories FILE

ARGUMENTS
  FILE  Markdown story files (accepts multiple files)

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/addstories.ts](https://github.com/rgstephens/rasaapi/blob/v0.1.0/src/commands/addstories.ts)_

## `rasaapi delstories`

Delete all stories

```
USAGE
  $ rasaapi delstories

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/delstories.ts](https://github.com/rgstephens/rasaapi/blob/v0.1.0/src/commands/delstories.ts)_

## `rasaapi deltraining [PROJECT]`

Delete all training data

```
USAGE
  $ rasaapi deltraining [PROJECT]

ARGUMENTS
  PROJECT  [default: default] Project name

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/deltraining.ts](https://github.com/rgstephens/rasaapi/blob/v0.1.0/src/commands/deltraining.ts)_

## `rasaapi getdomain`

Get training data

```
USAGE
  $ rasaapi getdomain

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/getdomain.ts](https://github.com/rgstephens/rasaapi/blob/v0.1.0/src/commands/getdomain.ts)_

## `rasaapi getstories`

Get stories

```
USAGE
  $ rasaapi getstories

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/getstories.ts](https://github.com/rgstephens/rasaapi/blob/v0.1.0/src/commands/getstories.ts)_

## `rasaapi getstoriesmd`

Get stories as markdown

```
USAGE
  $ rasaapi getstoriesmd

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/getstoriesmd.ts](https://github.com/rgstephens/rasaapi/blob/v0.1.0/src/commands/getstoriesmd.ts)_

## `rasaapi gettraining [PROJECT]`

Get training data

```
USAGE
  $ rasaapi gettraining [PROJECT]

ARGUMENTS
  PROJECT  [default: default] Project name

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/gettraining.ts](https://github.com/rgstephens/rasaapi/blob/v0.1.0/src/commands/gettraining.ts)_

## `rasaapi help [COMMAND]`

display help for rasaapi

```
USAGE
  $ rasaapi help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_

## `rasaapi upddomain FILE`

Update domain

```
USAGE
  $ rasaapi upddomain FILE

ARGUMENTS
  FILE  Domain yaml file

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/upddomain.ts](https://github.com/rgstephens/rasaapi/blob/v0.1.0/src/commands/upddomain.ts)_
<!-- commandsstop -->
