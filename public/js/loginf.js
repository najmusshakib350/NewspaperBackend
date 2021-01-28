import axios from 'axios';

export const loginf= async (email, password) =>{
    try{
        const res= await axios({
            method:'POST',
            url:'/users/login/',
            data:{
                email,
                password
            }
        });
        if(res.data.status==='success'){
            document.querySelector('.login-form').insertAdjacentHTML('afterbegin', '<p class="text-center" style="color:#fff">Login successfully</p>')
            setTimeout(() => {
                window.location.href="/";
            }, (2000));
        }

    }catch(err){
        //alert("This error for loginf");
        document.querySelector('.login-form').insertAdjacentHTML('afterbegin', '<p style="color:#fff">Incorrect email or password</p>')
    }
}