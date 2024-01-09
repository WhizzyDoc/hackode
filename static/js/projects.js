
function getCategories() {
    let url = `${base_url}categories/get_categories/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.cats').empty()
      $('.cat-filter').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                var temp = `<option value="${d[i].id}">${d[i].title}</option>`;
                $('.cats').append(temp)
                $('.cat-filter').append(temp)
                //$('.depts2').append(temp)
            }
            $('.cat-filter').prepend(`<option value="" selected>All Categories</option>`)
        }
        else {
            $('.depts').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        //$('.depts').append(data.message)
      }
      //$('.depts').prepend(`<option selected>Select Department</option>`)
    })
    .catch(err => {console.log(err)})
  }
  getCategories();

  function getDatabases() {
    let url = `${base_url}databases/get_databases/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.databases').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                var temp = `<option value="${d[i].id}">${d[i].title}</option>`;
                $('.databases').append(temp)
            }
        }
        else {
            $('.databases').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.databases').append(data.message)
      }
    })
    .catch(err => {console.log(err)})
  }

  function getFrameworks() {
    let url = `${base_url}frameworks/get_frameworks/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      console.log(data);
      $('.frame-list').empty()
      $('.frame-list2').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            f = data.data
            for(var i in f) {
                var temp = `<div class="custom-control custom-checkbox w-margin-right w-margin-bottom">
                <input type="checkbox" class="custom-control-input pro-frames" id="frame_${f[i].id}" value="${f[i].id}" name="">
                <label class="custom-control-label" for="frame_${f[i].id}">${f[i].title}</label>
              </div>`;
                $('.frame-list').append(temp)
                var temp2 = `<div class="custom-control custom-checkbox w-margin-right w-margin-bottom">
                <input type="checkbox" class="custom-control-input pro-frames2" id="frame_${f[i].id}2" value="${f[i].id}" name="">
                <label class="custom-control-label" for="frame_${f[i].id}2">${f[i].title}</label>
              </div>`;
                $('.frame-list2').append(temp2)
            }
        }
        else {
            $('.frame-list').append(data.message)
            $('.frame-list2').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.frame-list').append(data.message)
        $('.frame-list2').append(data.message)
      }
    })
    .catch(err => {console.log(err)})
  }

  function getTotalEmp() {
    let url = `${base_url}employees/get_employees/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        $('.emp_no').html(data['total_items'])
      }
      else if(data['status'] == 'error') {
        $('.emp_no').html('0')
      }
    })
    .catch(err => {console.log(err)})
  }

