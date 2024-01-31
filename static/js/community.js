function getGroups() {
    let url = `${base_url}groups/get_groups/?api_token=${localStorage.api_key}`;
    let con = `<div class="loader">
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
        </div>`;
    $('.group-row').html(con)
    $('.user-group-row').html(con)
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      console.log(data);
      $('.user-group-row').empty()
      $('.group-row').empty()
      if(data['status'] == 'success') {
        if(data.user_groups.length > 0) {
            g = data.user_groups
            for(var i in g) {
                var temp = `
                <div class="sk-item" data-id="${g[i].id}" data-name="${d[i].title}">
                    <img src="${base_image_url}${g[i].image}" alt="">
                    <div class="sk-des">
                        <div class="sk-title">${g[i].title}</div>
                        <div class="w-text-gray sk-num">
                            <div></div>
                            <div><i class="fa fa-users"></i> </div>
                            <div><i class="fa fa-newspaper"></i> </div>
                        </div>
                    </div>
                </div>`;
                $('.user-group-row').append(temp)
            }
            $('.sk-item').click(function() {
                let id = $(this).data('id')
                let name = $(this).data('name')
                //$('.skill-title').html(name)
                //$('.ski_c_con').addClass('active')
                //getSkill(id)
                //getSkillReviews(id);
                //getSkillCourses(id)
            })
        }
        else {
            $('.user-group-row').append(`You have not joined any community`)
        }
        if(data.data.length > 0) {
            d = data.data
            for(var i in d) {
                var temp = `
                <div class="sk-item" data-id="${d[i].id}" data-name="${d[i].title}">
                    <img src="${base_image_url}${d[i].image}" alt="">
                    <div class="sk-des">
                        <div class="sk-title">${d[i].title}</div>
                        <div class="w-text-gray sk-num">
                            <div></div>
                            <div><i class="fa fa-users"></i> </div>
                            <div><i class="fa fa-newspaper"></i> </div>
                        </div>
                    </div>
                </div>`;
                $('.group-row').append(temp)
            }
            $('.sk-item').click(function() {
                let id = $(this).data('id')
                let name = $(this).data('name')
                //$('.skill-title').html(name)
                //$('.ski_c_con').addClass('active')
                //getSkill(id)
                //getSkillReviews(id);
                //getSkillCourses(id)
            })
        }
        else {
            $('.group-row').append(`No communities found`)
        }
      }
      else if(data['status'] == 'error') {
        $('.user-group-row').append(data.message)
        $('.group-row').append(data.message)
      }
    })
    .catch(err => {
        console.log(err)
        swal("Error", "Please check your internet connection", "error")
        getGroups()
    })
  }

  getGroups()