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
    const options = {
      include: [
        {
          model: this.ctx.model.ArticleType,
          attributes: ["name", "id"],
          required: false,
          as: "type"
        }
      ]
    };
    if (params.title) {
      query.title = {
        [Op.like]: `%${params.title}%`
      };
    }
    if (params.type_id) {
      query.type_id = params.type_id;
    }

    let queryResult = await this.findListByKey(query, params, options);

    queryResult.list.forEach(
      (article: ArticleProps & { type?: object | string }) => {
        let articleObj = article.get({ plain: true }) as ArticleProps & {
          type: { name: string; id: number };
        };
        const date = formatDate(articleObj.publish_at);
        article.setDataValue("publish_at", date);
        articleObj.type.name &&
          article.setDataValue("type_name", articleObj.type.name);
      }
    );
    return queryResult;
  }
}
