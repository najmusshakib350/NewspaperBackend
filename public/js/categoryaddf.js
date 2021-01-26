import axios from 'axios';

export const categoryaddf= async (catname, catdes,parentstatus) =>{
    try{
        const res= await axios({
            method:'POST',
            url:'/category/add/',
            data:{
               catname,
               catdes,
               parentstatus 
            }
        });
        if(res.data.status==='success'){
            window.location.href="/viewcategory";
        }

    }catch(err){
        //alert("This error for categoryaddf");
    }
}