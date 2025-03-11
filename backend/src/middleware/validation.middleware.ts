import { Request, Response, NextFunction } from "express";

import {z, ZodError} from 'zod';


export const validateData = (schema: z.ZodObject<any,any>)=>{
    return async (req: Request,res:Response,next:NextFunction)=>{
        try{
            schema.parse(req.body);
            next();

        }catch(error){
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                      message: `${issue.path.join('.')} is ${issue.message}`,
                  }))
                  res.status(400).json({ error: 'Invalid data', details: errorMessages });
                } else {
                  res.status(500).json({ error: 'Internal Server Error' });
                }

        }

    }
}