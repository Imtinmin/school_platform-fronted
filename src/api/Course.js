import  Base from './Base'

class Course extends Base {
    getCourseList(){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/CourseCategory/CourseList",null,{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }

        })
    }

    getCourseInfo(course_id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/course/CourseInfo",{'course_id':course_id},{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }

        })
    }

    AdminCourseList(){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/CourseCategory/AllCourseList",null,{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }

        })
    }

    DeleteCourse(course_id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/course/DelCourse",{'course_id':course_id},{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }

        })
    }

    UpdateCourse(id,course_name,category_id,image_url,Introduction){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/course/UpdateCourse",{'course_id':id,"courseName": course_name, "course_category_id":category_id,"image_url": image_url,"Introduction": Introduction},{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }

        })
    }

    AddCouse(course_name,image_url,category_id,Introduction){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/course/AddCourse",{"courseName": course_name, "course_category_id":category_id,"image_url": image_url,"Introduction": Introduction},{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }

        })
    }
}

export default new Course();
