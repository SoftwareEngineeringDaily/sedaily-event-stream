import redis from 'redis';

import { Producer } from './Producer';

redis.add_command('xadd');

class RedisProducer extends Producer {
  constructor(client) {
    super();
    this.client = client || new redis.RedisClient();
  }

  sendMessage(topic, message, errorCallback) {
    this.client.xadd([topic, '*', 'event', message], (error) => {
      if (error) {
        errorCallback(error);
      }
    });
  }
}

export default { RedisProducer };
