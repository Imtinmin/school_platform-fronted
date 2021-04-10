import Base from './Base'

class Category extends Base {
    getCategoryList(){
        return new Promise(async (resolve,reject) => {
            try  {
                let result = await this.request("GET","/category/CategoryList",null,
                {'needAuth':true});
                resolve(result)
            }
            catch(e){
                //alert(JSON.stringify(e))
                reject(e)
            }
        })
    }

    addCategory(category_name){
        return new Promise(async (resolve,reject) => {
            try  {
                let result = await this.request("POST","/category/AddCategory",{'category_name':category_name},
                {'needAuth':true});
                resolve(result)
            }
            catch(e){
                //alert(JSON.stringify(e))
                reject(e)
            }
        })
    }

    delCategory(category_id){
        return new Promise(async (resolve,reject) => {
            try  {
                let result = await this.request("GET","/category/DelCategory",{"category_id":category_id},
                {'needAuth':true});
                resolve(result)
            }
            catch(e){
                //alert(JSON.stringify(e))
                reject(e)
            }
        })
    }

    UpdateCategory(id,name){
        return new Promise(async (resolve,reject) => {
            try  {
                let result = await this.request("POST","/category/CategoryEdit",{"category_id":id,"category_name": name},{'needAuth':true});
                resolve(result)
            }
            catch(e){
                reject(e)
            }
        })
    }

    CategoryList(){
        return new Promise(async (resolve,reject) => {
            try  {
                let result = await this.request("GET","/category/CategoryList",null,
                {'needAuth':true});
                resolve(result)
            }
            catch(e){
                //alert(JSON.stringify(e))
                reject(e)
            }
        })
    }
}

export default new Category();