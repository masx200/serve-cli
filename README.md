# serve-cli

## Description

A simple zero-configuration command-line static file server based on koa2.

## Installation

#### Globally via yarn

```bash
yarn global add @masx200/serve-cli
```

#### Running on-demand:

```bash
npx @masx200/serve-cli [options]
```

## Examples

```bash
npx @masx200/serve-cli --help
```

```txt
serve-cli
usage: serve-cli [options]

options:
  --path       Path to folder [process.cwd()]
  --host       Host to use [0.0.0.0]
  --port       Port to use [4000]
  --ssl        Enable https [false]
  --sslKey     Path to ssl key file [self-signed]
  --sslCert    Path to ssl cert file [self-signed]
  --help       Print this list and exit
```

## TLS/SSL

First, you need to make sure that openssl is installed correctly, and you have `key.pem` and `cert.pem` files.

Then you need to run the server with `--ssl` for enabling SSL and `--sslKey=key.pem --sslCert=cert.pem` for your certificate files.
