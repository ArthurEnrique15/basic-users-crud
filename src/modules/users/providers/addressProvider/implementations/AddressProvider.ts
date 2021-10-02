import { consultarCep } from "correios-brasil/dist";

import { IAddressDTO } from "@modules/users/dtos/IAddressDTO";
import { Address } from "@modules/users/infra/typeorm/entities/Address";
import { AppError } from "@shared/errors/AppError";

import { IAddressProvider } from "../model/IAddressProvider";

class AddressProvider implements IAddressProvider {
    async getAddress(cep: string, numero: number): Promise<Address> {
        const cepData = await consultarCep(cep);

        if (!cepData) throw new AppError("Invalid CEP!");

        const { logradouro, complemento, bairro, localidade, uf } = cepData;

        const address: Address = {
            cep,
            logradouro,
            complemento,
            bairro,
            localidade,
            uf,
            numero,
        };

        console.log(address);

        return address;
    }
}

export { AddressProvider };
