import { Controller } from "egg";
import { ApiResponseCode } from "../response/responseCode";
import { ApiResponseMsg } from "../response/responseMsg";
import { ArticleType } from "../model/article_type";

class ArticleTypeController extends Controller {
  // public async queryList() {
  //     const { ctx } = this;

  //     const query: UserSearchParams = ctx.query;

  //     const data = await ctx.service.user.findList(query);

  //     ctx.success(data);
  // }

  public async create() {
    const { ctx } = this;

    ctx.validate({
      name: "string",
      icon: {
        type: "string",
        required: false
      }
    });

    const articleType = ctx.request.body as ArticleType;

    const hasArticleType: ArticleType | null = await ctx.service.articleType.findArticleByName(
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

  // public async updateUser() {
  //     const { ctx } = this;

  //     ctx.validate({
  //         id: "number",
  //         name: "string",
  //         account: "string",
  //         mobile: "string",
  //         roleId: "number",
  //         status: "number"
  //     });

  //     const user = ctx.request.body as User;

  //     const userData: User | null = await ctx.service.user.findById(user.id);

  //     if (!userData) {
  //         return ctx.fail(
  //             ApiResponseCode.USER_NOT_FOUND,
  //             ApiResponseMsg.USER_NOT_FOUND
  //         );
  //     }

  //     user.password = encodeUserPwd(user.password);

  //     const docs = await ctx.service.user.updateById(user, user.id);

  //     if (docs) {
  //         return ctx.success();
  //     }

  //     ctx.fail();
  // }

  // public async removeUser() {
  //     const { ctx } = this;

  //     const params: {
  //         id: number;
  //     } = ctx.params;

  //     ctx.validate(
  //         {
  //             id: /\d+/
  //         },
  //         params
  //     );

  //     const user: User | null = await ctx.service.user.findById(params.id);

  //     if (!user) {
  //         return ctx.fail(
  //             ApiResponseCode.USER_NOT_FOUND,
  //             ApiResponseMsg.USER_NOT_FOUND
  //         );
  //     }

  //     const docs = await ctx.service.user.removeById(params.id);

  //     if (docs) {
  //         return ctx.success();
  //     }

  //     ctx.fail();
  // }

  // public async updateUserPwd() {
  //     const { ctx } = this;

  //     ctx.validate({
  //         mobile: /\d{11}/,
  //         code: /\d{6}/,
  //         password: "string"
  //     });

  //     const data: UpdateUserPwdBody = ctx.request.body;

  //     const code = await ctx.service.sms.findCodeByMobileAndCode(
  //         data.mobile,
  //         data.code
  //     );

  //     if (!code) {
  //         return ctx.fail(ApiResponseCode.PARAMS_ERROR, ApiResponseMsg.CODE_ERROR);
  //     }

  //     const user = await ctx.service.user.findUserByMobile(data.mobile);

  //     if (!user) {
  //         return ctx.fail(
  //             ApiResponseCode.USER_NOT_FOUND,
  //             ApiResponseMsg.USER_NOT_FOUND
  //         );
  //     }

  //     const pwd = encodeUserPwd(data.password);

  //     const docs = await ctx.service.user.updateById({ password: pwd }, user.id);

  //     if (docs) {
  //         return ctx.success();
  //     }

  //     ctx.fail();
  // }
}

export default ArticleTypeController;
