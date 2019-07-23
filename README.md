rasacli
=======

Rasa API CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/rasacli.svg)](https://npmjs.org/package/rasacli)
[![CircleCI](https://circleci.com/gh/rgstephens/rasacli/tree/master.svg?style=shield)](https://circleci.com/gh/rgstephens/rasacli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/rasacli.svg)](https://npmjs.org/package/rasacli)
[![License](https://img.shields.io/npm/l/rasacli.svg)](https://github.com/rgstephens/rasacli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g rasacli
$ rasacli COMMAND
running command...
$ rasacli (-v|--version|version)
rasacli/0.1.0 darwin-x64 node-v12.4.0
$ rasacli --help [COMMAND]
USAGE
  $ rasacli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
- [rasacli](#rasacli)
- [Usage](#usage)
- [Commands](#commands)
  - [`rasacli addstories FILE`](#rasacli-addstories-file)
  - [`rasacli delstories`](#rasacli-delstories)
  - [`rasacli deltraining [PROJECT]`](#rasacli-deltraining-project)
  - [`rasacli getdomain`](#rasacli-getdomain)
  - [`rasacli getstories`](#rasacli-getstories)
  - [`rasacli getstoriesmd`](#rasacli-getstoriesmd)
  - [`rasacli gettraining [PROJECT]`](#rasacli-gettraining-project)
  - [`rasacli help [COMMAND]`](#rasacli-help-command)
  - [`rasacli upddomain FILE`](#rasacli-upddomain-file)

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
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/addstories.ts](https://github.com/rgstephens/rasacli/blob/v0.1.0/src/commands/addstories.ts)_

## `rasacli delstories`

Delete all stories

```
USAGE
  $ rasacli delstories

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/delstories.ts](https://github.com/rgstephens/rasacli/blob/v0.1.0/src/commands/delstories.ts)_

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
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/deltraining.ts](https://github.com/rgstephens/rasacli/blob/v0.1.0/src/commands/deltraining.ts)_

## `rasacli getdomain`

Get training data

```
USAGE
  $ rasacli getdomain

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/getdomain.ts](https://github.com/rgstephens/rasacli/blob/v0.1.0/src/commands/getdomain.ts)_

## `rasacli getstories`

Get stories

```
USAGE
  $ rasacli getstories

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/getstories.ts](https://github.com/rgstephens/rasacli/blob/v0.1.0/src/commands/getstories.ts)_

## `rasacli getstoriesmd`

Get stories as markdown

```
USAGE
  $ rasacli getstoriesmd

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: localhost] hostname
  -p, --port=port          [default: 80] port
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/getstoriesmd.ts](https://github.com/rgstephens/rasacli/blob/v0.1.0/src/commands/getstoriesmd.ts)_

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
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/gettraining.ts](https://github.com/rgstephens/rasacli/blob/v0.1.0/src/commands/gettraining.ts)_

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
  --password=password      password
  --protocol=protocol      [default: http] protocol
  --token=token            token
  --username=username      [default: me] username
```

_See code: [src/commands/upddomain.ts](https://github.com/rgstephens/rasacli/blob/v0.1.0/src/commands/upddomain.ts)_
<!-- commandsstop -->
