import { Context } from "egg";
import { Model, DataTypes } from "sequelize";
import { BaseModel, BaseModelProps, BaseModelStatic } from "../core/model";
import Article from "./article";

export interface ArticleTypeProps extends BaseModel, Model {
  id: number;
  name: string;
  icon?: string;
}

export default (app: Context) => {
  const sequelize = app.model;

  const ArticleType = sequelize.define("article_type", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      comment: "文章类别id"
    },
    name: {
      type: DataTypes.STRING(10),
      comment: "文章类别名称"
    },
    icon: {
      type: DataTypes.STRING(12),
      defaultValue: "github",
      comment: "文章类别icon"
    },
    // 注入基本model的配置
    ...BaseModelProps
  }) as BaseModelStatic<ArticleTypeProps>;

  ArticleType.hasOne(Article(app), {
    foreignKey: "id"
  });
  return ArticleType;
};
