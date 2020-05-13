// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// var document = new JSDOM('<body></body>').window.document;

//  class AstNode {
//     constructor(tag, className, style, commands = {}, parent, children = [], pre, next, text) {
//         this.tag = tag;
//         this.className = className;
//         this.style = style;
//         this.commands = commands;
//         this.children = children;
//     }
//  }

// var Commands = [
//     'IF',
//     'ELSEIF',
//     'ELSE',
//     'FOR'
// ];
// function createAST(elStr) {
//     let tmpEL = document.createElement('DIV');
//     tmpEL.innerHTML = elStr;
//     let root = new AstNode();
//     function getComments(node, commands) {
//         //let commands = {};
//         node.getAttributeNames().forEach((item) => {
//             let command = item.toUpperCase();
//             if (Commands.indexOf(command) !== -1) {
//                 if (item.toUpperCase() === 'ELSE') {
//                     commands[command] = true;
//                 } 
//                 else {
//                     commands[command] = node.getAttribute(item);
//                 }
//             } else if (/:.+/.test(item)) {
//                 commands[item] = node.getAttribute(item);
//             }
//         });
//     }
//     function ast (root, el) {
//         let pre = null, next = null;
//         Array.from(el.childNodes).forEach( (item) => {
//             let node = new AstNode();
//             if (item.nodeType === 1) {
                
//                 node.tag = item.tagName;
//                 node.className = item.className;
//                 node.style = item.style.cssText;
//                 root.children.push(node);
//                 getComments(item, node.commands);
                
//             } else if (item.nodeType === 3) {
//                 let node = new AstNode();
//                 root.children.push(node);
//                 node.text = item.textContent;
//             }
//             ast(node, item);
//         });
//     }
//     ast(root, tmpEL);
//     return JSON.stringify(root);
// }
const fs = require("fs");
const path = require('path');
function findFile(targetPath, name) {
    var tmplpath;
    function scanDir(startPath,filter){

        //console.log('Starting from dir '+startPath+'/');
    
        if (!fs.existsSync(startPath)){
            console.log("no dir ",startPath);
            return;
        }
    
        var files=fs.readdirSync(startPath);
        for(var i=0;i<files.length;i++){
            var filename=path.join(startPath,files[i]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory()){
                scanDir(filename,filter); //recurse
            }
            else if (filename.indexOf(filter) !== -1) {
                tmplpath = filename;
            };
        };
    };
    
    scanDir(targetPath, name);
    return tmplpath;
}
module.exports = function(source) {
    // this.resourcePath
   
    // var callback = this.async();
    // var viewPath = path.resolve(`./layout/view/${name}.html`);

    // // this.addDependency(headerPath);

    // fs.readFile(viewPath, 'utf-8', function(err, view) {
    //     if(err) return callback(err);
    //     view = view.replace(/\n/g, '');
    //     var innerStr = `${name}.prototype.initView = function(){var viewDom = document.createElement("div"); viewDom.innerHTML = '${view}'; this.view = viewDom}`;

    //     callback(null, source + innerStr);
    // });
    
    if (this.resourcePath.indexOf(__dirname) !== -1) {
        var paths = this.resourcePath.replace(__dirname + '/', '').split('/');
        var name = paths[paths.length - 1].split('.')[0];
    // console.log(this.resourcePath, '-=-=-=-=-=-=-=', paths.length);

        var deep = '';
        for (var i = 0; i < paths.length - 1; i++) {
            deep += '../'
        }
        // console.log(findPath(name), '===================');
        var tmplFile = findFile('./layout/view/', name);
        var styleFile = findFile('./layout/style/', name);
        // console.log(tmplFile, styleFile, "-=-=-=-=--=");
        if (tmplFile && styleFile) {
            return `import layout from '${deep}${tmplFile}';require('${deep}${styleFile}');${source}`;
        } else {
            return source;
        }

        // fs.exists(`./layout/view/${name}.fml`, function  (exist) {
        //     if (exist) {
        //         callback(null, `import layout from '${deep}layout/view/${name}.fml';require('${deep}layout/style/${name}.css');` + source);
        //     } else {
        //         callback(null, source);

        //     }
        // });
        

    } else {
        return source;
    }
};