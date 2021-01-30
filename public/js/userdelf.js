import axios from 'axios';

export const userdelf= async (id) =>{
    try{
        const res= await axios({
            method:'DELETE',
            url:`/users/delete/${id}`
        });
        if(res.data.status==='succes'){
            window.location.href="/viewallusers";
        }

    }catch(err){
        //alert("This error for userdelf");
    }
}