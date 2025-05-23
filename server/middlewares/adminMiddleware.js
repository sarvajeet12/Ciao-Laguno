const adminMiddleware = async (req, resp, next) => {
    try {
        // console.log(req.user);

        const adminRole = req.user.isAdmin;

        if (!adminRole) {
            resp.status(403).send({ message: "Access denied. User is not an admin" });
            return;
        }
        next(); 

    } catch (error) {
        next(error);
    }
}

module.exports = adminMiddleware;
