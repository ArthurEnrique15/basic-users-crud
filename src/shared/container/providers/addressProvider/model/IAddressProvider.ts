import { Address } from "@modules/users/infra/typeorm/entities/Address";

interface IAddressProvider {
    getAddress(cep: string, numero: number): Promise<Address>;
}

export { IAddressProvider };
