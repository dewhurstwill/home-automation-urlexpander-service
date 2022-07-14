const app = require('./app');

const port = process.env.PORT || 5000;

if (!process.env.ONESIMPLEAPI_KEY) {
  console.error('Service requires an API key from onesimpleapi.com before starting up [Env var: ONESIMPLEAPI_KEY]');
  process.exit(1);
}

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
