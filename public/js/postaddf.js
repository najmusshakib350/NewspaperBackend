import axios from 'axios';

export const postaddf= async (data) =>{
    try{
        const res= await axios({
            method:'POST',
            url:'/post/add/',
            data
        });
        if(res.data.status==='post success'){
            window.location.href="/viewallpost";
        }

    }catch(err){
        //alert("This error for postaddf");
    }
}