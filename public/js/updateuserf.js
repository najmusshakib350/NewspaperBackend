import axios from 'axios';

export const updateuserf= async (data,id) =>{
    try{
        const res= await axios({
            method:'PATCH',
            url:`/users/updateuser/${id}`,
            data
        });
        if(res.data.status==='success'){
            window.location.href="/viewallusers";
        }

    }catch(err){
        //alert("This error for updateuserf");
    }
}