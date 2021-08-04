# serve-cli

## Description

A simple zero-configuration command-line static file server based on koa2.

支持范围请求，条件请求，内容压缩，跨域访问，添加 etag 头部

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
  --path,-pa       Path to folder [process.cwd()]
  --host,-h       Host to use [0.0.0.0]
  --port,-po       Port to use [4000]
  --ssl,-s        Enable https [false]
  --sslKey     Path to ssl key file [self-signed]
  --sslCert    Path to ssl cert file [self-signed]
  --help,-h       Print this list and exit
```

## TLS/SSL

First, you need to make sure that openssl is installed correctly, and you have `key.pem` and `cert.pem` files.

Then you need to run the server with `--ssl` for enabling SSL and `--sslKey=key.pem --sslCert=cert.pem` for your certificate files.
