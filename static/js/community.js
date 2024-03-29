function getGroups() {
    let url = `${base_url}groups/get_groups/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.net-alert').hide()
      $('.user-group-row').empty()
      $('.group-row').empty()
      if(data['status'] == 'success') {
        if(data.user_groups.length > 0) {
            g = data.user_groups
            for(var i in g) {
                var temp = `
                <div class="com-item" data-id="${g[i].id}" data-name="${g[i].title}">
                    <img src="${base_image_url}${g[i].image}" alt="">
                    <div class="com-title">${g[i].title}</div>
                </div>`;
                $('.user-group-row').append(temp)
            }
            
            $('.com-item').click(function() {
                let id = $(this).data('id')
                let name = $(this).data('name')
                $('.group_c_con').addClass('active')
                getGroup(id, name)
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
                            <div><i class="fa fa-users"></i> ${digify(data.members[i])} members</div>
                            <div><i class="fa fa-newspaper-o"></i> ${digify(data.posts[i])} posts</div>
                        </div>
                    </div>
                </div>`;
                $('.group-row').append(temp)
            }
            $('.sk-item').click(function() {
                let id = $(this).data('id')
                let name = $(this).data('name')
                $('.group_c_con').addClass('active')
                getGroup(id, name)
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
      $('.page-loader').hide()
    })
    .catch(err => {
        console.log(err)
        $('.net-alert').show()
        getGroups()
    })
  }

  getGroups()

  function getGroup(id, name) {
    $('.page-loader').show()
    let url = `${base_url}groups/get_group/?group_id=${id}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        $('.net-alert').hide()
        //console.log(data);
        $('.page-loader').hide()
      if(data['status'] == 'success') {
        d = data.data
        let img = ""
        let des = ''
        if(d.image) {
           img = `${base_image_url}${d.image}`
        }
        else {
            img = `./static/image/group.png`
        }
        if(d.description.trim() !== "") {
            des  = `<div class="h6 w-bold grp-des" style="text-align:center">${d.description}</div>`
        }
        let temp = `<img class="grp-img" src="${img}" alt="" />
        <h2 class="grp-tit w-text-blue">${d.title}</h2>
        ${des}
        <p class="grp-mem w-text-grey"><i class="fa fa-group"></i> ${digify(data.members)} members&nbsp;&nbsp;<small><i class="fa fa-circle"></i></small>&nbsp;&nbsp;<i class="fa fa-newspaper-o"></i> ${digify(data.posts)} posts</p>`
        $('.group-content').html(temp)
        $('.grp-det').data('id', d.id)
        $('.grp-det').data('name', d.title)
      }
      else if(data['status'] == 'error') {
        swal('Error', data.message, 'error')
      }
    })
    .catch(err => {
        console.log(err)
        $('.net-alert').show()
        getGroup(id, name)
    })
  }

  function getPosts(id, name) {
    $('.page-loader').show()
    let url = `${base_url}groups/get_group_posts/?group_id=${id}`;
    $('.grp-tit2').html(name)
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        $('.net-alert').hide()
        //console.log(data);
        $('.page-loader').hide()
      if(data['status'] == 'success') {
        d = data.data
        
      }
      else if(data['status'] == 'error') {
        swal('Error', data.message, 'error')
      }
    })
    .catch(err => {
        console.log(err)
        $('.net-alert').show()
        getPosts(id, name)
    })
  }

  function getMembers(id, name) {}