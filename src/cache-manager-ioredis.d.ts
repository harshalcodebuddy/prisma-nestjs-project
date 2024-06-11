declare module 'cache-manager-ioredis' {
    import { CacheStoreFactory } from '@nestjs/common';
  
    const cacheManagerRedisStore: CacheStoreFactory;
    export = cacheManagerRedisStore;
  }
  