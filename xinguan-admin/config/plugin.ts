import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // 在ts中使用sequelize
  // 开启sequelize-typescript
  sequelize: {
    enable: true,
    package: 'egg-sequelize-ts',
  },
  // 开启前端数据校验
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // 开启跨域插件
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 开启Redis存储
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
};

export default plugin;
