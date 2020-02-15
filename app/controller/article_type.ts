import { Controller } from "egg";
import { ApiResponseCode } from "../response/responseCode";
import { ApiResponseMsg } from "../response/responseMsg";
import { ArticleTypeProps } from "../model/article_type";

export interface ArticleTypeSearchParams {
  name?: any;
  page?: number;
  pageSize?: number;
}

class ArticleTypeController extends Controller {
  public async queryList() {
    const { ctx } = this;

    const query: ArticleTypeSearchParams = ctx.query;

    const data = await ctx.service.articleType.findList(query);

    ctx.success(data);
  }

  public async create() {
    const { ctx } = this;

    ctx.validate({
      name: "string",
      icon: {
        type: "string",
        required: false
      }
    });

    const articleType = ctx.request.body as ArticleTypeProps;

    const hasArticleType: ArticleTypeProps | null = await ctx.service.articleType.findArticleByName(
      articleType.name
    );

    if (hasArticleType) {
      return ctx.fail(
        ApiResponseCode.RESOURCE_EXISTED,
        ApiResponseMsg.ARTICLE_TYPE_EXISTED
      );
    }

    const docs = await ctx.service.articleType.createInstance(articleType);

    if (docs) {
      return ctx.success();
    }

    ctx.fail();
  }
  public async queryArticleType() {
    const { ctx } = this;

    ctx.validate(
      {
        id: /\d+/
      },
      ctx.params
    );

    const { id }: ArticleTypeProps = ctx.params;

    const articleType = await ctx.service.articleType.findById(id);
    if (!articleType) {
      return ctx.fail(
        ApiResponseCode.NOT_FOUND,
        ApiResponseMsg.ARTICLE_TYPE_NOT_FOUND
      );
    }

    ctx.success(articleType);
  }

  public async updateArticleType() {
    const { ctx } = this;
    const { id }: ArticleTypeProps = ctx.params;
    ctx.validate(
      {
        id: /\d+/,
        name: "string",
        icon: "string"
      },
      {
        id,
        ...ctx.request.body
      }
    );

    const articleType = ctx.request.body as ArticleTypeProps;

    const articleTypeData: ArticleTypeProps | null = await ctx.service.articleType.findById(
      id
    );

    if (!articleTypeData) {
      return ctx.fail(
        ApiResponseCode.NOT_FOUND,
        ApiResponseMsg.ARTICLE_TYPE_NOT_FOUND
      );
    }

    const docs = await ctx.service.articleType.updateById(articleType, id);

    if (docs) {
      return ctx.success();
    }

    ctx.fail();
  }

  public async removeArticleType() {
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

    const articleType: ArticleTypeProps | null = await ctx.service.articleType.findById(
      params.id
    );

    if (!articleType) {
      return ctx.fail(
        ApiResponseCode.NOT_FOUND,
        ApiResponseMsg.ARTICLE_TYPE_NOT_FOUND
      );
    }

    const docs = await ctx.service.articleType.removeById(params.id);

    if (docs) {
      return ctx.success();
    }

    ctx.fail();
  }
}

export default ArticleTypeController;
