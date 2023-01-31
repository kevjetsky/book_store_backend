import { verifyToken } from "../../utils/jwt";

export const checkAuth = () => {
    return (req, res, next) => {
        const { authorization } = req.headers;

        const token = authorization.split(' ')[1];

        const payload = verifyToken(token);

        if(!payload) return res.status(401).json({ error: 'Invalid Credentials' });

        req.user = payload;

        return next();
    }
}