const express = require('express');
const redis = require('redis');
const crypto = require('crypto');
const config = require('./config');
const {
  expandUrl
} = require('../helpers');

const router = express.Router();
const redisClient = redis.createClient({ url: config.redis.connectionString });

router.post('/', async (req, res) => {
  await redisClient.connect();
  const { schema } = config.expandUrl;
  try {
    const { shortUrl } = await schema.validateAsync(req.body);
    const hashKey = crypto.createHash('md5').update(shortUrl).digest('hex');
    const cachedResponse = await redisClient.get(hashKey);
    if (cachedResponse) {
      await redisClient.quit();
      return res.json({ expandedUrl: JSON.parse(cachedResponse) });
    }
    const expandedUrl = await expandUrl(shortUrl);
    await redisClient.set(hashKey, JSON.stringify(expandedUrl));
    await redisClient.quit();
    return res.json({ expandedUrl });
  } catch (err) {
    await redisClient.quit();
    if (err && err.details && err.details[0].message) {
      return res.status(422).json({
        // schema: config.serviceInfo.routes[2].schema.POST,
        message: err.details[0].message
      });
    }
    return res.status(422).json({ message: err });
  }
});

module.exports = router;
