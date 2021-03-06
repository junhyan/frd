class Event {
    constructor(event) {
        this.type = event.type;
        this.nativeEvent = event;
    }
    getNative() {
        return this.nativeEvent;
    }
    getTarget() {
        for (let el = this.nativeEvent.target; el; el = el.parentNode) {
            if (el.getWidget) {
                return el.getWidget();
            }
        }
    }
    exit() {
        this.preventDefault();
        this.stopPropagation();
    }
    stopPropagation() {
        this.cancelBubble = true;
        this.nativeEvent.stopPropagation();
    }
    preventDefault() {
        this.returnValue = false; 
        this.nativeEvent.preventDefault();
    }

}
export default Event;