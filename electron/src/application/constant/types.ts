export const TYPES = {

  // usecases
  SignupUsecase: Symbol.for('SignupUsecase'),

  // services
  UserService: Symbol.for('UserService'),
  LoginService: Symbol.for('LoginSerice'),

  // mapper
  Mapper: Symbol.for('Mapper'),

  // middlewares
  CheckDuplicateUsernameMiddleware: Symbol.for('CheckDuplicateUsernameMiddleware'),
  CheckUserExistsMiddleware: Symbol.for('CheckUserExistsMiddleware'),

};
