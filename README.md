# npm-shrinkwrap-install

Automatic synchronise shrinkwrap file with package install/update/uninstall.


# Install
```bash
$ npm install npm-shrinkwrap-install -g
```

This is a CLI-only package (for now).

# Usage
## Install/Update a package

```bash
$ npm-install babel@latest --save
```

You could manually alter the version in package.json and run `npm-install` as well.


**Notice:**

Before updating shrinkwrap, the script will try to verify node_modules content with your package.json. Which means:
- Any package not included in `dependencies` will be pruned. So it is mandatory to use `--save` when installing new packages.
- Any package with non-strict version description (^, ~, 0.2.x, \*, latest) in package.json will be updated. If you which to opt out this automatical update check, just use a strict version like 0.2.3.

## Uninstall a package

```bash
$ npm-uninstall babel --save
```

Shrinkwrap file will be automatically in sync with your dependencies in package.json.

**Notice:**

If `--save` is omitted, the script will generate an error since node_modules content does not agree with your package.json.

## Create shrinkwrap file manually

```bash
$ npm-shrinkwrap
```

# Commands and Aliases

## Install
`npm-install`
`npm-i`

Accepts all arguments for `npm install`

## Uninstall
`npm-uninstall`
`npm-un`
`npm-remove`
`npm-rm`
`npm-r`

Accepts all arguments for `npm uninstall`

## Shrinkwrap
`npm-shrinkwrap`

Accepts all arguments for Uber's [npm-shrinkwrap](http://github.com/uber/npm-shrinkwrap)

# Credit

This script is largely based on Uber's [npm-shrinkwrap](http://github.com/uber/npm-shrinkwrap). At the time of the writing, their tool does not support [scoped package](https://docs.npmjs.com/misc/scope). A [pull-request](https://github.com/uber/npm-shrinkwrap/pull/80) is created to rectify this issue and yet to be accepted.

As a temporary measure, I've forked their project and applied my patch to support scoped package: [@th507/npm-shrinkwrap](https://www.npmjs.com/package/@th507/npm-shrinkwrap). `npm-shrinkwrap-install` is currently dependent upon @th507/npm-shrinkwrap.

# License

Copyright (c) 2015 Jingwei "John" Liu

Licensed under the MIT license.
