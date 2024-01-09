// For Admin

  function getTotalPro() {
    let url = `${base_url}projects/get_projects/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        $('.pro_no').html(data['total_items'])
        
      }
      else if(data['status'] == 'error') {
        $('.dept_no').html('0')
      }
      drawViewChart(data)
    })
    .catch(err => {console.log(err)})
  }


  //getTotalPro()
  //getTotalUsers()
