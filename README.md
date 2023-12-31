# tech-test-lved

## Requirements

* Node 20
* Git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/Levias13/tech-test-lved.git
cd tech-test-lved
```

```bash
npm install
```

## Executions
### Unit test

Run unit test with code coverage report

```bash
npm run test
```

### Cypress test scripts

Run cypress test scripts in headed or headless mode with default browser (Electron)

```bash
npm run cy:headless
```

```bash
npm run cy:headed
```

Run cypress test scripts in headed or headless mode with chrome browser

```bash
npm run cy:headless:chrome
```

```bash
npm run cy:headed:chrome
```

Open cypress interactive mode

```bash
npm run cy
```

## Docs

Test Case document and KPI Analysis can be found on:

```bash
cd tech-test-lved/docs
```

## Github Action CI

On every pull request to main branch a Github Workflow Action is going to be executed to run unit test, generate code coverage report and upload artifacts.