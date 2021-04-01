import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  // 添加sequelize配置
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'root',
    port: 3306,
    database: 'it666',
    // 注意点: 如果需要使用时间戳, 那么就必须指定当前的时区, 否则会相差8个小时
    timezone: '+08:00',
  };
  // 禁用CSRF安全校验
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // Redis相关配置
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0,
    },
  };
  return config;
};
