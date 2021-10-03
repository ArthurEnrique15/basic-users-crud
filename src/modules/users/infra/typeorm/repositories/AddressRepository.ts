import { getRepository, Repository } from "typeorm";

import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";

import { Address } from "../entities/Address";

class AddressRepository implements IAddressRepository {
    private repository: Repository<Address>;

    constructor() {
        this.repository = getRepository(Address);
    }

    create(address: Address): Promise<Address> {
        const createdAddress = this.repository.save(address);
        return createdAddress;
    }
}

export { AddressRepository };
