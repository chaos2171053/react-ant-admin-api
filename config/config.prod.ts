import { EggAppConfig, PowerPartial } from "egg";

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.static = {
    maxAge: 0,
    cacheControl: "no-cache",
    buffer: false
  };

  config.logger = {
    dir: "../logs/prod"
  };
  config.redis = {
    client: {
      port: 6379,
      host: "127.0.0.1",
      password: "chaos666",
      db: 2
    }
  };

  return config;
};
