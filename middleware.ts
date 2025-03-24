import Middleware from "./middleware/middleware";

const middleware = new Middleware();

export default middleware.chain([
    middleware.validateWhitelistRoute,
    middleware.setProperties,
    middleware.authentication,
    middleware.rewriteMain,
]);