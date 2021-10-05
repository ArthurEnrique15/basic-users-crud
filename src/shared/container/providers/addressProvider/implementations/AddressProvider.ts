import { consultarCep } from "correios-brasil/dist";

import { Address } from "@modules/users/infra/typeorm/entities/Address";
import { AppError } from "@shared/errors/AppError";

import { IAddressProvider } from "../IAddressProvider";

class AddressProvider implements IAddressProvider {
    async getAddress(cep: string, numero: number): Promise<Address> {
        try {
            const cepData = await consultarCep(cep);

            if (cepData) {
                const { logradouro, complemento, bairro, localidade, uf } =
                    cepData;

                const address: Address = {
                    cep,
                    logradouro,
                    complemento,
                    bairro,
                    localidade,
                    uf,
                    numero,
                };

                return address;
            }
        } catch {
            throw new AppError("Invalid CEP!");
        }

        return null;
    }
}

export { AddressProvider };
