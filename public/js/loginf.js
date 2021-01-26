import axios from 'axios';

export const loginf= async (email, password) =>{
    try{
        const res= await axios({
            method:'POST',
            url:'/users/login/',
            data:{
                email,
                password
            }
        });
        if(res.data.status==='success'){
            window.location.href="/";
        }

    }catch(err){
        //alert("This error for loginf");
    }
}