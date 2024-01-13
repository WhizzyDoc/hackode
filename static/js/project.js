function getCourses() {
    let url = `${base_url}courses/get_courses/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.course-filter').empty()
      $('.course-filter').append(`<option selected value="">All Courses</option>`)
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                var temp = `
                <option value="${d[i].id}">
                    ${d[i].title}
                </option>`;
                $('.course-filter').append(temp)
            }
        }
        else {
            $('.course-filter').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.course-filter').append(data.message)
      }
    })
    .catch(err => {console.log(err)})
  }
  getCourses();

function getProjects() {
    let filter = ''
    let c_filter = $('.course-filter').val()
    if(!c_filter) {
        c_filter = ''
    }
    if(c_filter !== '') {
        filter = `&course_id=${c_filter}`
    }
    let url = `${base_url}projects/get_projects/?api_token=${localStorage.api_key}${filter}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.pro-row').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            a = data.submission
            for(var i in d) {
                var sub = ``;
                if(a[i] === true) {
                    sub = `&nbsp;<span class="w-text-green"><i class="fa fa-circle"></i>&nbsp;Submitted</span>`
                }
                else if(a[i] === false) {
                    sub = `&nbsp;<span class="w-text-red"><i class="fa fa-circle"></i>&nbsp;Not Submitted</span>`
                }
                let deadline;
                if(d[i].deadline !== undefined) {
                    deadline = new Date(d[i].deadline).toDateString();
                }
                var temp = `
                <tr class="q-item p-item" data-id="${d[i].id}">
                    <td>
                    <span class="w-bold-xx h5 w-text-blue">${d[i].title}<span><br>
                    <span class="w-small w-text-gray">
                    &nbsp;&nbsp;
                    <i class="fa fa-circle"></i>&nbsp;${d[i].course.title}
                    ${sub}
                    </span>
                    <td>
                    <td class="w-flex w-flex-center w-align-center"><i class="fa fa-chevron-right"></i></td>
                </tr>`;
                $('.pro-row').append(temp)
            }
            $('.p-item').click(function() {
                let id = $(this).data('id')
                $('.pro_c_con').addClass('active')
                getProject(id)
            })
        }
        else {
            $('.pro-row').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.pro-row').append(data.message)
      }
    })
    .catch(err => {
        console.log(err)
        swal("Error", "Please check your internet connection", "error")
    })
}
getProjects();


function getProject(id) {
    let url = `${base_url}projects/get_project/?project_id=${id}&api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.pro-detail').empty()
      $('.comment-con').empty()
      if(data['status'] == 'success') {
        d = data.data
        $('.submit-form')[0].reset();
        $('.submit-form').data('id', d.id)
        let deadline = "No deadline";
        let template = "No Link Provided"
        if(d.deadline !== undefined) {
            deadline = new Date(d.deadline).toDateString();
        }
        if(d.link !== undefined && d.link !== '') {
            template = `<a class="w-text-blue" href="${d.link}">${d.link}</a>`;
        }
        let image = ''
        if(d.image) {
            image = `<a href="${base_image_url}${d.image}">
                    <img src="${base_image_url}${d.image}" style="width:100%;max-width:500px;height:auto" alt="">
                </a>`
        }
        var temp = `
                <h3 class="w-text-blue">${d.title}</h3>
                <div>${d.description}</div>
                <p class=""><span class="w-bold-x w-text-red">Sample Template URL: </span>${template}</p>
                <p class=""><span class="w-bold-x w-text-red">Deadline: </span>${deadline}</p>
                ${image}
                `;
        $('.pro-detail').html(temp)
        if(data.submission) {
            s = data.submission;
            $('#repo').val(s.source_code)
            $('#live').val(s.live_url)
            if(s.comment !== undefined && s.comment !== '') {
                var temp = `<h3 class="w-text-blue" style="text-align:center">Comment</h3>
                <div>${s.comment}</div>`;
                $('.comment-con').html(temp)
            }
        }
      }
      else if(data['status'] == 'error') {
        $('.pro-detail').append(data.message)
      }
    })
    .catch(err => {
        console.log(err)
        swal("Error", "Please check your internet connection", "error")
    })
}

function submitProject(id) {
    const formData = new FormData();
    formData.append('repo', $('#repo').val())
    formData.append('live', $('#live').val())
    formData.append('project_id', id)
    formData.append('api_token', localStorage.api_key)
    let url = `${base_url}projects/submit_project/`;
    $('.submit-form-btn').html(`Submitting...`).attr('disabled', true)
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        swal(data.status, data.message, data.status)
        $('.submit-form-btn').html(`Submit Project`).attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.submit-form-btn').html(`Submit Project`).attr('disabled', false)
        swal("Error", "Please check your internet connection", "error")
    })
}