import { Application } from "egg";
export default (app: Application) => {
  const { controller, router } = app;
  const apiRouter = router.namespace("/article/type");
  apiRouter.post("/", controller.articleType.create);
};
