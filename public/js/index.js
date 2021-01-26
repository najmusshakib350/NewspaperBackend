import '@babel/polyfill';

import { categoryaddf } from './categoryaddf';
import { categoryupdf } from './categoryupdf';
import { categorydelf } from './categorydelf';
import { postaddf } from './postaddf';
import { postaupdf } from './postaupdf';
import { postdelf } from './postdelete';
import { commentdelf } from './commentdelf';
import { userdelf } from './userdelf';
import { registrationf } from './registrationf';
import { loginf } from './loginf';
import { logoutf } from './logoutf';
import { updateuserf } from './updateuserf';

const categoryaddform= document.querySelector('.add-cat-form');
const categoryupdform= document.querySelector('.upd-cat-form');
const categorydelform= document.querySelector('.catitemdel');
const postdelform= document.querySelector('.postdelform');
const commentsdelform= document.querySelector('.commentsdelform');
const userdelform= document.querySelector('.userdelform');
const postadd= document.querySelector('.postadd');
const postupdate= document.querySelector('.postupdate');
const postupdateform= document.querySelector('.postupdateform');
const registration= document.querySelector('.registration');
const login_form= document.querySelector('.login-form');
const logout= document.querySelector('.logout');
const updateuser= document.querySelector('.updateuser');




if(updateuser){
    updateuser.addEventListener('submit', e=>{
        e.preventDefault();
        const form=new FormData();
        const upd_btn=document.querySelector('.upd-post-btn');
        const upd_btn_id=upd_btn.dataset.upd;
        form.append('name', document.getElementById('useradd1').value);
        form.append('email', document.getElementById('useradd2').value);
        form.append('phone', document.getElementById('useradd5').value);
        form.append('address', document.getElementById('useradd6').value);
        form.append('userrole', document.getElementById('useradd7').value);
        form.append('profilepicture', document.getElementById('useradd8').files[0]);
        updateuserf(form,upd_btn_id);
    })
}

if(logout){
    logout.addEventListener('click',e => {
        e.preventDefault();
        logoutf();
    });
}

if(login_form){
    login_form.addEventListener('submit', e=>{
        e.preventDefault();
        const email=document.getElementById('liginid1').value;
        const password=document.getElementById('liginid2').value;
        loginf(email,password);
    })
}

if(registration){
    registration.addEventListener('submit', e=>{
        e.preventDefault();
        const form=new FormData();
        form.append('name', document.getElementById('useradd1').value);
        form.append('email', document.getElementById('useradd2').value);
        form.append('password', document.getElementById('useradd3').value);
        form.append('confirmPassword', document.getElementById('useradd4').value);
        form.append('phone', document.getElementById('useradd5').value);
        form.append('address', document.getElementById('useradd6').value);
        form.append('userrole', document.getElementById('useradd7').value);
        form.append('profilepicture', document.getElementById('useradd8').files[0]);
        registrationf(form);
    })
}



if(postupdateform){
    postupdateform.addEventListener('submit', e =>{
        e.preventDefault();
        const form=new FormData();
        const upd_btn=document.querySelector('.upd-post-btn');
        const upd_btn_id=upd_btn.dataset.upd;
        form.append('post_title', document.getElementById('post1').value);
        form.append('category_name', document.getElementById('post2').value);
        form.append('author_name', document.getElementById('post3').value);
        form.append('tags', document.getElementById('post4').value);
        form.append('thumbnail', document.getElementById('post5').files[0]);
        form.append('post_desc', document.getElementById('post6').value);
        postaupdf(form,upd_btn_id);
    })  
}


if(postadd){
    postadd.addEventListener('submit', e =>{
        e.preventDefault();
        const form=new FormData();
        form.append('post_title', document.getElementById('post1').value);
        form.append('category_name', document.getElementById('post2').value);
        form.append('author_name', document.getElementById('post3').value);
        form.append('tags', document.getElementById('post4').value);
        form.append('thumbnail', document.getElementById('post5').files[0]);
        form.append('post_desc', document.getElementById('post6').value);
        postaddf(form);
    })  
}

if(categorydelform){
    categorydelform.addEventListener('click', e=>{
        e.preventDefault();
        const id=categorydelform.dataset.catid;
        const delpcat=document.querySelector('.delpcat').parentElement.remove();
        categorydelf(id);

    })
}
if(postdelform){
    postdelform.addEventListener('click', e=>{
        e.preventDefault();
        const id=postdelform.dataset.catid;
        const delpcat=document.querySelector('.delpcat').parentElement.remove();
        postdelf(id);

    })
}
if(commentsdelform){
    commentsdelform.addEventListener('click', e=>{
        e.preventDefault();
        const id=commentsdelform.dataset.commid;
        document.querySelector('.delpcat').parentElement.remove();
        commentdelf(id);

    })
}
if(userdelform){
    userdelform.addEventListener('click', e=>{
        e.preventDefault();
        const id=userdelform.dataset.catid;
        const delpcat=document.querySelector('.delpcat').parentElement.remove();
        userdelf(id);

    })
}
if(categoryaddform){
    categoryaddform.addEventListener('submit', e =>{
        e.preventDefault();
        const catname=document.getElementById('catadd1').value;
        const catdesc=document.getElementById('catadd2').value;
        let catstatus=document.getElementById('catadd3').value;
        if(catstatus==="Please select a option"){
            catstatus="primary category";
        }
        categoryaddf(catname,catdesc,catstatus);
    });
}

if(categoryupdform){
    categoryupdform.addEventListener('submit', e =>{
        e.preventDefault();
        const upd_btn=document.querySelector('.upd-btn');
        const upd_btn_id=upd_btn.dataset.upd;
        const catname=document.getElementById('catupd1').value;
        const catdesc=document.getElementById('catupd2').value;
        let catstatus=document.getElementById('catupd3').value;
        if(catstatus==="Please select a option"){
            catstatus="primary category";
        }
        categoryupdf(catname,catdesc,catstatus,upd_btn_id);
    });
}