function getProjects() {
    let page = $('#emp_page').val();
    let per_page = $('#emp_per_page').val();
    if(per_page < 5) {
        swal("Oops!", "List per page cannot be less than 5", "warning")
        per_page = 5
    }
    let search = $('#emp_search').val();
    let sort_by = $('.sort-filter').val();
    let cat_id = ""
    let cat = $('.cat-filter').val();
    if(cat.trim() !== "") {
        cat_id = `&category_id=${cat}`
    }
    let url = `${base_url}projects/get_projects/?api_token=${localStorage.api_key}&page=${page}&per_page=${per_page}&sort_by=${sort_by}&search=${search}${cat_id}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.emp-list').empty()
      if(data['status'] == 'success') {
        let pages = data.total_pages
        $('.emp-no').html(data['total_items'])
        $('.page_nos').empty();
        for(var i=0; i<pages; i++) {
            let classN = "";
            if((i+1) == data.page_number) {
                classN = "active"
            }
            if((i+1) > (data.page_number + 1) || (i+1) < (data.page_number - 1)) {
                continue
            }
            var temp = `<a href="#" class="page_no ${classN}" data-id="${i+1}">${i+1}</a>`;
            $('.page_nos').append(temp);
        }
        let current_p = $('.page_no.active').data('id')
        //console.log(current_p + ":" + typeof(current_p))
        if((current_p - 1) > 0) {
            let prev = `<a href="#" class="page_no" data-id="${current_p - 1}"><i class="fa fa-angle-left"></i></a>`
            $('.page_nos').prepend(prev);
        }
        if((current_p + 1) <= data.total_pages) {
            let next = `<a href="#" class="page_no" data-id="${current_p + 1}"><i class="fa fa-angle-right"></i></a>`
            $('.page_nos').append(next);
        }
        $('.page_no').click(function(e) {
            e.preventDefault();
            let page = $(this).data('id');
            $('#emp_page').val(page);
            getProjects();
        })
        if(data.data) {
            let e = data.data;
            for(var i in e) {
                date = new Date(e[i].created).toLocaleDateString();
                let temp = `<tr>
                <td>
                <div class="w-bold-xx w-text-indigo">${e[i].title}</div>
                <p><a class="w-small w-text-red" href="${e[i].live_url}">Live Site</a>&nbsp;&nbsp;&nbsp;<a class="w-small w-text-red" href="${e[i].github_url}">Repository</a></p>
                </td>
                <td>${e[i].category.title}</td>
                <td>${e[i].database.title}</td>
                <td>${date}</td>
                <td>
                <a href="#" class="emp-det-link" data-id="${e[i].id}"><i class="fa fa-eye"></i> View</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" class="emp-com-link" data-id="${e[i].id}"><i class="fa fa-bar-chart"></i> Details</a>
                </td>
              </tr>`;
              $('.emp-list').append(temp)
            }
            $('.emp-det-link').click(function(e) {
                e.preventDefault();
                let id = $(this).data('id');
                $('.emp_det_con').addClass('active')
                getCategories();
                getFrameworks();
                getDatabases();
                getProjectDetails(id);
            })
            $('.emp-com-link').click(function(e) {
                e.preventDefault();
                let id = $(this).data('id');
                $('.emp_rep_con').addClass('active')
                getProjectComments(id);
            })
        }
        else {
            let temp = `<tr>
            <td colspan="6">No projects found.</td>
            </tr>`;
            $('.emp-list').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        $('.emp-no').html('0');
        let temp = `<tr>
            <td colspan="6">${data['message']}</td>
            </tr>`;
            $('.emp-list').append(temp)
      }
    })
    .catch(err => {console.log(err)})
}
getProjects()

function addProject() {
    let url = `${base_url}projects/create_project/`;

    let title = $('#pro-title').val()
    let db = $('#pro-db').val()
    let cat = $('#pro-cat').val()
    let link = $('#pro-link').val()
    let git = $('#pro-git').val()
    let des = $('#pro-des').val()
    let image = $('.pro-img')[0].files[0]

    if(title.trim() === '' || cat.trim() === '' || des.trim() === '') {
        swal("OOps", "Title, Description or Category cannot be empty", "warning");
        return;
    }
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('title', title)
    formData.append('database_id', db)
    formData.append('category_id', cat)
    formData.append('url', link)
    formData.append('github', git)
    formData.append('description', des)
    if(image) {
        formData.append('image', image)
    }
    $('.pro-frames:checked').each(function() {
        formData.append('frame_ids', $(this).val())
    })

    $('.emp-add-btn').html('Adding Project...').attr('disabled', true)
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'Application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            swal("Success", data.message, 'success')
            getProjects();
            $('#add-emp-form')[0].reset()
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
        $('.emp-add-btn').html('Add Project').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.emp-add-btn').html('Add Project').attr('disabled', false)
    })
}

function getProjectDetails(id) {
    let url = `${base_url}projects/get_project/?project_id=${id}&api_token=${localStorage.api_key}&type=admin`
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        if(data['status'] == 'success') {
            e = data.data;
            $('#pro-title2').val(e.title)
            $('#pro-db2').val(e.database.id)
            $('#pro-cat2').val(e.category.id)
            $('#pro-link2').val(e.live_url)
            $('#pro-git2').val(e.github_url)
            $('#pro-des2').val(e.description)
            $('.emp-edit-btn').data('id', e.id)
            $('.emp-del-btn').data('id', e.id)
            $('.emp-del-btn').data('name', e.title)
            if(e.image) {
                $('.emp_image').attr('src', `${base_image_url}${e.image}`)
            }
            else {
                $('.emp_image').attr('src', `./static/image/logo.png`)
            }
            let frames = document.getElementsByClassName('pro-frames2');
            for(var i=0; i<frames.length; i++) {
                f = e.frameworks
                for(var j in f) {
                    if(f[j].id == frames[i].value) {
                        //console.log(`${frames[i].value} matched`)
                        frames[i].setAttribute('checked', 'checked');
                    }
                }
            }
        }
    })
    .catch(err => {
        console.log(err)
    })
}
function readFile() {
    let reader = new FileReader();
    let file = document.querySelector('#pro-img2').files[0];
    reader.onload = function(e) {
        document.querySelector('.emp_image').src = e.target.result;
    }
    reader.readAsDataURL(file);
}

function getProjectComments(id) {
    $('#com_id').val(id)
    let page = $('#com_page').val();
    let per_page = 10;
    let search = $('#com_search').val();
    let sort_by = $('.star-filter').val();
    let url = `${base_url}comments/get_comments/?project_id=${id}&api_token=${localStorage.api_key}&page=${page}&per_page=${per_page}&search=${search}&sort_by=${sort_by}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.comm-list').empty()
      if(data['status'] == 'success') {
        let pages = data.total_pages
        $('#pro-comm-title').html(data.project.title)
        $('.iframe-content').attr('src', data.project.live_url)
        $('.com_page_nos').empty();
        for(var i=0; i<pages; i++) {
            let classN = "";
            if((i+1) == data.page_number) {
                classN = "active"
            }
            if((i+1) > (data.page_number + 1) || (i+1) < (data.page_number - 1)) {
                continue
            }
            var temp = `<a href="#" class="com_page_no ${classN}" data-id="${i+1}">${i+1}</a>`;
            $('.com_page_nos').append(temp);
        }
        let current_p = $('.com_page_no.active').data('id')
        //console.log(current_p + ":" + typeof(current_p))
        if((current_p - 1) > 0) {
            let prev = `<a href="#" class="com_page_no" data-id="${current_p - 1}"><i class="fa fa-angle-left"></i></a>`
            $('.com_page_nos').prepend(prev);
        }
        if((current_p + 1) <= data.total_pages) {
            let next = `<a href="#" class="com_page_no" data-id="${current_p + 1}"><i class="fa fa-angle-right"></i></a>`
            $('.com_page_nos').append(next);
        }
        $('.com_page_no').click(function(e) {
            e.preventDefault();
            let page = $(this).data('id');
            $('#com_page').val(page);
            getProjectComments(id);
        })
        if(data.data) {
            let e = data.data;
            for(var i in e) {
                date = new Date(e[i].date).toLocaleDateString();
                let reply = ''
                if(e[i].reply === undefined || (e[i].reply).trim() === '') {
                    reply = `<a href="#" data-toggle="modal" data-target="#replyCommentModal" class="com-rep-link" data-id="${e[i].id}"><i class="fa fa-reply"></i> Reply</a>&nbsp;&nbsp;&nbsp;&nbsp;`
                }
                else {
                    reply = `<a href="#" data-toggle="modal" data-target="#replyCommentModal" class="com-rep-edit" data-id="${e[i].id}">
                    <i class="fa fa-reply"></i> Edit Reply<span class="d-rep w-hide">${e[i].reply}</span>
                    </a>&nbsp;&nbsp;&nbsp;&nbsp;`
                }
                let temp = `<tr>
                <td>
                <div class="w-bold-xx w-text-indigo">${e[i].name}</div>
                <p>
                    ${reply}
                    <a href="#" class="com-del-link" data-id="${e[i].id}"><i class="fa fa-trash"></i> Delete</a>
                </p>
                </td>
                <td>${e[i].email}</td>
                <td>${e[i].comment}</td>
                <td id="star-no${e[i].id}"></td>
                <td>${date}</td>
              </tr>`;
              let star = e[i].star
              let cid = e[i].id
              $('.comm-list').append(temp)
              for(var i=0; i<star; i++) {
                $(`#star-no${cid}`).append(`<i class="fa fa-star w-text-yellow"></i>`);
            }
            }
            $('.com-rep-link').click(function() {
                let id = $(this).data('id');
                $('#comment_id').val(id)
                $('#reply').val('')
            })
            $('.com-rep-edit').click(function() {
                let id = $(this).data('id');
                let rep = $(this).children('.d-rep').text();
                //console.log(rep)
                $('#comment_id').val(id)
                $('#reply').val(rep)
            })
            $('.com-del-link').click(function(e) {
                e.preventDefault();
                let id = $(this).data('id');
                $('.msg-go-btn').data('id', id)
                $('.msg-go-btn').data('name', 'comment')
                $('.message-content').html(`Are you sure you want to delete this comment?<br>This action is permanent`)
                //console.log('done')
                $('.message-con').addClass('active') 
            })
        }
        else {
            let temp = `<tr>
            <td colspan="6">No comments found.</td>
            </tr>`;
            $('.comm-list').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        //$('.emp-no').html('0');
        let temp = `<tr>
            <td colspan="6">${data['message']}</td>
            </tr>`;
            $('.comm-list').append(temp)
      }
    })
    .catch(err => {console.log(err)})
}

