import axios from 'axios';

export const categorydelf= async (id) =>{
    try{
        const res= await axios({
            method:'DELETE',
            url:`/category/delete/${id}`
        });
        if(res.data.status==='succes'){
            window.location.href="/viewcategory";
        }

    }catch(err){
        //alert("This error for categorydelf");
    }
}