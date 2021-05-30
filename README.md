Create your personal access token at

- https://sandbox.zenodo.org/account/settings/applications/

Create a file named `.env` by 

```shell
cp example.env .env
```

and update its contents like so:

```text
ZENODO_SANDBOX_ACCESS_TOKEN=<your access token for zenodo sandbox>
ZENODO_ACCESS_TOKEN=
```

Install the dependencies with

```shell
npm install
```

Generate the JavaScript from the TypeScript with

```shell
tsc -p tsconfig.json
```

Run the tool (note: will generate entries on Zenodo Sandbox https://sandbox.zenodo.org/deposit)

```shell
node build/index.js
```
