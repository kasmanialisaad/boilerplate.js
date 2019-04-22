/* How To Use (For JSON Responses Only)

    httpRequest.get('https://swapi.co/api/people/1', success, error, pending);

    function success(data) {
        console.log(data);
    }

    function error(error) {
        console.log(error);
    }

    // This function is optional
    function pending(status) {
        console.log(status);
    }

*/

/* How To Use (GraphQL Example)

    var url = 'http://xx.xxx.xx.xxx:8080/otp/routers/default/index/graphql';

    var query = `

            query { 
                stops { 
                    id
                    name
                } 
            }

    `;

    httpRequest.graphql (url, query, success, error);

    function success(response) {
        console.log(response.data);
    }

    function error(err) {
        console.log('err: ', err);
    }

*/

/* Setting Header

    httpRequest.requestHeaders = [{
        'request': 'X-CSRF-Token',
        'value': CSRF
    }];

*/

function httpRequest(method, url, resolve, reject, pending, options) {
    try {
        if (options.load) {
            if (!isURL(url)) return load(url);
        }
    } catch (error) {
        null;
    }

    var xhr = new XMLHttpRequest();
    method = method || 'GET';
    xhr.open(method, url, true);
    var RequestHeaderType = options.requestHeaderType || 'text/json';
    xhr.setRequestHeader('accept', RequestHeaderType + ', */*; q=0.01');
    method === 'POST' ? xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8") : '';
    if (httpRequest.requestHeaders) {
        httpRequest.requestHeaders.forEach(request => {
            xhr.setRequestHeader(request.request, request.value);
        });
    }
    // method === 'POST' ? xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded') : '';
    xhr.send(options.post);

    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) {
            pending ? pending(this.readyState) : '';
        } else {
            if (this.status === 200) {

                if (options.load) {
                    load(xhr.responseText);
                    return;
                }
                options.json ? resolve(JSON.parse(xhr.responseText)) : resolve(xhr.responseText);

            } else {
                reject ? reject(xhr.statusText) : '';
            }
        }
    };

    function load(text) {
        var regex = /<script\b[^>]*>([\s\S]*?)<\/script>/gmi;
        var match;
        while (match = regex.exec(text)) {
            eval(match[1]);
        }

        try {
            options.id.innerHTML = text;
        } catch (error) {
            document.getElementById(options.id).innerHTML = text;
        }

        resolve ? resolve(text) : '';
    }
}

httpRequest.get = (url, resolve, reject, pending) => httpRequest('GET', url, resolve, reject, pending, { RequestHeaderType: 'text/json', json: true });
httpRequest.get.html = (url, resolve, reject, pending) => httpRequest('GET', url, resolve, reject, pending, { RequestHeaderType: 'text/html' });
httpRequest.load = (url, id, resolve) => httpRequest('GET', url, resolve, null, null, { RequestHeaderType: 'text/html', load: true, id: id });
httpRequest.post = (url, data, resolve, reject, pending) => httpRequest('POST', url, resolve, reject, pending, { post: JSON.stringify(data) });
httpRequest.graphql = (url, data, resolve, reject, pending) => httpRequest('POST', url, resolve, reject, pending, { json: true, post: JSON.stringify({ query: data.trim() }) });