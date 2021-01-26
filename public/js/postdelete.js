import axios from 'axios';

export const postdelf= async (id) =>{
    try{
        const res= await axios({
            method:'DELETE',
            url:`/post/delete/${id}`
        });
        if(res.data.status==='delete success'){
            window.location.href="/viewallpost";
        }

    }catch(err){
        //alert("This error for postdelf");
    }
}