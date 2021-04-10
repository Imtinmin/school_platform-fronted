import User from '@/api/User'


class Auth {
    static istokenExpired(){
        if(localStorage.getItem('jwt')){
            let token = localStorage.getItem('jwt');
            try {
                let tokeninfo = JSON.parse(atob(token.split(".")[1])).exp //有效期
                if(tokeninfo <= new Date().getTime()/1000){
                    return true
                }else{
                    return false
                }
            } catch (error) {
                return false
            }
        }else{
            return true
        }
    }
    static isLogin(){
        return !this.istokenExpired();
    }

    /*static isAdmin(){
        try {
            let result = User.getUserInfo();
            if(result.data.data.admin){
                return true
            }else{
                return false
            }
        } catch (error) {
            return false
        }

    }*/
}

export default Auth;