function editProject() {
    let url = `${base_url}projects/edit_project/`;
    let id = $('.emp-edit-btn').data('id')
    console.log(id)
    let title = $('#pro-title2').val()
    let db = $('#pro-db2').val()
    let cat = $('#pro-cat2').val()
    let link = $('#pro-link2').val()
    let git = $('#pro-git2').val()
    let des = $('#pro-des2').val()
    let image = $('.pro-img2')[0].files[0]

    if(title.trim() === '' || cat.trim() === '' || des.trim() === '') {
        swal("OOps", "Title, Description or Category cannot be empty", "warning");
        return;
    }
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('project_id', id);
    formData.append('title', title)
    formData.append('database_id', db)
    formData.append('category_id', cat)
    formData.append('url', link)
    formData.append('github', git)
    formData.append('description', des)
    if(image) {
        formData.append('image', image)
    }
    $('.pro-frames2:checked').each(function() {
        formData.append('frame_ids', $(this).val())
    })

    $('.emp-edit-btn').html('Saving...').attr('disabled', true)
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
        if(data['status'] == 'success') {
            swal("Success", data.message, 'success')
            getProjectDetails(id)
            getProjects();
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
        $('.emp-edit-btn').html(`<i class="fa fa-check-circle"></i> Save Project`).attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.emp-edit-btn').html(`<i class="fa fa-check-circle"></i> Save Project`).attr('disabled', false)
    })
}

