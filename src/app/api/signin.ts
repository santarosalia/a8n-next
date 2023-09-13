import {PrismaClient} from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET' : {

        }
        case 'POST' : {

        }
        case 'PUT' : {

        }
        case 'DELETE' : {

        }
    }
}