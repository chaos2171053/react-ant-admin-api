import { Application } from "egg";
export default (app: Application) => {
  const { controller, router } = app;
  const apiRouter = router.namespace("/article/type");
  /**
   * @api {post} /article/type/ 创建文章类别
   * @apiName CreateArticleType
   * @apiGroup Article
   *
   * @apiHeader {String} token 用户token
   *
   * @apiParam {String} name 文章类别名称
   * @apiParam {String} icon 图标名称，使用antd-design
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Object} data 响应结果
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       code: 200,
   *       msg: 'success',
   *       data: {}
   *     }
   */
  apiRouter.post("/", controller.articleType.create);

  /**
   * @api {get} /article/type/list 查找文章列表
   * @apiName QueryArticleTypeList
   * @apiGroup Article
   *
   * @apiHeader {String} token 用户token
   *
   * @apiParam {String} name 文章类别名称
   * @apiParam {Number} size 分页大小
   * @apiParam {Number} page 页码
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Object} data 响应结果
   * @apiSuccess {Object} data.list 文章类别列表
   * @apiSuccess {Number} data.list.id 文章类别id
   * @apiSuccess {String} data.list.name 文章类别名称
   * @apiSuccess {Object} data.page 分页信息
   * @apiSuccess {Object} data.page.dataTotal 总条数
   * @apiSuccess {Object} data.page.size 分页大小
   * @apiSuccess {Object} data.page.page 当前是第几页
   * @apiSuccess {Object} data.page.pageTotal 总页码
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       code: 200,
   *       msg: 'success',
   *       data: {
   *         list: [
   *        {
   *             "id": 12,
   *            "name": "随笔",
   *             "icon": "github"
   *         },
   *         ],
   *         page: {
   *           dataTotal: 100,
   *           size: 5,
   *           page: 5,
   *           pageTotal: 20
   *         }
   *       }
   *     }
   */
  apiRouter.get("/list", controller.articleType.queryList);

  /**
   * @api {get} /article/type/:id 查找文章类别
   * @apiName QueryArticleType
   * @apiGroup Article
   *
   * @apiHeader {String} token 用户token
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Array} data 响应结果
   * @apiSuccess {Number} data.id 文章类别id
   * @apiSuccess {String} data.name 文章类别名称
   * @apiSuccess {String} data.icon 文章类别icon
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       code: 200,
   *       msg: 'success',
   *       data: {
   *            "id": 12,
   *            "name": "随笔",
   *            "icon": "github"
   *      }
   *     }
   */

  apiRouter.get("/:id", controller.articleType.queryArticleType);

  /**
   * @api {put} /article/type/:id 修改文章类别
   * @apiName UpdateArticleType
   * @apiGroup Article
   *
   * @apiHeader {String} token 用户token
   * @apiParam {String}  id 文章类别的id
   * @apiParam {String} name 文章类别名称
   * @apiParam {String} icon 图标名称，使用antd-design
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Object} data 响应结果
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       code: 200,
   *       msg: 'success',
   *       data: {}
   *     }
   */
  apiRouter.put("/:id", controller.articleType.updateArticleType);

  /**
   * @api {delete} /user/:id 删除文章类别
   * @apiName deleteArticleType
   * @apiGroup Article
   *
   * @apiHeader {String} token 用户token
   *
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Object} data 响应结果
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       code: 200,
   *       msg: 'success',
   *       data: {}
   *     }
   */
  apiRouter.delete("/:id", controller.articleType.removeArticleType);
};
