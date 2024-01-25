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