class Route{
    constructor(from, to) {

    }
    go(to) {
        // Promise.all([
        //     import('./module1.js'),
        //     import('./module2.js'),
        //     import('./module3.js'),
        // ])
        import(`${to}.js`).then((mod) => {

        })
    }
}