import Util from './Util'
class Widget {
    constructor(parent, main, layout) {
        var controlName = this.constructor.name;
        if (controlName.toUpperCase() === main.tagName) {
            this.main = main;
            if (parent instanceof Widget) {
                this.parent = parent;
                this.activity = parent.activity;
            } else {
                this.parent = null;
                this.activity = parent;
            }
            this.main.getWidget = () => this;
            this.primaryClass = controlName.toLowerCase();
            if (layout) {
                this.main.innerHTML = layout;
            }
        }
        if (layout) {
            this.init(main, layout);
        }
    }
    init(main, layout) {
        var widgetsView = {};
        // main.innerHTML = layout;
        // this.main = main;
        function parse (el) {
            if (!el.childNodes.length) {
                return;
            }
            Array.from(el.childNodes).forEach( (item) => {
                var key = item.getAttribute && item.getAttribute('frdid')
                if (key) {
                    widgetsView[key] = item;
                }
                parse(item);
            });
        }
        parse(main);
        this.widgetsView = widgetsView;
        if (Object.keys(this.widgetsView).length > 0) {
            if (this.createView) {
                this.createView();

                //this.createView = this.activity.createView;
            }
        }
        // require(`../demo/layout/style/${view}.css`);
      

       
    }
    getMain(frdid) {
        return this.widgetsView[frdid];
    }
    alterStatus(status) {
        var util = new Util();
        if (status.charAt(0) === '+') {
            util.addClass(this.main, this.primaryClass + '-' + status.slice(1) + ' ');
        } else if (status.charAt(0) === '-') {
            util.removeClass(this.main, this.primaryClass + '-' + status.slice(1));
        }
    }
    bindWidget(SubWidget, main, valueKey) {
        var widget = new SubWidget(this, main);
        widget.valueKey = valueKey;
        return widget;
    }
    $keydown() {

    }

   
    $keypress() {

    }

   
    $keyup() {
        
    }

   
    $mousedown() {
        
    }

    
    $mousemove() {
        
    }

    
    $mouseout() {
        
    }

   
    $mouseover() {
        
    }
   
    $mouseup() {
        
    }
    $mousewheel() {

    }
    $ready() {
       
    }
    disable() {

    }
    enable() {

    }

}
export default Widget;