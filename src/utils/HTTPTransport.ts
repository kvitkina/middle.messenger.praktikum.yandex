import { queryStringify } from './utils';

enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

interface Options {
    method?: Methods;
    data?: any;
    headers?: Record<string, string>;
}

class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2';
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
    }

    public get<Response>(path = '/', options?: Options): Promise<Response> {
        return this.request<Response>(this.endpoint + path, { ...options, method: Methods.GET });
    }

    public post = (path: string, options?: Options) => {
        return this.request<Response>(this.endpoint + path, { ...options, method: Methods.POST });
    };

    public put = (path: string, options?: Options) => {
        return this.request<Response>(this.endpoint + path, { ...options, method: Methods.PUT });
    };

    public delete = (url: string, options?: Options) => {
        return this.request<Response>(url, { ...options, method: Methods.DELETE });
    };

    private request<Response>(url: string, options: Options): Promise<Response> {
        const { headers = {}, method, data } = options;
        const preparedData = data instanceof FormData ? data : JSON.stringify(data);
        const preparedHeaders = data instanceof FormData ? {} : { 'Content-Type': 'application/json' };

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === Methods.GET;

            xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

            Object.keys(preparedHeaders).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onreadystatechange = (e) => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(preparedData);
            }
        });
    }
}

export default HTTPTransport;
