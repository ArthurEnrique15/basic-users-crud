import { Category } from "@modules/categories/infra/typeorm/entities/Category";

import { Address } from "../infra/typeorm/entities/Address";

interface ICreateUserDTO {
    name: string;
    address: Address;
    category: Category;
}

export { ICreateUserDTO };
