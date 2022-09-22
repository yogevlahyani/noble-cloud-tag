import axios from 'axios';
import { RequestHandler } from 'express'
import * as cheerio from 'cheerio';
import config from '../../config'

const _getClassName = async () => {
    if (!config.classNamer.url) {
        return;
    }

    const { data } = await axios.get(config.classNamer.url);
    const $ = cheerio.load(data);
    return $('#classname').text();
};

const getTags: RequestHandler = async (req, res) => {
    const tags: Record<string, number> = {};
    const requests = Array(100).fill(null);

    const promises = requests.map(async () => {
        const className = await _getClassName();
        
        return className && className.split(/(?=[A-Z])/);
    });

    const classNameWords = await Promise.all(promises);
    const words = classNameWords.flat();

    for (const word of words) {
        if (!word) {
            continue;
        }

        if (!tags[word]) {
            tags[word] = 1;
            continue;
        }

        tags[word] += 1;
    }

    return res.status(200).json(tags);
}

export default getTags