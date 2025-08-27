export type ResponseType<T> = {
  response: T;
  responseIndicator: "success" | "fail";
  statusCode: string;
  responseMessage: string;
};

export const emptyError:ResponseType<null> = {
  response: null,
  responseIndicator:"fail",
  statusCode: '500',
  responseMessage: "Something went wrong"
}