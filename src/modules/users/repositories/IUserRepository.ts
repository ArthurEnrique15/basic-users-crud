import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUserRepository {
    create({ name, address, category_id }: ICreateUserDTO): Promise<User>;
    // update();
    // softDelete();
    // restore();
    // list();
}

export { IUserRepository };
