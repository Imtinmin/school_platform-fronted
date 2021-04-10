import Base from './Base'

class SelectChallenge extends Base{


    /*resetGetView(){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/SelectChallenge/Reset",null,{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })
    }*/

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

    delChoiceQuestionToExam(id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/SelectChallenge/delChoiceQuestionFromExam",{"id":id},{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })
    }

    updateChoiceQuestion(id,title,option1,option2,option3,option4,answer)
    {
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/SelectChallenge/updateChoiceQuestion",{"id":id,"title":title,"option1":option1,"option2":option2,"option3":option3,"option4":option4,"answer":answer},{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })
    }

}

export default new SelectChallenge()
