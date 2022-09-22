import express from 'express'
import getTags from '../controllers/root/getTags'

const root = express.Router()

root.get('/tags', getTags)

export default root