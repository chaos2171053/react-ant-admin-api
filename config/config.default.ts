/* eslint-disable */
import { EggAppConfig, PowerPartial } from "egg";
import { AliyunSmsConfig, OssConfig } from "../typings";
import baseConfig from "./index";

const authUrl = () => {
  const url = ["/user/login", "/user/login-mobile", "/blog", "/", "/sms"].map(
    api => baseConfig.baseUrl + api
  );
  return url;
};

export default () => {
  const config = {} as PowerPartial<EggAppConfig> & {
    sms: AliyunSmsConfig;
    oss: OssConfig;
  };

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = "_1554196283322_156_chaos";

  config.cluster = {
    listen: {
      port: 3300,
      hostname: "127.0.0.1"
    }
  };

  config.multipart = {
    mode: "file"
  };

  config.security = {
    xframe: {
      enable: false
    },
    csrf: {
      enable: false
    }
  };

  // add your egg config in here
  config.middleware = ["errHandle", "auth"];

  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "chaos666",
    database: "myblog",
    timezone: "+08:00",
    logQueryParameters: true,
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true
    }
  };

  config.redis = {
    client: {
      port: 6379,
      host: "127.0.0.1",
      password: "123456",
      db: 2
    }
  };

  config.auth = {
    url: authUrl()
    // ignore (ctx: Context) {
    //   return ctx.url.indexOf('.') !== -1
    // }
  };

  config.sms = {
    accessKeyId: "xxxx",
    accessKeySecret: "xx",
    endpoint: "https://dysmsapi.aliyuncs.com",
    regionId: "cn-hangzhou",
    verifyCode: {
      signName: "xxx",
      templateCode: "xxx"
    },
    // 单个手机号每天可发送短信条数
    countByMobile: 10,
    // 单个ip每天可发送短信条数
    countByIp: 30
  };

  config.oss = {
    qiniu: {
      accessKey: "MhV0vpgchc_fpT-h51ErOT9j-Y4gKFzAIGkQfn3g",
      secretKey: "gIya7VYQ2-gPuCun7143i50eJgIVmaG1jeT8tzPW",
      scope: "buduangeng365",
      host: "http://cdn.buduangeng365.cn"
    },
    local: {
      prefix: "/public/image",
      dir: "/app/public/image"
    }
  };
  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
  };
  // the return config will combines to EggAppConfig
  return {
    ...config
  };
};