function deleteProject(id) {
    let url = `${base_url}projects/delete_project/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('project_id', id);
    $('.emp-del-btn').html('Deleting...').attr('disabled', true)
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
        if(data['status'] == 'success') {
            swal("Success", data.message, 'success')
            $('.emp_det_con').removeClass('active')
            getProjects();
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
        $('.emp-del-btn').html(`<i class="fa fa-trash"></i> Delete Project`).attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.emp-del-btn').html(`<i class="fa fa-trash"></i> Delete Project`).attr('disabled', false)
    })
}
function deleteComment(id) {
    let url = `${base_url}comments/delete_comment/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('comment_id', id);
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
        if(data['status'] == 'success') {
            swal("Success", data.message, 'success')
            let p_id = $('#com_id').val()
            getProjectComments(p_id)
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
    })
    .catch(err => {
        console.log(err);
    })
}

function replyComment(id) {
    let url = `${base_url}comments/reply_comment/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('comment_id', id);
    formData.append('reply', $('#reply').val());
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
        if(data['status'] == 'success') {
            swal("Success", data.message, 'success')
            $('#rep-comment-form')[0].reset()
            let p_id = $('#com_id').val()
            getProjectComments(p_id)
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
    })
    .catch(err => {
        console.log(err);
    })
}

tinymce.init({
    selector: '.html-text',
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Admin',
    mergetags_list: [
        {value: 'First.Name', title: 'First Name'},
        {value: 'Email', title: 'Email'},
    ],
});
