// For Admin

  function getData() {
    let url = `${base_url}students/get_data/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.net-alert').hide()
      if(data.status == 'success') {
        drawViewChart(data.scores_data)
      }
      $('.page-loader').hide()
    })
    .catch(err => {
      console.log(err);
      $('.net-alert').show()
      getData()
    })
  }


  getData()
  //getTotalUsers()
