import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDatasource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const user = await UserModel.findOne({ email });
      if (!user) throw CustomError.badRequest("El email no existe");

      const isMatching = this.comparePassword(password, user.password);
      if (!isMatching)
        throw CustomError.badRequest("La contraseña es incorrecta");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;
    try {
      // 1. verificar si el correo ya existe
      const exist = await UserModel.findOne({ email });
      if (exist) throw CustomError.badRequest("El usuario ya existe");

      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password),
      });
      // 2. hashear la contraseña
      await user.save();
      // 3. Mapear los datos a la entidad
      // Todo: falta un mapper
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
