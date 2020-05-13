import EventHandler from "./EventHandler";
// import Route from "./Route";

class Frd{
    // constructor(Main) {
    //     this.m
    // }
    init(router) {
        if (router) {
            this.initRoute(router)
            //new Route(this, router);
        }
        this.initEvent();
    }
    initEvent() {
        var eventHandler = new EventHandler();
        eventHandler.addEventListeners(window, eventHandler.baseEvents);
    }
    initRoute(router) {
        this.router = router
        console.log(router);
        setTimeout(()=>{
            console.log(router);
        }, 1000);
    }
}
export default Frd;