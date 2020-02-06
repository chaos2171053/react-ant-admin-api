// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import "egg";
import ExportArticle from "../../../app/model/article";
import ExportArticleType from "../../../app/model/article_type";
import ExportMenu from "../../../app/model/menu";
import ExportRole from "../../../app/model/role";
import ExportRoleMenu from "../../../app/model/roleMenu";
import ExportSms from "../../../app/model/sms";
import ExportUser from "../../../app/model/user";

declare module "egg" {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    ArticleType: ReturnType<typeof ExportArticleType>;
    Menu: ReturnType<typeof ExportMenu>;
    Role: ReturnType<typeof ExportRole>;
    RoleMenu: ReturnType<typeof ExportRoleMenu>;
    Sms: ReturnType<typeof ExportSms>;
    User: ReturnType<typeof ExportUser>;
  }
}
