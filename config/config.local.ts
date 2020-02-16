import { EggAppConfig, PowerPartial } from "egg";

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.static = {
    maxAge: 0,
    cacheControl: "no-cache"
  };
  config.redis = {
    client: {
      port: 6379,
      host: "127.0.0.1",
      // password: "123456",
      db: 2
    }
  };
  return config;
};
