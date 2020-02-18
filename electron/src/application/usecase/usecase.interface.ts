export interface IUsecase {
  execute(request: any): Promise<any>;
}
