/*
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
                            <div>N${digify(d[i].price)}</div>
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
*/
  
function fetchSkills() {
    const storedData = sessionStorage.skills;
    if(storedData) {
        const storedTime = sessionStorage.skills_time;
        if(new Date().getTime() - storedTime < 5*60*1000) {
            return JSON.parse(storedData)
        }
    }
    let url = `${base_url}skills/get_skills/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      sessionStorage.setItem('skills', JSON.stringify(data));
      sessionStorage.setItem('skills_time', new Date().getTime());
      getSkills()
    })
    .catch(err => {
        console.log(err)
        swal("Error", "Please check your internet connection", "error")
        getSkills();
    })
  }

  function getSkills() {
    const data = fetchSkills();
    $('.skill-row').empty()
      if(data.status == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                var temp = `
                <div class="sk-item" data-id="${d[i].id}" data-name="${d[i].title}">
                    <img src="${base_image_url}${d[i].image}" alt="">
                    <div class="sk-des">
                        <div class="sk-title">${d[i].title}</div>
                        <div class="w-text-gray sk-num">
                            <div>N${digify(d[i].price)}</div>
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
      else if(data.status == 'error') {
        $('.skill-row').append(data.message)
      }
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
    $('.skill-detail').html(con)
    $('.skill-courses').html(con)
    $('.skill-reviews').html(con)
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        $('.skill-detail').empty()
        $('.skill-courses').empty()
        $('.skill-reviews').empty()
      //console.log(data);
      if(data['status'] == 'success') {
        d = data.data
        let temp = `
        <img src="${base_image_url}${d.image}" alt="" style="width:100%;height:auto">
        <div class="w-margin-top w-margin-bottom">${d.description}</div>
        <div class="w-bold-x h5"><span class="w-text-blue"><i class="fa fa-calendar"></i> Duration: </span>${d.duration}</div>
        <div class="w-bold-x h5"><span class="w-text-blue"><i class="fa fa-dollar"></i> Price: </span>N${digify(d.price)}</div>
        <button data-id="${d.id}" class="enroll-btn w-margin-top btn btn-success btn-block w-padding">Enroll Now</button>
        `
        $('.skill-detail').html(temp);

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
      elem.html(`Enroll Now`).attr('disabled', false)
      if(data.status == 'success') {
        d = data.data;
        $('#p_name').html(localStorage.names)
        $('#p_email').html(d.email)
        $('#p_amt').html(`N${d.amount}`)
        $('#p_des').html(`${data.skill.title}`)
        $('#p_ref').html(`${d.reference_id}`)

        $('#pay_email').val(d.email)
        $('#pk').val(data.paystack_pub_key)
        $('#ref_id').val(d.reference_id)
        $('#pay_amt').val(d.amount)

        $('.pay_c_con').addClass('active')
      }
      else {
        swal(data.status, data.message, data.status)
      }
    })
    .catch(err => {
        console.log(err)
        elem.html(`Enroll Now`).attr('disabled', false)
        swal("Error", "Please check your internet connection", "error")
    })
  }

  function payWithPaystack() {
		let currency = "NGN";
		let plan = "";
		let ref = $('#ref_id').val();
		let amount = $('#pay_amt').val();

		let obj = {
			key: $('#pk').val(),
			email: $('#pay_email').val(),
			amount: Number(amount)*100,
			ref: ref,
			callback: function (response) {
          console.log(response);
          verifyPayment(ref);
			},
		};
		if (Boolean(currency)) {
			obj.currency = currency.toUpperCase();
		}
		if (Boolean(plan)) {
			obj.plan = plan;
		}

		var handler = PaystackPop.setup(obj);
		handler.openIframe();
	}

  function verifyPayment(ref) {
    let url = `${base_url}skills/verify_payment/`;
    const formData = new FormData()
    formData.append('reference_id', ref);
    formData.append('api_token', localStorage.api_key)
    $('.pay-btn').html(`<i class="fa fa-refresh"></i> Processing...`).attr('disabled', true)
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
      $('.pay-btn').html(`Proceed with Payment`).attr('disabled', false)
      if(data.status == 'success') {
        swal('Success', data.message, 'success');
        sessionStorage.removeItem('user_skills')
        location.href = '#courses';
      }
      else {
        swal(data.status, data.message, data.status)
      }
    })
    .catch(err => {
        console.log(err)
        $('.pay-btn').html(`Proceed with Payment`).attr('disabled', false)
        swal("Error", "Please check your internet connection", "error")
    })
  }