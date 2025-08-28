import React from "react";
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
  

  
const LoginPage = () =>{
    return (

        <div class="container d-flex justify-content-center align-items-center min-vh-100">

           <div class="row border rounded-5 p-3 bg-white shadow box-area">
             {/*left box*/}
             <div class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{backgroundColor:'#6A0066'}}>
           
                 <div class="featured-image mb-3">
                      <img src="logo1.png" class="img-fluid" style={{width:'250px'}}/>
                 </div>
                 <p class="text-white fs-2 " style={{fontWeight:'600'}}>Be Verified</p>
                 <small class="text-white text-wrap text-center" style={{width:'17rem'}}>Grab your cape and log in! The world of comics is calling</small>  
           
             </div>
           
           
              <div class="col-md-6 right-box">
                <div class="row align-items-center">
                    <div class="header-text mb-4">
                        <h2>Login</h2>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control form-control-lg bg-light fs-6" placeholder="Email Address"/>
                    </div>
                    <div class="input-group mb-1">
                        <input type="password" class="form-control form-control-lg bg-light fs-6" placeholder="Password"/>
                    </div>
                    <div class="input-group mb-5 d-flex justify-content-between">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="formCheck"/>
                            <label for="formCheck" class="form-check-label text-secondary"><small>Remember me</small></label>
                        </div>
                        <div class="forgot">
                            <small><a href="#">Forgot password?</a></small>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <button class="btn btn-lg w-100 fs-6" style={{backgroundColor:'#E4004B'}}>
                            Login
                        </button>
                    </div>
                    <div class="input-group mb-3">
                        <button class="btn btn-lg btn-light w-100 fs-6">
                            <img src="google.png" class="me-2"style={{width:'20px'}}/><small>Sign In with Google</small>
                        </button>
                    </div>
                    <div class="row ">
                        <small>Don't have an account  <a href="#">Sign Up</a></small>
                    </div>
                </div>
              </div>
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
        
    
              
           </div>
    
         </div>
    
    
    );
};

export default  LoginPage;