import Widget from "./Widget";

class Button extends Widget{
    // constructor() {
    //     super();
    // }
    setText(text) {
        this.dom.innerHTML = text;
    }
    $click() {
        
    }
}
export default Button;