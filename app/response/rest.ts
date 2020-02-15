import { ApiResponse } from "../../typings/iny";
import { ApiResponseCode } from "./responseCode";
import { ApiResponseMsg } from "./responseMsg";

export function buildSuccess<T>(data?: any): ApiResponse<T> {
  return buildResponse<T>(
    ApiResponseCode.SUCCESS,
    data || {},
    ApiResponseMsg.SUCCESS
  );
}

export function buildFail<T>(
  code: ApiResponseCode,
  message: ApiResponseMsg
): ApiResponse<T> {
  return buildResponse<T>(code, {} as T, message);
}

export function buildResponse<T>(
  code: ApiResponseCode,
  data: T,
  message: ApiResponseMsg
): ApiResponse<T> {
  return {
    code,
    data,
    message
  };
}
