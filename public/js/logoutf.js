import axios from 'axios';

export const logoutf= async () =>{
    try{
        const res= await axios({
            method:'GET',
            url:'/users/logout/'
        });
        if(res.data.status==='success'){
            location.reload(true);
            window.location.href="/newsbd/loginme/";
        }

    }catch(err){
        //alert("This error for logoutf");
    }
}