class Route{
    constructor(config) {
        this.config = config;
        this.init();
        this.activities = {};
        this.loadedRoute = [];
    }
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.hashChangeHandler();
        });
        window.addEventListener('hashchange', (event) => {
            this.hashChangeHandler();
        });
    }
    hashChangeHandler() {
        var curRouter = location.hash.slice(1) || '/';
        if (this.loadedRoute.indexOf(curRouter) === -1) {
            import(`../demo/${this.config[curRouter]}.frd`).then((Activity) => {
                this.loadedRoute.push(curRouter);
                this.activities[curRouter] = new Activity.default();
            });
        } else {
            this.activities[curRouter].cached();
        }
    }
    go(to) {
        location.hash = to;
    }

}
export default Route;