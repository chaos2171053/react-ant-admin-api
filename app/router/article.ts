import { Application } from "egg";
export default (app: Application) => {
  const { controller, router } = app;
  const apiRouter = router.namespace("/article");
  apiRouter.post("/", controller.article.create);
  apiRouter.get("/list", controller.article.queryList);
  apiRouter.get("/:id", controller.article.queryArticle);
  apiRouter.put("/:id", controller.article.updateArticle);
  apiRouter.delete("/:id", controller.article.removeArticle);
};
