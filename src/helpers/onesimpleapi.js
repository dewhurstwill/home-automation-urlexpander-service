const makeRequest = require('./rest');
const config = require('../api/config');

async function expandUrl(shortUrl) {
  const headers = { 'Content-Type': 'application/json' };
  const apiKey = config.thirdparty.onesimpleapi.key;
  const response = await makeRequest(
    'GET',
    `https://onesimpleapi.com/api/unshorten?token=${apiKey}&output=json&url=${shortUrl}`,
    headers
  );
  return response;
}

module.exports = expandUrl;
