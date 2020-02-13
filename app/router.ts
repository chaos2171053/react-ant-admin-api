import { Application } from "egg";
import index from "./router/index";
import user from "./router/user";
import sms from "./router/sms";
import menu from "./router/menu";
import role from "./router/role";
import articleType from "./router/artile_type";
import article from "./router/article";
import config from "../config/index";

export default (app: Application) => {
  const { router } = app;

  router.prefix(config.baseUrl);

  index(app);
  user(app);
  sms(app);
  menu(app);
  role(app);
  articleType(app);
  article(app);
};
