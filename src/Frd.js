import EventHandler from "./EventHandler";

class Frd{
    // constructor(Main) {
    //     this.m
    // }
    init(MainActivity, router) {
        document.addEventListener('DOMContentLoaded', function () {
            new MainActivity();
        });
        var eventHandler = new EventHandler();
        eventHandler.addEventListeners(window, eventHandler.baseEvents);
    }
}
export default Frd;