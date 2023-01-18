enum statusMessage {
  success = "success",
  failed = "failed",
}

interface ResponseJson {
  status: statusMessage.success | statusMessage.failed;
  statusCode: number;
  msg: string;
}

export { ResponseJson, statusMessage };
