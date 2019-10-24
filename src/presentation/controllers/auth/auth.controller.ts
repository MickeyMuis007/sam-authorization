import { Request, Response } from "express";

import { AuthLogic } from "../../../application/logic/auth/auth.logic";

export class AuthController {
  private authLogic: AuthLogic;

  constructor() {
    this.authLogic = new AuthLogic();
  }

  public login = async (req: Request, res: Response) => {
    res.send(await this.authLogic.login(req.body));
  }

  public register = async (req: Request, res: Response) => {
    try {
      res.send(await this.authLogic.register(req.body));
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public logout = async (req: Request, res: Response) => {
    res.send(await this.authLogic.logout());
  }
}
