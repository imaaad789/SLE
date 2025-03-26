let full_name=document.getElementById('name');
let email=document.getElementById('email');
let password=document.getElementById('password');
let conf_password=document.getElementById('conf-password');

let passwordRegex=/^[a-zA-Z0-9]+$/;
let FullnameRegex=/^[A-Z]+( [A-Z]+)+$/;
function validation(){
    if(full_name.value==="" || email.value==="" || password.value==="" || conf_password.value===""){
        alert("Please entre the required information.");
        return false
    }
    if(!FullnameRegex.test(full_name.value)){
        alert("This name is not valide.");
        full_name.style.border = "1px solid red";
        return false
    }else{
        full_name.style.border="";
    }
    
    if(!/^[a-zA-Z0-9]+@gmail.com$/.test(email.value)){
        alert("Email n'est pas correct doit ecrire so forme de 'exemple@gmail.com'.");
        email.style.border="1px solid red";
        return false
    }else{
        email.style.border="";
    }
    if(!passwordRegex.test(password.value)){
        alert('Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number.');
        password.style.border="1px solid red";
        return false;
    }else{
        password.style.border="";
    }
    if(password.value!==conf_password.value){
        alert("passwords do not match!");
        conf_password.style.border="1px solid red";
        return false;
    }else{
        conf_password.style.border="";
    }
    return true;
}