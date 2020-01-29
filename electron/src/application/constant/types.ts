export const TYPES = {

  // usecases
  UserUsecase: Symbol.for('UserUsecase'),

  // services
  UserService: Symbol.for('UserService'),
  LoginService: Symbol.for('LoginSerice'),

  // mappers
  UserMapper: Symbol.for('UserMapper'),
  AuthMapper: Symbol.for('AuthMapper'),

  // middlewares
  CheckDuplicateUsernameMiddleware: Symbol.for('CheckDuplicateUsernameMiddleware'),
  CheckUserExistsMiddleware: Symbol.for('CheckUserExistsMiddleware'),

};
