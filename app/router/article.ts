import { Application } from "egg";
export default (app: Application) => {
  const { controller, router } = app;
  const apiRouter = router.namespace("/article");
  const blogRouter = router.namespace("/blog/article"); //前台blog接口

  apiRouter.post("/", controller.article.create);
  apiRouter.get("/list", controller.article.queryList);
  apiRouter.get("/:id", controller.article.queryArticle);
  apiRouter.put("/:id", controller.article.updateArticle);
  apiRouter.delete("/:id", controller.article.removeArticle);

  // blog 前台接口
  blogRouter.get("/list", controller.article.queryList);
  blogRouter.get("/:id", controller.article.queryArticle);
};
