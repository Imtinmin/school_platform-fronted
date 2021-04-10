import axios from 'axios'
import auth from '@/util/auth'

class Base
{
    constructor(){
        this.instance = axios.create({
            baseURL: 'http://39.108.36.103:8000/API',
            //baseURL: 'http://localhost:8000/API',
            timeout: 10000,
        });
    }

    request(method,path,params={},config={}){
        return new Promise(async (resolve,reject) => {
            let options = {
                method: method,
                url: path,
                withCredentials: false       //带laravel-session
            }
            if(localStorage.getItem('jwt')){
                options['headers'] = {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                }
            }

            if(config.needAuth){
                if(auth.istokenExpired()){
                    reject({
                        message: "需要登录",
                        redirect: "UserLogin",
                        action: "logout"
                    })
                    return false
                }
            }

            if(method == 'GET'){
                options.params = params
            }

            if(method == 'POST'){
                //options.headers = {'Content-Type': 'multipart/form-data'}
                options.data = params
            }
            


            try {
                let result = await this.instance.request(options);



                if(result.data){
                    if(result.data.code === 200){
                        resolve(result)
                    }else{
                        reject(this.UnhandledErrorResponse(result))
                    }
                }else{
                    
                    reject(this.UnhandledErrorResponse(result))
                }
            } catch (error) {
                reject(this.UnhandledErrorResponse(error))
            }
            

        })

    }



    UnhandledErrorResponse(e){
        let unhandledError = {
            code: '',
            redirect: '',
            message: '',
        }
        if(e.action == 'logout'){
            localStorage.clear()
        }
        if(e.status === 200){
            unhandledError.code = e.data.code;
            if(Array.isArray(e.data.msg)){
                unhandledError.message = e.data.msg.join(',');
            }else{
                unhandledError.message = e.data.msg;
            }
        }
        else{
            if(e.response){
                unhandledError.message = {
                    400: "HTTP 400 Bad Request",
                    401: "HTTP 401 Unauthorized",
                    403: "HTTP 403 Forbidden",
                    404: "HTTP 404 Not Found",
                    405: "HTTP 405 Method Not Allowed",
                    406: "HTTP 406 Not Acceptable",
                    408: "HTTP 408 Request Timeout",
                    414: "HTTP 414 URI Too Long",
                    418: "HTTP 418 I'm a teapot",
                    500: "HTTP 500 Internal Server Error",
                    502: "HTTP 502 Bad Gateway",
                    503: "HTTP 503 Service Unavailable",
                    504: "HTTP 504 Gateway Timeout"
                  }[e.response.status] || `HTTP ${e.response.status}`;
                }else{
                    if(e.request){
                        if(e == 'Error: timeout of 10000ms exceeded'){
                            unhandledError.message = 'timeout of 10000ms exceeded';
                        }else{
                            unhandledError.message = 'Error: Network Error';
                        }
                    }else{
                        unhandledError.message = 'Error: Unknown Error';
                    }
                }
            }
        return unhandledError;
        }
        
}

export default Base;