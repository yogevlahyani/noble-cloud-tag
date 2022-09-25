import axios from 'axios';
import * as cheerio from 'cheerio';
import config from '../config';
import { BaseTagProvider } from "./BaseTagProvider";

export class ClassNamerProvider implements BaseTagProvider {
    public async getTags(): Promise<string[]> {
        const className = await this.getClassName();

        return className.split(/(?=[A-Z])/);
    }

    private async getClassName(): Promise<string> {
        const { data } = await axios.get(config.classNamer.url!);
        const $ = cheerio.load(data);

        return $('#classname').text();
    }

}