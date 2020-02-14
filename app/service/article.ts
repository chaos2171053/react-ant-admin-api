import { Context } from "egg";
import SqlUtils from "../utils/sql";

import BaseService from "../core/service";
import { ArticleProps } from "../model/article";
import { ArticleSearchParams } from "../controller/article";
import { Op } from "sequelize";
import { formatDate } from "../utils/date";

export default class ArticleService extends BaseService<ArticleProps> {
  constructor(ctx: Context) {
    super(ctx);
    this.model = ctx.model.Article;
  }

  public async findArticleByName(title: string): Promise<ArticleProps | null> {
    const articleType = await this.ctx.model.Article.findOne({
      where: {
        title
      },
      ...SqlUtils.queryOptions()
    });

    if (articleType) {
      return articleType.get({ plain: true }) as ArticleProps;
    }
    return null;
  }

  public async findList(params: ArticleSearchParams) {
    let query: ArticleSearchParams = {};

    if (params.title) {
      query.title = {
        [Op.like]: `%${params.title}%`
      };
    }
    if (params.type_id) {
      query.type_id = params.type_id;
    }
    let queryResult = await this.findListByKey(query, params);
    queryResult.list.forEach((article: ArticleProps) => {
      const date = formatDate(article.getDataValue("publish_at"));
      article.setDataValue("publish_at", date);
    });
    return queryResult;
  }
}
