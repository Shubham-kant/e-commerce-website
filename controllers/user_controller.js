const User=require('../models/user');

//go to sign up page
module.exports.signUp=function(req,res){
    //if he is already logged in he cant signup.
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up');
}
//creating a user
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });

}
//go to sign in page
module.exports.signIn=function(req,res){
    //if he is already logged in he cant sign in.
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in');
}
module.exports.createSession=function(req,res){
    return res.redirect('/');


}
module.exports.profile=function(req,res){
    return res.render('user_profile');
}
