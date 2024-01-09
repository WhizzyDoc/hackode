function getNotifications() {
    let page = $('#note_page').val();
    let per_page = 20;
    let search = $('#note_search').val();
    let seen = $('.read-filter').val();
    let url = `${base_url}notifications/get_notifications/?api_token=${localStorage.api_key}&page=${page}&per_page=${per_page}&search=${search}&seen=${seen}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.note-list').empty()
      if(data['status'] == 'success') {
        let pages = data.total_pages
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
            $('#note_page').val(page);
            getNotifications();
        })
        if(data.data) {
            let e = data.data;
            for(var i in e) {
                date = new Date(e[i].date).toLocaleDateString();
                let action;
                if(e[i].seen === true) {
                    action = `<a href="#" class="w-text-red read-btn" data-id="${e[i].id}" data-action="unread">Mark As Unread</a>`
                }
                else {
                    action = `<a href="#" class="w-text-green read-btn" data-id="${e[i].id}" data-action="read">Mark As Read</a>`
                }
                let temp = `<tr>
                <td>
                <div class="w-bold-xx w-text-indigo">${e[i].note}</div>
                </td>
                <td>${date}</td>
                <td>${action}</td>
              </tr>`;
              $('.note-list').append(temp)
            }
            $('.read-all-btn').remove()
            $('.note-tab-head').append(`<button class="btn btn-success read-all-btn">Mark All As Read</button>`)
            $('.read-btn').click(function(e) {
                e.preventDefault();
                let id = $(this).data('id');
                let action = $(this).data('action');
                console.log(action)
                readNote(id, action, $(this))
            })
            $('.read-all-btn').click(function(e) {
                e.preventDefault();
                readAllNote($(this))
            })
        }
        else {
            let temp = `<tr>
            <td colspan="3">No notifications found.</td>
            </tr>`;
            $('.note-list').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        //$('.emp-no').html('0');
        let temp = `<tr>
            <td colspan="3">${data['message']}</td>
            </tr>`;
            $('.note-list').append(temp)
      }
    })
    .catch(err => {console.log(err)})
}
getNotifications()

function readNote(id, action, elem) {
    let url = `${base_url}notifications/read_notification/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('note_id', id);
    formData.append('action', action);
    elem.html('Procesing...').attr('disabled', true)
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        if(data['status'] == 'success') {
            getNotifications();
        }
        else if(data['status'] == 'error') {
            swal("Error", data['message'], "error")
            getNotifications()
        }
    })
    .catch(err => {console.log(err)})
}

function readAllNote(elem) {
    let url = `${base_url}notifications/read_notification/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('action', "read_all");
    elem.html('Procesing...').attr('disabled', true)
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        if(data['status'] == 'success') {
            getNotifications();
        }
        else if(data['status'] == 'error') {
            swal("Error", data['message'], "error")
            getNotifications()
        }
    })
    .catch(err => {console.log(err)})
}