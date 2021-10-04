import { Category } from "@modules/categories/infra/typeorm/entities/Category";

import { Address } from "../infra/typeorm/entities/Address";

interface IUpdateUserDTO {
    id: string;
    name?: string;
    cpf?: string;
    address?: Address;
    category?: Category;
}

export { IUpdateUserDTO };
