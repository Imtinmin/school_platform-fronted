import  Base from './Base'
import Exam from './Exam';

class ExamLog extends Base {

    list(){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/Examlog/ExamLog");
                resolve(result);
            }catch(e){
                reject(e)
            }
        })     
    }

    del(log_id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await this.request("GET","/Examlog/ExamLog");
                resolve(result);
            }catch(e){
                reject(e)
            }
        })  
    }
}

export default new ExamLog()