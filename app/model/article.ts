import { Model, DataTypes } from "sequelize";
import { BaseModel, BaseModelProps, BaseModelStatic } from "../core/model";
import { Context } from "egg";
import * as moment from "moment";
//import ArticleType from './article_type'
export interface ArticleProps extends BaseModel, Model {
  id: number;
  title: string;
  type_id: number;
  introduce: string;
  content: string;
  view_count?: number;
  publish_at?: string;
}
export default (app: Context) => {
  const sequelize = app.model;

  const Article = sequelize.define(
    "article",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "文章id"
      },
      title: {
        type: DataTypes.STRING(30),
        comment: "文章标题"
      },
      type_id: {
        type: DataTypes.INTEGER,
        comment: "文章类别id"
      },
      introduce: {
        type: DataTypes.TEXT,
        comment: "文章简介"
      },
      content: {
        type: DataTypes.TEXT,
        comment: "文章内容"
      },
      view_count: {
        type: DataTypes.INTEGER,
        comment: "浏览次数"
      },
      publish_at: {
        type: DataTypes.STRING,
        defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
        comment: "发布时间"
      },

      // 注入基本model的配置
      ...BaseModelProps
    },
    {
      indexes: [
        { fields: ["mobile"] },
        { fields: ["account"] },
        { fields: ["role_id"] }
      ]
    }
  ) as BaseModelStatic<ArticleProps>;

  // Article.belongsTo(ArticleType(app), {
  //   foreignKey: 'type_id',
  //   targetKey: 'id',
  //   as: 'type'
  // });

  return Article;
};
