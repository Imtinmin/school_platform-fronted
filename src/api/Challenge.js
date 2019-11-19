import Base from './Base'


class Challenge extends Base
{
    /*
    *   题目类型
    */
    getChallengeView(){
        return new Promise(async (resolve,reject) => {
            try  {
                let result = await this.request("GET","/challenge/ChallengeView",null,
                {'needAuth':true});
                resolve(result)
            }
            catch(e){
                //alert(JSON.stringify(e))
                reject(e)
            }
        })
        
    }

    SubmitFlag(qid,flag){
        return new Promise(async (resolve,reject) => {
            try  {
                let result = await this.request("POST","/challenge/SubmitFlag",{'qid':qid,'flag':flag},
                {'needAuth':true});
                resolve(result)
            }
            catch(e){
                reject(e)
            }
        })
    }

    getSolvedChallenges(){
        return new Promise(async (resolve,reject) => {
            try  {
                let result = await this.request("GET","/user/getSolvedChallenges",null,
                {'needAuth':true});
                resolve(result)
            }
            catch(e){
                reject(e)
            }
        })
    }


    CreateChallenge(title,description,url,category_id,flag,score){
        return new Promise(async (resolve,reject) => {
            try  {
                let result = await this.request("POST","/challenge/create",{'title':title,'description':description,'url':url,'category_id':category_id,'score':score,'flag':flag},
                {'needAuth':true});
                resolve(result)
            }
            catch(e){
                reject(e)
            }
        })  
    }

    getSolvedUsers(qid){
        return new Promise(async (resolve, reject) => {
          try{
            let solvedUsers = await this.request("GET", "/challenge/solvedUsers", {
              'qid': qid
            }, {
              needAuth: true
            });
            resolve(solvedUsers);
          }
          catch (e){
            reject(e);
          }
        })
    }

    delChallenge(qid){
        return new Promise(async (resolve, reject) => {
            try{
              let solvedUsers = await this.request("POST", "/challenge/DeleteChallenge", {
                'qid': qid
              }, {
                needAuth: true
              });
              resolve(solvedUsers);
            }
            catch (e){
              reject(e);
            }
        })
    }

    UpdateChallenge(qid,title,description,url,flag,score){
        return new Promise(async (resolve, reject) => {
            try{
              let solvedUsers = await this.request("POST", "/challenge/UpdateChallenge", {'qid':qid,'title':title,'description':description,'url':url,'score':score,'flag':flag}, {
                needAuth: true
              });
              resolve(solvedUsers);
            }
            catch (e){
              reject(e);
            }
        })
    }
}


export default new Challenge();