function getSkills() {
    let url = `${base_url}skills/get_skills/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      console.log(data);
      $('.skill-row').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                var temp = `
                <div class="sk-item" data-id="${d[i].id}" data-name="${d[i].title}">
                    <img src="${base_image_url}${d[i].image}" alt="">
                    <div class="sk-des">
                        <div class="sk-title">${d[i].title}</div>
                        <div class="w-text-gray sk-num">
                            <div><i class="fa fa-dollar"></i>${digify(d[i].price)}</div>
                            <div><i class="fa fa-book"></i> ${data.c_count[i]} courses</div>
                            <div><i class="fa fa-calendar"></i> ${d[i].duration}</div>
                        </div>
                    </div>
                </div>`;
                $('.skill-row').append(temp)
            }
            $('.sk-item').click(function() {
                let id = $(this).data('id')
                let name = $(this).data('name')
                $('.skill-title').html(name)
                $('.ski_c_con').addClass('active')
                getSkill(id)
            })
        }
        else {
            $('.skill-row').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.skill-row').append(data.message)
      }
    })
    .catch(err => {
        console.log(err)
        swal("Error", "Please check your internet connection", "error")
        getSkills()
    })
  }
  getSkills()

  function getSkill(id) {
    let url = `${base_url}skills/get_skill/?skill_id=${id}`;
    let con = `<div class="loader">
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
        </div>`
    $('.skill-content').html(con)
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        $('.skill-content').empty()
      //console.log(data);
      if(data['status'] == 'success') {
        d = data.data
        let temp = `
        <img src="${base_image_url}${d.image}" alt="" style="width:100%;height:auto">
        <div class="w-margin-top w-margin-bottom">${d.description}</div>
        <div class="w-bold-x h5"><span class="w-text-blue"><i class="fa fa-calendar"></i> Duration: </span>${d.duration}</div>
        <div class="w-bold-x h5"><span class="w-text-blue"><i class="fa fa-dollar"></i> Price: </span><i class="fa fa-dollar"></i>${digify(d.price)}</div>
        <button data-id="${d.id}" class="enroll-btn w-margin-top btn btn-success btn-block w-padding">Enroll Now</button>
        `
        $('.skill-content').html(temp);

        $('.enroll-btn').click(function() {
            let bid = $(this).data('id')
            enrollSkill(bid, $(this))
        })
      }
      else if(data['status'] == 'error') {
        swal('Error', data.message, 'error')
      }
    })
    .catch(err => {
        console.log(err)
        swal("Error", "Please check your internet connection", "error")
    })
  }

  function enrollSkill(id, elem) {
    let url = `${base_url}skills/enroll_skill/`;
    const formData = new FormData()
    formData.append('skill_id', id);
    formData.append('api_token', localStorage.api_key)
    elem.html(`<i class="fa fa-refresh"></i> Processing...`).attr('disabled', true)
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
      console.log(data);
      swal(data.status, data.message, data.status)
      elem.html(`Enroll Now`).attr('disabled', false)
      if(data.status == 'success') {
        location.href = '#courses'
      }
    })
    .catch(err => {
        console.log(err)
        elem.html(`Enroll Now`).attr('disabled', false)
        swal("Error", "Please check your internet connection", "error")
    })
  }