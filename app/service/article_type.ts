import { Context } from "egg";
import SqlUtils from "../utils/sql";

import BaseService from "../core/service";
import { ArticleType } from "../model/article_type";

export default class ArticleService extends BaseService<ArticleType> {
  constructor(ctx: Context) {
    super(ctx);
    this.model = ctx.model.ArticleType;
  }

  public async findArticleByName(name: string): Promise<ArticleType | null> {
    const articleType = await this.ctx.model.ArticleType.findOne({
      where: {
        name
      },
      ...SqlUtils.queryOptions()
    });

    if (articleType) {
      return articleType.get({ plain: true }) as ArticleType;
    }
    return null;
  }
}
