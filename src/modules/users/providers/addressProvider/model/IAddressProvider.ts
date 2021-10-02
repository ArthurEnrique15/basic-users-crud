import { IAddressDTO } from "@modules/users/dtos/IAddressDTO";

interface IAddressProvider {
    getAddress(cep: string, numero: number): Promise<IAddressDTO>;
}

export { IAddressProvider };
