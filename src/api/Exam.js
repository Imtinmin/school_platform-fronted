import  Base from './Base'

class Exam extends Base {

    GetExam(exam_id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/Examination/getExam",{"exam_id":exam_id},{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })     
    }

    AbandonExam(){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/Examination/Abandon",null,{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })  
    }


    ExamStatus(){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/Examination/Status",null,{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        }) 
    }


    SubmitAnswer(answer,exam_id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/Examination/SubmitAnswer",{"answer":answer,"examID":exam_id},{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        }) 
    }



    AddExam(examName,score,chapter_id,course_id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/Examination/AddExam",{"examName":examName,"score":score,"chapter_id":chapter_id,"course_id":course_id},{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })
    }

    DelExam(examID){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/Examination/DelExam",{"examID":examID},{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })
    }

    UpdateExam(examID,examName,score,chapter_id,course_id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("POST","/Examination/UpdateExam",{"examID":examID,"examName":examName,"score":score,"chapter_id":chapter_id,"couse_id":course_id});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })
    }


    ExamList(){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/Examination/ExamList",null,{'needAuth':true});
                resolve(result);
            }catch(e){
                reject(e)
            }
        })
    }
}

export default new Exam();
