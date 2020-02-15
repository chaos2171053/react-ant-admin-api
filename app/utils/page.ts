import { PageParams, PageSql, PageInfo } from "../../typings";
import { toNumber } from "./index";

class Page {
  page: number;
  pageSize: number;
  dataTotal: number;
  pageTotal: number;

  constructor({ page, pageSize }: PageParams) {
    this.page = toNumber(page, 1);
    this.pageSize = toNumber(pageSize, 10);
  }

  setTotal(count: number) {
    this.dataTotal = count;

    this.pageTotal = Math.ceil(count / this.pageSize);
  }

  buildOptions(): PageSql {
    return {
      limit: this.pageSize,
      offset: (this.page - 1) * this.pageSize
    };
  }

  getData(): PageInfo {
    return {
      page: this.page,
      pageSize: this.pageSize,
      dataTotal: this.dataTotal,
      pageTotal: this.pageTotal
    };
  }
}

export default Page;
