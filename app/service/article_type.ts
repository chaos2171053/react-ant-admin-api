import { Context } from "egg";
import SqlUtils from "../utils/sql";

import BaseService from "../core/service";
import { ArticleTypeSearchParams } from "../controller/article_type";
import { Op } from "sequelize";
import { ArticleTypeProps } from "../model/article_type";

export default class ArticleTypeService extends BaseService<ArticleTypeProps> {
  constructor(ctx: Context) {
    super(ctx);
    this.model = ctx.model.ArticleType;
  }

  public async findArticleByName(
    name: string
  ): Promise<ArticleTypeProps | null> {
    const articleType = await this.ctx.model.ArticleType.findOne({
      where: {
        name
      },
      ...SqlUtils.queryOptions()
    });

    if (articleType) {
      return articleType.get({ plain: true }) as ArticleTypeProps;
    }
    return null;
  }

  public async findList(params: ArticleTypeSearchParams) {
    let query: ArticleTypeSearchParams = {};

    if (params.name) {
      query.name = {
        [Op.like]: `%${params.name}%`
      };
    }
    return this.findListByKey(query, params);
  }
}
