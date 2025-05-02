// storing user in req.user for eassiness
declare namespace Express {
  export interface Request {
    user?: string;
  }
}
