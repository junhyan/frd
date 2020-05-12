import Util from "./Util";

class HttpClient {
    constructor() {
        this.util = new Util();
    }
    request(method, url, data, headers) {
        return new Promise((resolve, reject) => {
            this.util.ajax(url, {method: method, headers: headers, data: data,
                onsuccess: function(res) {resolve(res);},
                onerror: function (res) {reject(res);}
            });
        });
    }
   
    get(url, header) {
        this.request('get', url, '', header);
    }
    testData(data) {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(data)
            });
        });
    }
    testGet(data) {
        return this.testData(data);
    }
}
export default HttpClient;