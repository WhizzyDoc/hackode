function changePassword() {
    let url = `${base_url}author/change_password/`;
    let old_pass = $('#old_pass').val()
    let new_pass = $('#new_pass').val()
    const formData = new FormData();
    formData.append('old_password', old_pass)
    formData.append('new_password', new_pass)
    formData.append('api_token', localStorage.api_key)
    $('.pass-btn').html('Changing...').attr('disabled', true)
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        swal("Success", data['message'], "success")
        $('#change-pass-form')[0].reset()
      }
      else if(data['status'] == 'error') {
        swal("Error", data['message'], "error")
      }
      $('.pass-btn').html('Change Password').attr('disabled', false)
    })
    .catch(err => {
      console.log(err)
      $('.pass-btn').html('Change Password').attr('disabled', false)
    })
}