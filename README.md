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

Run cypress test scripts in headless mode with default browser (Electron)

```bash
npm run cy:headless
```

Run cypress test scripts in headless mode with chrome browser

```bash
npm run cy:headless:chrome
```

Open cypress interactive mode

```bash
npm run cy
```