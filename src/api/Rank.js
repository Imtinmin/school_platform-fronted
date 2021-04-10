import  Base from './Base'

class Rank extends Base {
    getRankList(page){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/user/rank",{'page':page});
                resolve(result);

            }catch(e){
                reject(e)
            }
        })
    }
}

export default new Rank();