
function getSkills() {
    let cat_filter = '';
    let cat = $('.cat-filter').val();
    let sort = $('.sort-filter').val();
    if(cat && cat !== '') {
      cat_filter = `&cat_id=${cat}`;
    }
    let url = `${base_url}skills/get_skills/?sort_by=${sort}${cat_filter}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.skill-row').empty()
      $('.net-alert').hide()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
              let price;
              if(d[i].price > 0) {
                price = `&#8358;${digify(d[i].price)}`
              }
              else {price = "Free"}
                var temp = `
                <div class="sk-item" data-id="${d[i].id}" data-name="${d[i].title}">
                    <img src="${base_image_url}${d[i].image}" alt="">
                    <div class="sk-des">
                        <div class="sk-title">${d[i].title}</div>
                        <div class="w-text-gray sk-num">
                            <div>${price}</div>
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
                getSkillReviews(id);
                getSkillCourses(id)
            })
        }
        else {
            $('.skill-row').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.skill-row').append(data.message)
      }
      $('.page-loader').hide()
    })
    .catch(err => {
        console.log(err)
        $('.net-alert').show()
        getSkills()
    })
  }

  getSkills()

  function getSkillCategories() {
    let url = `${base_url}skills/get_skill_categories/`;

    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.cat-filter').empty()
      if(data['status'] == 'success') {
        let t = `<option selected value="">All Categories</option>`;
        $('.cat-filter').append(t)
        if(data.data) {
            d = data.data
            for(var i in d) {
                var temp = `
                <option value="${d[i].id}">${d[i].title}</option>`;
                $('.cat-filter').append(temp)
            }
        }
        else {
          $('.cat-filter').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.cat-filter').append(data.message)
      }
    })
    .catch(err => {
        console.log(err)
        getSkillCategories()
    })
  }
  getSkillCategories()

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
    $('.skill-num').html('')
    $('.skill-img').attr('src', '')
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      $('.net-alert').hide()
        $('.skill-detail').empty()
        $('.skill-courses').empty()
        $('.skill-reviews').empty()
      //console.log(data);
      if(data['status'] == 'success') {
        d = data.data
        let price;
        if(d.price > 0) {
          price = `&#8358;${digify(d.price)}`
        }
        else {price = "Free"}
        $('.skill-img').attr('src', `${base_image_url}${d.image}`);
        $('.enroll-btn').data('id', d.id)
        let temp = `
        <div class="w-text-white w-flex w-flex-start w-align-center w-flex-wrap">
                            <div><i class="fa fa-certificate"></i> ${d.category.title}</div>&nbsp;&nbsp;
                            <div><i class="fa fa-money"></i> ${price}</div>&nbsp;&nbsp;
                            <div><i class="fa fa-calendar"></i> ${d.duration}</div>
                        </div>`;
                        
        $('.skill-num').html(temp)
        let temp2 = `
        <div class="w-margin-top w-margin-bottom">${d.description == ''?"No description":d.description}</div>
        `
        $('.skill-detail').html(temp2);

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
        $('.net-alert').show()
        getSkill(id)
    })
  }

  function getSkillCourses(id) {
    let url = `${base_url}skills/get_skill_courses/?skill_id=${id}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.skill-courses').empty()
      $('.net-alert').hide()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                var temp = `
                <div class="c-item">
                    <img src="${base_image_url}${d[i].image}" alt="">
                    <a class="c-title">${d[i].title}</a>
                </div>`;
                $('.skill-courses').append(temp)
            }
        }
        else {
            $('.skill-courses').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.skill-courses').append(data.message)
      }
    })
    .catch(err => {
        console.log(err)
        $('.net-alert').show()
        getSkillCourses(id)
    })
  }

  function getSkillReviews(id) {
    let url = `${base_url}skills/get_skill_reviews/?skill_id=${id}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.skill-reviews').empty()
      $('.net-alert').hide()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                let stars = '';
                s = d[i].star;
                for(var j=0; j<s; j++) {
                  stars += `<i class="fa fa-star w-text-orange" style="font-size:10px"></i>`;
                }
                var temp = `
                <div class="review-con">
                  <div style="margin-right: 10px;">
                    <img src="${base_image_url}${d[i].user.image}" alt="" />
                    <div class="mt-2">${stars}</div>
                  </div>
                  <div>
                    <div class="h6 w-bold-x">
                      ${d[i].user.first_name} ${d[i].user.last_name}
                    </div>
                    <small class="w-text-gray">
                    ${new Date(d[i].date).toDateString()} ${new Date(d[i].date).toLocaleTimeString()}
                    </small>
                    <div class="w-small">${d[i].comment}</div>
                  </div>
                </div>`;

                $('.skill-reviews').append(temp)
            }
        }
        else {
            $('.skill-reviews').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.skill-reviews').append(data.message)
      }
    })
    .catch(err => {
        console.log(err)
        $('.net-alert').show()
        getSkillReviews(id)
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
      //console.log(data);
      elem.html(`Enroll Now`).attr('disabled', false)
      if(data.status == 'success') {
        if(data.mode == 'free') {
          swal('Success', data.message, 'success')
          location.href = '#courses';
        }
        else if(data.mode == 'paid') {
          d = data.data;
          $('#p_name').html(localStorage.names)
          $('#p_email').html(d.email)
          $('#p_amt').html(`&#8358;${d.amount}`)
          $('#p_des').html(`${data.skill.title}`)
          $('#p_ref').html(`${d.reference_id}`)

          $('#pay_email').val(d.email)
          $('#pk').val(data.paystack_pub_key)
          $('#ref_id').val(d.reference_id)
          $('#pay_amt').val(d.amount)

          $('.pay_c_con').addClass('active')
        }
      }
      else {
        swal(data.status, data.message, data.status)
      }
    })
    .catch(err => {
        console.log(err)
        elem.html(`Enroll Now`).attr('disabled', false)
        $('.net-alert').show()
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
        $('.net-alert').show()
    })
  }