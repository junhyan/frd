import Widget from './Widget';
class Activity {
    constructor(layout) {
        // this.init(layout);
        var activityDom = document.createElement("widget");
        // 切换时候删除或者保留后续定
        this.activityWidget = new Widget(this, activityDom, layout);
        this.init();
    }
    init1(layout) {
        var widgetsView = {};
        var viewDom = document.createElement("div"); viewDom.innerHTML = layout; this.view = viewDom;
        function parse (el) {
            var key = el.getAttribute && el.getAttribute('frdid')
            if (key) {
                widgetsView[key] = el;
            }
            Array.from(el.childNodes).forEach( (item) => {
                parse(item);
            });
        }
        parse(this.view);
        this.widgetsView = widgetsView;
        // require(`../demo/layout/style/${view}.css`);
        if (this.createView) {
            this.createView();
        } 
        if (this.initWidgets) {
            this.initWidgets();
        }
        if (this.beforeRender) {
            this.beforeRender();
        }
        this.render(this.view);
        if (this.bindEvents) {
            this.bindEvents()
        }
        if (this.afterRender) {
            this.afterRender();
        }
       
        // import(`../demo/layout/view/${view}.fml`).then((data) => {
        //     var widgets = {};
        //     var viewDom = document.createElement("div"); viewDom.innerHTML = data.default; this.view = viewDom;
        //     function parse (el) {
        //         var key = el.getAttribute && el.getAttribute('frdid')
        //         if (key) {
        //             widgets[key] = el;
        //         }
        //         Array.from(el.childNodes).forEach( (item) => {
        //             parse(item);
        //         });
        //     }
        //     parse(this.view);
        //     this.widgets = widgets;
        //     require(`../demo/layout/style/${view}.css`);
        //     if (this.createView) {
        //         this.createView();
        //     } 
        //     if (this.initWidgets) {
        //         this.initWidgets();
        //     }
        //     if (this.beforeRender) {
        //         this.beforeRender();
        //     }
        //     this.render(this.view);
        //     if (this.bindEvents) {
        //         this.bindEvents()
        //     }
        //     if (this.afterRender) {
        //         this.afterRender();
        //     }
        //     this.dispose();
        // });
    }
    init() {
        if (this.createView) {
            this.createView();
        }
        this.render(this.view, true);
        if (this.bindEvents) {
            this.bindEvents();
        }
        
    }
    getMain(frdid) {
        return this.activityWidget.widgetsView[frdid];
    }
    bindWidget(Widget, main, valueKey) {
        var widget = new Widget(this.activityWidget, main);
        widget.valueKey = valueKey;
        return widget;
    }
    initData(data) {

    }
    setValue() {
        
    }
    render(view, init) {
        if (init) {
            document.body.appendChild(this.activityWidget.main); 
        }
    }
    cached() {
        console.log();
        // if (this.createView) {
        //     this.createView();
        // }
        // this.render(this.view, true);
        // if (this.bindEvents) {
        //     this.bindEvents();
        // }
    }
    dispose() {

    }
    
   
}
export default Activity;