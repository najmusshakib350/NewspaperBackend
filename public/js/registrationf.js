import axios from 'axios';

export const registrationf= async (data) =>{
    try{
        const res= await axios({
            method:'POST',
            url:'/users/signup/',
            data
        });
        if(res.data.status==='success'){
            window.location.href="/newsbd/loginme";
        }

    }catch(err){
        //alert("This error for registrationf");
    }
}