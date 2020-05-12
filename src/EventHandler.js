import Event from './Event.js'
class EventHandler {
    constructor() {
        this.activeWidget = null;
        this.focusWidget = null;
        this.initEvent();
    }
    setFocus(widget) {
        if (this.focusWidget !== widget) {
            if (this.focusWidget) {
                this.dispatchEvent(this.focusWidget, 'blur', event);
                this.focusWidget.alterStatus('-focus');
            }
            this.focusWidget = widget;
            this.dispatchEvent(widget, 'focus', event);
            widget.alterStatus('+focus');
        }
    }
    setActive(widget) {
        if (widget) {
            this.activeWidget = widget;
            widget.alterStatus('+active');
            this.dispatchEvent(widget, 'focus', event);
        } else {
            this.activeWidget.alterStatus('-active');
            this.activeWidget = null;
        }
       
    }

    initEvent() {
        let isToucher = document.ontouchstart !== undefined;
        this.baseEvents = {
            click: (event) => {
                event = new Event(event);
                let widget = event.getTarget();
                if (widget) {
                    this.dispatchEvent(widget, 'click', event);
                }
            },
            touchstart:  (event) => {
                event = new Event(event);
                let widget = event.getTarget();
                if (widget) {
                    this.dispatchEvent(widget, 'touchstart', event);
                    this.setFocus(widget);
                    this.setActive(widget);
                }
            }

        }
        this.mouseEvent = {
            mousedown: (event) => {
                event = new Event(event);
                let widget = event.getTarget();
                if (widget) {
                    this.dispatchEvent(widget, 'mousedown', event);
                    this.setFocus(widget);
                    this.setActive(widget);
                }
            },
            mouseup: (event) => {
                event = new Event(event);
                let widget = event.getTarget();
                if (widget) {
                    this.dispatchEvent(widget, 'mouseup', event);
                    this.setActive();
                }
            },
            mouseover: (event) => {
                event = new Event(event);
                let widget = event.getTarget();
                if (widget) {
                    this.dispatchEvent(widget, 'mouseover', event);
                }
            },
            mouseout: (event) => {
                event = new Event(event);
                let widget = event.getTarget();
                if (widget) {
                    this.dispatchEvent(widget, 'mouseout', event);
                }
            },
            mousemove: (event) => {
                event = new Event(event);
                let widget = event.getTarget();
                if (widget) {
                    this.dispatchEvent(widget, 'mousemove', event);
                }
            }
        }
        if (!isToucher) {
            Object.assign(this.baseEvents, this.mouseEvent);
        }
    }
    dispatchEvent(widget, name, event) { 
        if ((widget['$' + name] && widget['$' + name](event) === false) || (widget['on' + name] && widget['on' + name](event) === false)) {
            event.preventDefault();
        }
    }
    addEventListeners(obj, baseEvents) {
        for (var key in baseEvents) {
            if (baseEvents.hasOwnProperty(key)) {
                obj.addEventListener(key, baseEvents[key]);
            }
        }
    };
}

export default EventHandler;