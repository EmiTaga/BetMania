function fromValidation(){
    let password = document.getElementById("password");
    let username = document.getElementById("username");
    {
    if(password_validation(password,5,12))
     {
    if(username (username))
     {
    if(alphanumeric(fname))
    {
     {
     }
     }
     }
     }
   return false;
}
function password_validation(password,mx,my){
    let password_len = password.value.length;
    if(password_len==0 ||password_len>= my || password_len < mx){
        alert("Password should not be empty / length be between "+mx+" to "+my+"");
        password.focus();
        return false ;
    }
    return true ;
}};
 function username (username){
    let letters = /^[0-9a-zA-Z]+$/;
    if(username.value.match(letters))
    {
    return true;
    }
    else
    {
    alert('Username  must have alphanumeric characters only');
    username.focus();
    return false;
    }
}