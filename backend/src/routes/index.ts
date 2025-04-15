import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    const dummy = {
        lorem: "Ipsum",
    }
    res.status(200).json(dummy);
});

export default router;
