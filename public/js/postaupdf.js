import axios from 'axios';

export const postaupdf= async (data,id) =>{
    try{
        const res= await axios({
            method:'PATCH',
            url:`/post/update/${id}`,
            data
        });
        if(res.data.status==='update success'){
            window.location.href="/viewallpost";
        }

    }catch(err){
        //alert("This error for postaupdf");
    }
}