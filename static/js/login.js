//import { kosmos_get, kosmos_post } from './kosmosRequest.js';

function register() {
    let f_name = $('#f-name').val()
    let l_name = $('#l-name').val()
    let email = $('#email').val()
    let username = $('#reg-username').val()
    let pass = $('#reg-pass').val()
    let cpass = $('#cpass').val()
    if(cpass !== pass) {
        $('#cpass_err').html(`<i class="fa fa-lock"></i> Passwords do not match!`);
        return;
    }
    $('.register-btn').html('Creating Account').attr('disabled', true)
    let url = `${base_url}students/create_account/`
    const formData = new FormData();
    formData.append('first_name', f_name);
    formData.append('last_name', l_name);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', pass);

    fetch(url, {
        method:'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            swal("Success", `Account created successfully. Email has been sent to ${data.data.email}`, 'success')
            location.href = '#';
        }
        else if(data['status'] == 'error') {
            swal("Error", data['message'], 'error')
        }
        $('.register-btn').html('Create Account').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        swal("Error", "Please check your internet connection", "error")
        $('.register-btn').html('Create Account').attr('disabled', false)
    })
}

function authenticate() {
    $('.login-btn').html('Authenticating...').attr('disabled', true)
    let url = `${base_url}students/authentication/`
    let username = $('#admin-username').val();
    let password = $('#admin-password').val();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch(url, {
        method:'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            localStorage.setItem('api_key', data.data.api_token)
            localStorage.setItem('username', username)
            if(data.data.image) {
                localStorage.setItem('dp', data.data.image)
            }
            localStorage.setItem('names', `${data.data.first_name} ${data.data.last_name}`);
            location.href = '/'
        }
        else if(data['status'] == 'error') {
            $('#admin_err').html(`<i class="fa fa-warning"></i> ${data['message']}`)
            swal('Error', data['message'], "error")
        }
        $('.login-btn').html('Log In').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        swal("Error", "Please check your internet connection", "error")
        $('.login-btn').html('Log In').attr('disabled', false);
    })
}

function logout() {
    let url = `${base_url}students/admin_logout/`
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);

    fetch(url, {
        method:'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            localStorage.removeItem('api_key')
            localStorage.removeItem('names');
            localStorage.removeItem('dp');
            localStorage.removeItem('username');
            sessionStorage.removeItem('user_skills');
            sessionStorage.removeItem('skills');
            location.href = './login.html'
        }
        else if(data['status'] == 'error') {
            console.log(data)
            swal('Error', "Error occured", "error")
        }
    })
    .catch(err => {
        console.log(err);
        swal("Error", "Please check your internet connection", "error")
        swal('Error', "Error occured", "error")
    })
}

function forgotPassword() {
    $('.forgot-btn').html('Resetting...').attr('disabled', true)
    let url = `${base_url}students/forgot_password/`
    let email = $('#forg-email').val();
    const formData = new FormData();
    formData.append('email', email);

    fetch(url, {
        method:'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            swal("Success", data['message'], 'success')
            location.href = '/'
        }
        else if(data['status'] == 'error') {
            swal('Error', data['message'], "error")
        }
        $('.forgot-btn').html('Reset Password').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        swal("Error", "Please check your internet connection", "error")
        $('.forgot-btn').html('Reset Password').attr('disabled', false);
    })
}

