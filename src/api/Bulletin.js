import Base from './Base'

class Bulletin extends Base {
    getBulletinList(){
        return new Promise(async (resolve,reject) => {
            try  {
                let result = await this.request("GET","/Bulletin/list");
                resolve(result)
            }
            catch(e){
                reject(e)
            }
        })
    }

    DelBulletin(id){
        return new Promise(async (resolve,reject) => {
            try  {
                let result = await this.request("POST","/Bulletin/del",{"Bulletin_id":id});
                resolve(result)
            }
            catch(e){
                reject(e)
            }
        })
    }

    UpdateBulletin(id,content){
        return new Promise(async (resolve,reject) => {
            try  {
                let result = await this.request("POST","/Bulletin/EditBulletin",{"Bulletin_id":id,"content": content});
                resolve(result)
            }
            catch(e){
                reject(e)
            }
        })
    }

    AddBulletin(content){
        return new Promise(async (resolve,reject) => {
            try  {
                let result = await this.request("POST","/Bulletin/add",{"content": content});
                resolve(result)
            }
            catch(e){
                reject(e)
            }
        })
    }

}


export default new Bulletin();