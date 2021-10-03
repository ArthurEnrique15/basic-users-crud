import { Address } from "../infra/typeorm/entities/Address";

interface IAddressRepository {
    create(address: Address): Promise<Address>;
}

export { IAddressRepository };
