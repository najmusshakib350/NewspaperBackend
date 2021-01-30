import axios from 'axios';

export const categoryupdf= async (catname, catdes,parentstatus,id) =>{
    try{
        const res= await axios({
            method:'PATCH',
            url:`/category/update/${id}`,
            data:{
                catname,
                catdes,
                parentstatus 
            }
        });
        if(res.data.status==='succes'){
            window.location.href="/viewcategory";
        }

    }catch(err){
        //alert("This error for categoryupdf");
    }
}