import axios from 'axios';

export const  commentdelf= async (id) =>{
    try{
        const res= await axios({
            method:'DELETE',
            url:`/comments/delete/${id}`
        });
        if(res.data.status==='succes'){
            window.location.href="/allcomments";
        }

    }catch(err){
        //alert("This error for commentdelf");
    }
}