import  Base from './Base'

class CourseCategory extends Base {

    addCourseCategory(name){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/CourseCategory/createCategory",{"category_name":name},{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })        
    }

    delCourseCategory(id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/CourseCategory/delCategory",{"category_id":id},{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })        
    }

    UpdateCourseCategory(id,name){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/CourseCategory/updateCategory",{"category_id":id,'category_name':name},{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })  
    }

    CategoryList(){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/CourseCategory/CourseList",null,{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        }) 
    }




}


export default new CourseCategory();