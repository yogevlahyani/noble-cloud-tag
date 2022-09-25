import { BaseTagProvider } from "./BaseTagProvider";
import { ClassNamerProvider } from "./ClassNamerProvider";

export enum AvailableProviders {
    ClassNamerProvider = 'ClassNamerProvider',
}

export class ProviderFactory {
    public static get(provider: AvailableProviders): BaseTagProvider {
        switch(provider) {
            case AvailableProviders.ClassNamerProvider:
            default:
                return new ClassNamerProvider();
        }
    }
}