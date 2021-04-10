import  Base from './Base'


class Chapter extends Base {
    getChapterList(course_id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/course/CourseList");
                resolve(result);
            }catch(e){
                reject(e)
            }

        })
    }
    /*
    * 增加章节
    */
    addChapter(Name,course_id,order_num){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/chapter/addChapter",{"chapterName":Name,"course_id":course_id,"order_num":order_num});
                resolve(result);
            }catch(e){
                reject(e)
            }

        })
    }

    /*
    * 删除章节
    */
    DelChapter(chapter_id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/chapter/delChapter",{"chapter_id":chapter_id});
                resolve(result);
            }catch(e){
                reject(e)
            }

        }) 
    }

    UpdateChapter(chapter_id,chapter_name,order_num){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/chapter/UpdateChapter",{"chapter_id":chapter_id,"chapterName":chapter_name,"order_num": order_num});
                resolve(result);
            }catch(e){
                reject(e)
            }

        }) 
    }

}

export default new Chapter();