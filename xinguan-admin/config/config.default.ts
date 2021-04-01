import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1615890922890_9957';

  // add your egg config in here
  config.middleware = [ 'auth' ];
  config.auth = {
    // 需要权限控制的请求地址列表
    authUrls: [
      '/users',
    ],
  };
  // 文件上传相关配置
  config.multipart = {
    mode: 'file',
    fileSize: '10mb',
    fileExtensions: [ '.xls', '.xlsx' ],
  };

  // 跨域相关配置
  config.cors = {
    origin: 'http://127.0.0.1:8080', // 允许哪个地址跨域请求
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH', // 允许哪些方法跨域请求
    credentials: true, // 允许前端携带cookie
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
