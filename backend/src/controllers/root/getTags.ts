import { RequestHandler } from 'express';
import { TagsGenerator } from '../../services/TagsGenerator';

const getTags: RequestHandler = async (req, res) => {
    const provider = new TagsGenerator(100)
    const tags = await provider.generate();

    return res.status(200).json(tags);
}

export default getTags