import { consultarCep } from "correios-brasil/dist";

import { Address } from "@modules/users/infra/typeorm/entities/Address";

class CreateAddressUseCase {
    async execute(cep: string, numero: number): Promise<Address> {
        const dados = await consultarCep(cep);
        console.log(dados);
        return null;
    }
}

export { CreateAddressUseCase };
