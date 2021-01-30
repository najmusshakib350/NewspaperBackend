import axios from 'axios';

export const forgotpasswordf= async (email) =>{
    try{
        const res= await axios({
            method:'POST',
            url:'/users/forgotPassword/',
            data:{
                email
            }
        });
        if(res.data.status==='succes'){
          
        }

    }catch(err){
        //alert("This error for forgotpasswordf");
    }
}