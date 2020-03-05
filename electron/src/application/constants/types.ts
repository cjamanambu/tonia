export const TYPES = {

  // usecases
  SignupUsecase: Symbol.for('SignupUsecase'),
  CreateuserUsecase: Symbol.for('CreateuserUsecase'),
  LoginUsecase: Symbol.for('LoginUsecase'),

  // services
  UserService: Symbol.for('UserService'),

  // mapper
  Mapper: Symbol.for('Mapper'),

  // middlewares
  CheckDuplicateEmailMiddleware: Symbol.for('CheckDuplicateEmailMiddleware'),
  CheckUserExistsMiddleware: Symbol.for('CheckUserExistsMiddleware'),
  CheckDuplicateNameMiddleware: Symbol.for('CheckDuplicateNameMiddleware'),

};
