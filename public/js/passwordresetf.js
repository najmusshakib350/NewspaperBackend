import axios from 'axios';

export const passwordresetf= async (token,password, confirmPassword) =>{
    try{
        const res= await axios({
            method:'PATCH',
            url:`/users/resetPassword/${token}`,
            data:{
                password,
                confirmPassword
            }
        });
        if(res.data.status==='succes'){
            document.querySelector('.password-reset-form').insertAdjacentHTML('afterbegin', '<p class="text-center" style="color:#fff">Password reset successfully</p>')
            setTimeout(() => {
                window.location.href="/newsbd/";
            }, (2000));
        }

    }catch(err){
        //alert("This error for passwordresetf");
        document.querySelector('.password-reset-form').insertAdjacentHTML('afterbegin', '<p class="text-center" style="color:#fff">Not match password  and confirmpassword value.</p>')
    }
}