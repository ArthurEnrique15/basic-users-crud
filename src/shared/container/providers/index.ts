import { container } from "tsyringe";

import { AddressProvider } from "./addressProvider/implementations/AddressProvider";
import { IAddressProvider } from "./addressProvider/model/IAddressProvider";

container.registerSingleton<IAddressProvider>(
    "AddressProvider",
    AddressProvider
);
