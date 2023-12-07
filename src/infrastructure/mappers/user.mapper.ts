import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, password, roles } = object;
    if (!_id || !id) {
      throw CustomError.badRequest("El id es requerido");
    }
    if (!name) {
      throw CustomError.badRequest("El nombre es requerido");
    }
    if (!email) {
      throw CustomError.badRequest("El email es requerido");
    }
    if (!password) {
      throw CustomError.badRequest("El password es requerido");
    }
    if (!roles) {
      throw CustomError.badRequest("El rol es requerido");
    }
    return new UserEntity(id || _id, name, email, password, roles);
  }
}
