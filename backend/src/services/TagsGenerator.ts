import { BaseTagProvider } from "./BaseTagProvider";
import { AvailableProviders, ProviderFactory } from "./ProviderFactory";

interface Tag {
    text: string;
    value: number;
}

export class TagsGenerator {
    private provider: BaseTagProvider;

    public constructor(private count = 100, provider = AvailableProviders.ClassNamerProvider) {
        this.provider = ProviderFactory.get(provider);
    }

    public async generate(): Promise<Tag[]> {
        const promises = Array(this.count).fill(null).map(() => this.provider.getTags());
        const tags = await Promise.all(promises);

        return tags.flat().reduce((prev: Tag[], current: string) => {
            const tag = prev.find(item => item.text === current);

            if (!tag) {
                return prev.concat([{ text: current, value: 1 }]);
            }

            return prev.concat([{ text: current, value: tag.value++ }]);
        }, []);
    }
}