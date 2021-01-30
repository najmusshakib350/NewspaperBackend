import axios from 'axios';

export const logoutf= async () =>{
    try{
        const res= await axios({
            method:'GET',
            url:'/users/logout/'
        });
        if(res.data.status==='succes'){
            location.reload(true);
            window.location.href="/newsbd/";
        }

    }catch(err){
        //alert("This error for logoutf");
    }
}