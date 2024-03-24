
function last_chat() {
    $('.app-content').scrollTop($('.app-content')[0].scrollHeight);
    $('#gpt-content').scrollTop($('#gpt-content')[0].scrollHeight);

};
function loadGPTMessages() {
    var url;
    if(localStorage.gpt_room_id) {
        url = `${base_url}gptrooms/get_current_room/?api_token=${localStorage.api_key}&room_id=${localStorage.gpt_room_id}`;
    }
    else {
        url = `${base_url}gptrooms/get_current_room/?api_token=${localStorage.api_key}`;
    }
    let con = `<div class="loader">
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
        </div>`;
    $('#gpt-content').html(con)
    fetch(url)
    .then(response => {
        if(!response.ok) {
           throw new Error('Network response was not ok');
        } 
         return response.json() // convert response to json
    })
    .then(data => {
        //console.log(data)
        $('#gpt-content').empty()
        if(data['status'] == 'success') {
            if(!data.data) {
                $('#gpt-content').html(`<p class="w-center w-text-gray w-small">No messages yet</p>`)
            }
            if(data['mode'] == 'new') {
                localStorage.setItem('gpt_room_id', data.data.id)
                $('#gpt-content').html(`<p class="w-center w-text-gray w-small">No messages yet</p>`)
            }
            else if(data['mode'] == 'existing' || data['mode'] == 'first') {
                if(data['mode'] == 'first') {
                    localStorage.gpt_room_id = data.room.id;
                }
                if(data.data) {
                    c = data.data;
                    for(var i in c) {
                        var hour = new Date(c[i].date).getHours();
                        var min = new Date(c[i].date).getMinutes();
                        var session = (hour >= 12) ? "pm" : "am";
                        hour = (hour > 12) ? hour - 12 : hour;
                        min = (min < 10) ? "0" + min : min;
                        time = `${hour}:${min} ${session}`;
                        var reply = c[i].reply;
                        var formattedHtml = '';
                        var segments = reply.split(/(<code>.*?<\/code>)/);
                        for(var a=0; a<segments.length; a++) {
                            if(segments[a].startsWith('<code>')) {
                                formattedHtml += segments[a];
                            }
                            else {
                                formattedHtml += $('<div>').text(segments[a]).html()
                            }
                        }
                        var temp = `<div class="message-con">
                                        <div class="chat user">
                                            <div class="options copy-chat" data-name='${c[i].prompt}'>
                                                <i class="fa fa-copy option" data-action="copy"></i> Copy
                                            </div>
                                            <div class="msg">${c[i].prompt}</div>
                                            <div class="time w-right">${time}</div>
                                        </div>
                                    </div>
                                    <div class="message-con">
                                        <div class="chat other">
                                            <div class="options copy-chat" data-name='${c[i].reply}'>
                                                <i class="fa fa-copy option" data-action="copy"></i> Copy
                                            </div>
                                            <div class="msg">${escapeHtml(c[i].reply)}</div>
                                            <div class="time w-right">${time}</div>
                                        </div>
                                    </div>`;
                        $('#gpt-content').append(temp)
                    }
                    $('code').addClass('language-html')
                    $('code').addClass('highlighting-content')
                    last_chat();
                    $('.chat').click(function() {
                        $(this).children('.options').toggleClass('active');
                    })
                    $('.options').click(function() {
                        var text = $(this).data('name')
                        $(this).removeClass('active');
                        copyText(text)
                    })
                }
                else {
                    $('#gpt-content').html(`<p class="w-center w-text-gray w-small">${data.message}</p>`)
                }
            }
        }
        else if(data['status'] == 'error') {
            $('#gpt-content').html(`<p class="w-center w-text-gray w-small">${data.message}</p>`)
        }
        $('.page-loader').hide()
    })
    .catch(error => {
        console.log(error);
    })
}
loadGPTMessages()

