import  Base from './Base'

class Video extends Base {

    DeleteVideo(id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/video/DelVideo",{"video_id":id});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })
    }

    EditVideo(id,title,content,url,order_num,ppt_url){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/video/EditVideo",{"video_id":id,"title":title,"content":content,"url": url,"order_num":order_num,"ppt_url":ppt_url});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })
    }

    AddVideo(title,content,chapter_id,order_num,url,ppt_url){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/video/AddVideo",{"title":title,"content":content,"chapter_id":chapter_id,"url": url,"order_num":order_num,"ppt_url":ppt_url});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })
    }
}

export default new Video();