function signUp(){

    var fname=document.getElementById("firstName").value;
    var lname=document.getElementById("lastName").value;
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    var confirmPassword=document.getElementById("confirmPassword").value;
    if (password!=confirmPassword){
        throw Error;
    }
    
    console.log(fname, lname,email,password,confirmPassword);
    var myql=require('mysql');
    var connection=myql.createConnection({
        host:'localhost',
        user:'root',
        password:'idunno',
        database:'quak'});

    connection.connect (function (error){
        if (!!error){
            console.log(error);
        }
        else {
            console.log ('Connected');
        }
    });
    module.exports=connection;
    




}