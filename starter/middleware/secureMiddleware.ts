import { Request, Response, NextFunction } from "express";

export function secureMiddleware(req: Request, res: Response, next: NextFunction) {
     if (req.session.username) {
        res.locals.user = req.session.username;
    next();
        } else {
        res.redirect("/login");
    }

}