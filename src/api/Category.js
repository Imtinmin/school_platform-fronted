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

    delCategory(){

    }
}

export default new Category();