import axios from 'axios';

export const  commentdelf= async (id) =>{
    try{
        const res= await axios({
            method:'DELETE',
            url:`/comments/delete/${id}`
        });
        if(res.data.status==='success'){
            window.location.href="/allcomments";
        }

    }catch(err){
        //alert("This error for commentdelf");
    }
}