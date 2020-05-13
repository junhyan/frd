import Route from "../src/Route";

var router = {
    '/': 'src/view/MainActivity',
    '/detail': 'src/view/DetailActivity',
};
export default new Route(router);