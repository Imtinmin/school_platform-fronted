import Base from './Base'

class SelectChallenge extends Base{


    resetGetView(){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/SelectChallenge/Reset",null,{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })
    }

    addChoiceQuestionToExam(examID,data){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/SelectChallenge/addChoiceQuestionToExam",{"examID":examID,"data":data},{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })
    }


}

export default new SelectChallenge()
