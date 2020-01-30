export const TYPES = {

  // usecases
  SignupUsecase: Symbol.for('SignupUsecase'),
  CreateuserUsecase: Symbol.for('CreateuserUsecase'),
  LoginUsecase: Symbol.for('LoginUsecase'),
  // services
  UserService: Symbol.for('UserService'),
  LoginService: Symbol.for('LoginSerice'),

  // mapper
  Mapper: Symbol.for('Mapper'),

  // middlewares
  CheckDuplicateUsernameMiddleware: Symbol.for('CheckDuplicateUsernameMiddleware'),
  CheckUserExistsMiddleware: Symbol.for('CheckUserExistsMiddleware'),
  CheckDuplicateNameMiddleware: Symbol.for('CheckDuplicateNameMiddleware'),

};
