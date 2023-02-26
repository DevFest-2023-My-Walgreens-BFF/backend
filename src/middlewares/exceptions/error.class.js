class InvalidParamsError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 400;
    this.name = 'InvalidParamsError';
    if (!message) this.message = 'Invalid Data.';
  }
}
class ValidationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 412;
    this.name = 'ValidationError';
    if (!message) this.message = 'Invalid Data..';
  }
}
class AuthenticationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 400;
    this.name = 'AuthenticationError';
    if (!message) this.message = 'Invalid Data.';
  }
}
class ExistError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 412;
    this.name = 'ExistError';
    if (!message) this.message = 'Invalid Data.';
  }
}
module.exports = {
  InvalidParamsError,
  ValidationError,
  AuthenticationError,
  ExistError,
};
