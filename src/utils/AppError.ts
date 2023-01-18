class AppError extends Error {
  constructor(message: string, public readonly statusCode: number) {
    super(message);
  }
}

export default AppError;
