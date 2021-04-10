import Base from './Base'

class User extends Base {

    /*
    *登录
    */
    login(email,password){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/user/login",{"email":email,"password":password});
                resolve(result.data);
            } catch (error) {
                reject(error)
            }
        })

    }

    /*
    *注册
    */
    register(email,name,password,captcha,key){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/user/register",{"email":email,"name":name,"password":password,"captcha":captcha,"key":key});
                resolve(result)
            } 
            catch (error) {
                reject(error)
            }
        })
    }

    /*
    *验证码
    */
    captcha(){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/user/captcha");
                resolve(result)
            } 
            catch (error) {
                reject(error)
            }
        })
    }

    /*
    * 用户个人信息页
    */
    getUserInfo(){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/user/profile",null,{
                    'needAuth':true
                });
                resolve(result)
            } 
            catch (error) {
                reject(error)
            }
        })        
    }

    /*
    *用户信息
    */
    select(user_id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","user/select",{'user_id':user_id},{
                    'needAuth':true
                });
                resolve(result)
            } 
            catch (error) {
                reject(error)
            }
        })  
    }

    /*
    * 修改密码
    */
    resetpassword(password){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/user/password/reset",{'newpassword':password},{
                    'needAuth':true
                });
                resolve(result)
            } 
            catch (error) {
                reject(error)
            }
        })   
    }

    UserList(){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/user/UserList",null,{
                    'needAuth':true
                });
                resolve(result)
            } 
            catch (error) {
                reject(error)
            }
        })     
    }

    DeleteUser(user_id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/user/DeleteUser",{"user_id":user_id},{
                    'needAuth':true
                });
                resolve(result)
            } 
            catch (error) {
                reject(error)
            }
        }) 
    }

    UpdateAdmin(user_id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/user/UpdateAdmin",{"user_id":user_id},{
                    'needAuth':true
                });
                resolve(result)
            } 
            catch (error) {
                reject(error)
            }
        }) 
    }

    degrade(user_id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/user/degrade",{"user_id":user_id},{
                    'needAuth':true
                });
                resolve(result)
            } 
            catch (error) {
                reject(error)
            }
        }) 
    }

    ban(user_id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/user/BanUser",{"user_id":user_id},{
                    'needAuth':true
                });
                resolve(result)
            } 
            catch (error) {
                reject(error)
            }
        }) 
    }
}

export default new User();