// For Admin

  function getTotalSkill() {
    let url = `${base_url}skills/get_user_skills/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      
      drawViewChart(data)
    })
    .catch(err => {console.log(err)})
  }


  getTotalSkill()
  //getTotalUsers()
