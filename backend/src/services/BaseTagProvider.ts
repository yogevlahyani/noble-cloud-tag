export abstract class BaseTagProvider {
    public abstract getTags(): Promise<string[]> | string[];
}