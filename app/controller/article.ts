import { Controller } from "egg";
import { ApiResponseCode } from "../response/responseCode";
import { ApiResponseMsg } from "../response/responseMsg";
import { ArticleProps } from "../model/article";
import { formateDateToDate } from "../utils/date";

export interface ArticleSearchParams {
  title?: any;
  type_id?: number;
  page?: number;
  pageSize?: number;
}
export interface ArticleParams {
  id: number;
}
class ArticleController extends Controller {
  public async queryList() {
    const { ctx } = this;

    const query: ArticleSearchParams = ctx.query;

    const data = await ctx.service.article.findList(query);
    ctx.success(data);
  }

  public async create() {
    const { ctx } = this;

    ctx.validate({
      title: "string",
      type_id: "number",
      introduce: "string",
      content: "string",
      publish_at: {
        type: "string",
        required: true
      }
    });

    let article = ctx.request.body as ArticleProps;
    article.publish_at = formateDateToDate(article.publish_at);

    const docs = await ctx.service.article.createInstance(article);
    if (docs) {
      return ctx.success();
    }

    ctx.fail();
  }
  public async queryArticle() {
    const { ctx } = this;

    ctx.validate(
      {
        id: /\d+/
      },
      ctx.params
    );

    const { id }: ArticleParams = ctx.params;

    const article = await ctx.service.article.findById(id);
    if (!article) {
      return ctx.fail(
        ApiResponseCode.NOT_FOUND,
        ApiResponseMsg.ARTICLE_TYPE_NOT_FOUND
      );
    }

    ctx.success(article);
  }

  public async updateArticle() {
    const { ctx } = this;
    const { id }: ArticleParams = ctx.params;
    ctx.validate(
      {
        id: "number",
        title: "string",
        type_id: "number",
        introduce: "string",
        content: "string",
        publish_at: {
          type: "string",
          required: false
        }
      },
      {
        id,
        ...ctx.request.body
      }
    );

    const article = ctx.request.body as ArticleProps;

    const articleData: ArticleProps | null = await ctx.service.article.findById(
      id
    );

    if (!articleData) {
      return ctx.fail(
        ApiResponseCode.NOT_FOUND,
        ApiResponseMsg.ARTICLE_TYPE_NOT_FOUND
      );
    }

    const docs = await ctx.service.article.updateById(article, id);

    if (docs) {
      return ctx.success();
    }

    ctx.fail();
  }

  public async removeArticle() {
    const { ctx } = this;

    const params: {
      id: number;
    } = ctx.params;

    ctx.validate(
      {
        id: /\d+/
      },
      params
    );

    const article: ArticleProps | null = await ctx.service.article.findById(
      params.id
    );

    if (!article) {
      return ctx.fail(
        ApiResponseCode.NOT_FOUND,
        ApiResponseMsg.ARTICLE_TYPE_NOT_FOUND
      );
    }

    const docs = await ctx.service.article.removeById(params.id);

    if (docs) {
      return ctx.success();
    }

    ctx.fail();
  }
}

export default ArticleController;
