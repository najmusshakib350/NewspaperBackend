import axios from 'axios';

export const registrationf= async (data) =>{
    try{
        const res= await axios({
            method:'POST',
            url:'/users/signup/',
            data
        });
        if(res.data.status==='success'){
            document.querySelector('.registration').insertAdjacentHTML('afterbegin', '<p class="text-center" style="color:#fff" style="text-align:center">Registration successfully</p>');
            setTimeout(() => {
                window.location.href="/newsbd/loginme";
            }, (2000));  
        }

    }catch(err){
        //alert("This error for registrationf");
    }
}