function loadHistory() {
    var url = `${base_url}gptrooms/get_gpt_rooms/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(response => {
        if(!response.ok) {
           throw new Error('Network response was not ok');
        } 
         return response.json() // convert response to json
    })
    .then(data => {
        //console.log(data)
        $('.gpt-row').empty()
        if(data['status'] == 'success') {
            h = data.data;
            for(var i in h) {
                var title;
                t = h[i].title;
                if(t.length > 28) {
                    title = t.substring(0, 28) + "...";
                }
                else {
                    title = t;
                }
                var temp = `<tr class="history-item" data-id="${h[i].id}">
                                <td><i class="fa fa-comments"></i>&nbsp;&nbsp;${title}</td>
                                <td class="w-flex w-flex-center w-align-center"><i class="fa fa-chevron-right"></i></td>
                            </tr>`;
                $('.gpt-row').append(temp);
            }
        }
        else if(data['status'] == 'error') {
            var temp = `<tr>
                                <td colspan="2">${data.message}</td>
                            </tr>`;
            $('.gpt-row').append(temp);
        }

        $('.history-item').click(function() {
            var id = $(this).data('id');
            localStorage.gpt_room_id = id;
            $('.gpt_c_con').removeClass('active');
            loadGPTMessages();
        })
    })
    .catch(error => {
        console.log(error);
    })
}

function sendGPTChat() {
    var url = `${base_url}gptrooms/send_gpt_chat/`;
    const formData = new FormData();
    var prompt = $('#gpt-prompt').val();
    if(prompt.trim() == '') {
        return;
    }
    formData.append('api_token', localStorage.api_key);
    formData.append('room_id', localStorage.gpt_room_id);
    formData.append('prompt', prompt)

    // get current time
    var hour = new Date().getHours();
    var min = new Date().getMinutes();
    var session = (hour >= 12) ? "pm" : "am";
    hour = (hour > 12) ? hour - 12 : hour;
    min = (min < 10) ? "0" + min : min;
    time = `${hour}:${min} ${session}`;

    // append chat to container
    var temp = `<div class="message-con">
                    <div class="chat user">
                        <div class="options copy-chat" data-name='${prompt}'>
                            <i class="fa fa-copy option" data-action="copy"></i> Copy
                        </div>
                        <div class="msg">${prompt}</div>
                        <div class="time w-right">${time}</div>
                    </div>
                </div>
                <div class="message-con temporary">
                    <div class="chat other">
                        <div class="msg">Generating response...</div>
                    </div>
                </div>`;
    $('#gpt-content').append(temp)
    last_chat();

    $('#gpt-prompt').val('');
    $('#gpt-prompt').css({'height': 'fit-content'});
    fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          },
        body: formData
    })
    .then(response => {
        if(!response.ok) {
           throw new Error('Network response was not ok');
        } 
         return response.json() // convert response to json
    })
    .then(data => {
        //console.log(data);
        $('.temporary').remove();
        if(data.status == 'success') {

            var temp = `<div class="message-con">
                    <div class="chat other">
                        <div class="options copy-chat" data-name='${data.data.reply}'>
                            <i class="fa fa-copy option" data-action="copy"></i> Copy
                        </div>
                        <div class="msg" id="reply_${data.data.id}"></div>
                        <div class="time w-right">${time}</div>
                    </div>
                </div>`;
            $('#gpt-content').append(temp)

            var txt = `${escapeHtml(data.data.reply)}`;
            elem = $(`#reply_${data.data.id}`);
            typeWriter(txt, elem);
            //loadGPTMessages()
        }
        else if(data.status == 'error') {
            var message;
            if(data.mode == 'server') {
                message = `No API Key found! <a href="#profile" class="w-text-red">Click Here</a> to set up your OpenAI API Key.
                 If you don't have a key, <a href="#openai_key" class="w-text-red">Click Here</a> to learn how to get a key.`;
            }
            else if(data.mode == 'gpt') {
                message = data.message;
            }
            var temp = `<div class="message-con">
                    <div class="chat other">
                        <div class="msg error-message">${message}</div>
                    </div>
                </div>`;
            $('#gpt-content').append(temp);
            last_chat();
        }
    })
    .catch(err => {
        var temp = `<div class="message-con">
                    <div class="chat other">
                        <div class="msg error-message">${err}</div>
                    </div>
                </div>`;
            $('#gpt-content').append(temp);
            last_chat();
    })
    $('.options').click(function() {
                        var text = $(this).data('name')
                        $(this).removeClass('active');
                        copyText(text)
                    })
}

function createGPTRoom() {
    var url = `${base_url}gptrooms/create_gpt_room/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    $('.create-new-room').attr('disabled', true).html(`<i class="fa fa-spinner"></i> Creating...`)
    
    fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          },
        body: formData
    })
    .then(response => {
        if(!response.ok) {
           throw new Error('Network response was not ok');
        } 
         return response.json() // convert response to json
    })
    .then(data => {
        console.log(data);
        if(data.status == 'success') {
            localStorage.gpt_room_id = data.data.id;
            $('.gpt_c_con').removeClass('active');
            loadGPTMessages();
            loadHistory();
        }
        else if(data.status == 'error') {
            swal('Error', data.message, 'error');
        }
        $('.create-new-room').attr('disabled', false).html(`<i class="fa fa-plus"></i> New Conversation`)
    })
    .catch(err => {
        console.log(err);
        $('.create-new-room').attr('disabled', false).html(`<i class="fa fa-plus"></i> New Conversation`)
    })
}

var y = 0

function typeWriter(txt, elem) {
    if (y < txt.length) {
        elem.html(txt.substring(0, y + 1));
        y++;
        last_chat();
        setTimeout(function() {
            typeWriter(txt, elem);
        }, 30);
    }
}

function copyText(message) {
    const textArea = document.createElement('textarea');
    textArea.value = message;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea)
    swal('Success', 'copied!', 'success')
}

function escapeHtml(text) {
    var escapedText = $('<div>').text(text).html();
    return escapedText.replace(/\n/g, '<br>')
}
