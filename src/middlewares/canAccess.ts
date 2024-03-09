import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types";
import createHttpError from "http-errors";

export const canAccess = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // console.log(`canAccess req.headers`,req.headers);
        const _req = req as AuthRequest;
        const roleFromToken = _req.auth.role;
        //  console.log(`canAccess roleFromToken`,roleFromToken);

        if (!roles.includes(roleFromToken)) {
            const error = createHttpError(
                403,
                "You don't have enough permissions",
            );

            next(error);
            return;
        }
        next();
    };
};
