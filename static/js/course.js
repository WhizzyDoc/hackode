var timer;

  function getSkills() {
    let url = `${base_url}skills/get_user_skills/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.net-alert').hide()
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
                            <div><i class="fa fa-bar-chart"></i> 24% done</div>
                            <div><i class="fa fa-book"></i> ${data.c_count[i]} courses</div>
                            <div><i class="fa fa-video-camera"></i> ${data.v_count[i]} videos</div>
                        </div>
                    </div>
                </div>`;
                $('.skill-row').append(temp)
            }
            $('.sk-item').click(function() {
                let id = $(this).data('id')
                let name = $(this).data('name')
                $('.course-title').html(name)
                $('.cou_c_con').addClass('active')
                getSkillCourses(id)
                getSkillProjects(id)
            })
        }
        else {
            var temp = `<div>${data.message}. <a class="w-text-red" href="#skills">Explore our courses</a></div>`
            $('.skill-row').append(temp)
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

  function getSkillCourses(id) {
    let url = `${base_url}skills/get_skill_courses/?skill_id=${id}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.net-alert').hide()
      $('.course-row').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                var temp = `
                <div class="c-item c-course" data-id="${d[i].id}" data-name="${d[i].title}">
                    <img src="${base_image_url}${d[i].image}" alt="">
                    <a class="c-title">${d[i].title}</a>
                </div>`;
                $('.course-row').append(temp)
            }
            $('.c-course').click(function() {
                let id = $(this).data('id')
                let name = $(this).data('name')
                $('.course-title').html(name)
                $('.sel_c_con').addClass('active')
                getQuizzes(id)
                getMaterials(id)
                getVideos(id)
            })
        }
        else {
            $('.course-row').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.course-row').append(data.message)
      }
    })
    .catch(err => {
        console.log(err)
        $('.net-alert').show()
        getSkillCourses(id)
    })
  }

  function getSkillProjects(id) {
    let url = `${base_url}projects/get_projects/?api_token=${localStorage.api_key}&skill_id=${id}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.pro-row').empty()
      $('.net-alert').hide()
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
                    <span class="w-bold-xx h6 w-text-blue">${d[i].title}<span><br>
                    <span class="w-small w-text-gray">
                    &nbsp;
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
        $('.net-alert').show()
        getSkillProjects(id)
    })
  }

  function getQuizzes(id) {
    let url = `${base_url}courses/get_quizzes/?course_id=${id}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.net-alert').hide()
      $('.quiz-row').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                let icon, clas;
                if(d[i].active === true) {
                    icon = `<i class="w-text-red fa fa-certificate"></i>`;
                    clas = 'q-active'
                }
                else {
                    icon = `<i class="w-text-red fa fa-lock"></i>`;
                    clas = 'q-inactive'
                }
                var temp = `
                <tr class="q-item ${clas}" data-id="${d[i].id}">
                    <td>${icon}&nbsp;&nbsp;${d[i].topic.title}<td>
                    <td><i class="fa fa-chevron-right"></i></td>
                </tr>`;
                $('.quiz-row').append(temp)
            }
            $('.q-active').click(function() {
                let id = $(this).data('id')
                $('.qui_c_con').addClass('active')
                getQuiz(id)
            })
            $('.q-inactive').click(function() {
                swal('Oops!', 'Sorry, this quiz is locked at the moment', 'warning')
            })
        }
        else {
            let temp = `
            <tr>
                <td colspan="2">${data.message}</td>
            </tr>`
            $('.quiz-row').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        let temp = `
            <tr>
                <td colspan="2">${data.message}</td>
            </tr>`
            $('.quiz-row').append(temp)
      }
    })
    .catch(err => {
        console.log(err)
        $('.net-alert').show()
        getQuizzes(id)
    })
  }

  function getVideos(id) {
    let url = `${base_url}courses/get_videos/?course_id=${id}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.net-alert').hide()
      $('.vid-row').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                let icon = `<i class="w-text-gray fa fa-video-camera"></i>`;
                var temp = `
                <tr class="q-item vid-item" data-id="${d[i].id}">
                    <td>${icon}&nbsp;&nbsp;${d[i].title}<td>
                    <td><i class="fa fa-chevron-right"></i></td>
                </tr>`;
                $('.vid-row').append(temp)
            }
            $('.vid-item').click(function() {
                let vid = $(this).data('id')
                $('.vid_c_con').addClass('active')
                getVideo(vid)
            })
        }
        else {
            let temp = `
            <tr>
                <td colspan="2">${data.message}</td>
            </tr>`
            $('.vid-row').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        let temp = `
            <tr>
                <td colspan="2">${data.message}</td>
            </tr>`
            $('.vid-row').append(temp)
      }
    })
    .catch(err => {
        console.log(err)
        $('.net-alert').show()
        getVideos(id)
    })
  }

  function getMaterials(id) {
    let url = `${base_url}courses/get_materials/?course_id=${id}&api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      console.log(data);
      $('.net-alert').hide()
      $('.mat-row').empty()
      $('.mat-per').html(`0% Completed`)
            $('.mat-progress').css({'width': `0%`})
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            $('.mat-per').html(`${data.percentage_read}% Completed`)
            $('.mat-progress').css({'width': `${data.percentage_read}%`})
            for(var i in d) {
                let icon, clas;
                let read = `<i class="fa fa-chevron-right"></i>`
                if(d[i].active === true) {
                    icon = `<i class="w-text-red fa fa-certificate"></i>`;
                    clas = 'm-active'
                }
                else {
                    icon = `<i class="w-text-red fa fa-lock"></i>`;
                    clas = 'm-inactive'
                }
                if(d[i].read === true) {
                    read = `<i class="w-text-green fa fa-check"></i>&nbsp;`;
                }
                var temp = `
                <tr class="q-item ${clas}" data-id="${d[i].order}" data-name="${d[i].topic.id}">
                    <td>${icon}&nbsp;&nbsp;${d[i].topic.title}<td>
                    <td>${read}</td>
                </tr>`;
                $('.mat-row').append(temp)
            }
            $('.last_mat').data('id', data.last_order)
            $('.m-active').click(function() {
                let order = $(this).data('id')
                let id = $(this).data('name')
                $('.mat_c_con').addClass('active')
                getMaterial(id, order)
            })
            $('.m-inactive').click(function() {
                swal('Oops!', 'Sorry, this material is locked at the moment', 'warning')
            })
        }
        else {
            let temp = `
            <tr>
                <td colspan="2">${data.message}</td>
            </tr>`
            $('.mat-row').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        let temp = `
            <tr>
                <td colspan="2">${data.message}</td>
            </tr>`
            $('.mat-row').append(temp)
      }
    })
    .catch(err => {
        console.log(err)
        $('.net-alert').show()
        getMaterials(id)
    })
  }

  function getQuiz(id) {
    $('.answers-con').hide()
    let url = `${base_url}courses/get_quiz/?quiz_id=${id}`;
    $('.quiz-title').empty()
    let con = `<div class="loader">
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
        </div>`
    $('.quiz-ques').html(con)
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        $('.net-alert').hide()
        $('.quiz-ques').empty()
        $('.quiz-ind').empty()
      console.log(data);
      if(data['status'] == 'success') {
        d = data.data;
        q = data.questions;
        $('.quiz-title').html(d.topic.title);
        $('.answers-con').data('id', id)
        if(q.length > 0) {
            for(var i in q) {
                var temp = `<div class="mySlides fadem">
                            <div class="w-bold-x w-text-blue h4">Question ${q[i].order}</div>
                            <div class="mb-2 questions">${q[i].question}</div>
                            <form id="question_${q[i].order}" class="quiz-form mt-3 mb-3">
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" value="optionA" checked name="answer_${q[i].order}">A: ${q[i].optionA}
                                </label>
                            </div>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" value="optionB" name="answer_${q[i].order}">B: ${q[i].optionB}
                                </label>
                            </div>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" value="optionC" name="answer_${q[i].order}">C: ${q[i].optionC}
                                </label>
                            </div>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" value="optionD" name="answer_${q[i].order}">D: ${q[i].optionD}
                                </label>
                            </div>
                            <input type="hidden" class="answers" id="answer_to_${q[i].order}" value="${q[i].answer}">
                            </form>
                        </div>`;
                var ind = `<span class="dot" onclick="currentSlide(${q[i].order})"></span>`
                $('.quiz-ques').append(temp)
                $('.quiz-ind').append(ind)
            }
            showQue()
        }
      }
      else if(data['status'] == 'error') {
        swal('Error', data.message, 'error')
      }
    })
    .catch(err => {
        console.log(err)
        $('.net-alert').show()
        getQuiz(id)
    })
  }

  function getMaterial(id, order, type="invalid") {
    if(Number(order) < 1) {
        swal('Info', "You have reached the first topic", 'info')
        return
    }
    var last_mat = $('.last_mat').data('id')
    var lm = ""
    if(last_mat !== "") {
        lm = Number(last_mat)
    }
    if(Number(order) > lm) {
        swal('Info', "You have reached the last topic", 'info')
        return
    }
    stopReading()
    let url = `${base_url}courses/get_next_material/?topic_id=${id}&order=${order}&type=${type}`;
    let con = `<div class="loader">
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
        </div>`
    $('.mat-content').html(con)
    $('.mat-title').empty()
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
    $('.mat-content').empty()
      //console.log(data);
      $('.net-alert').hide()
      if(data['status'] == 'success') {
        
        d = data.data
        $('.mat-title').html(d.topic.title);
        $('.mat-content').html(d.content);
        startReading(d.id)
        $('.prev-b').data('id', id)
        $('.prev-b').data('name', d.order-1)
        $('.next-b').data('id', id)
        $('.next-b').data('name', d.order+1)
        Prism.highlightAll()
        $('pre').each(function(index) {
      var $pre = $(this);
      var $button = $('<button class="copy-button"><i class="fa fa-copy"></i> Copy Code</button>');
      var $tryit = $('<button class="try-button"><i class="fa fa-code"></i> Try it Yourself</button>');
      $button.click(function() {
        var $tempInput = $('<textarea>');
        $('body').append($tempInput);
        $tempInput.val($pre.find('code').text()).select();
        document.execCommand('copy');
        $tempInput.remove();
        alert('Copied!');
      });
      $tryit.click(function() {
        var $tempInput = $('<textarea>');
        $('body').append($tempInput);
        text = $pre.find('code').text();
        $('#editor').val(text)
        displayHighlight()
        showBrowser()
        $('.edi_c_con').addClass('active')
      });
      $pre.append($button);
      $pre.append($tryit);
      
    });

      }
      else if(data['status'] == 'error') {
        if(data.type == "material") {
            var i = $('.prev-b').data('id')
            var o = $('.prev-b').data('name')
            or = Number(o) + 1
            getMaterial(i, or)
            swal('Info', "You have reached the last topic", 'info')
        }
        else {
            swal('Error', data.message, 'error')
        }
        
      }
    })
    .catch(err => {
        console.log(err)
        $('.net-alert').show()
    })
  }

  function getVideo(id) {
    let url = `${base_url}courses/get_video/?video_id=${id}`;
    let con = `<div class="loader">
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
        </div>`
    $('.vid-content').html(con)
    $('.vid-title').empty()
    $('.course-vid').attr('src', '')
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        $('.net-alert').hide()
        $('.vid-content').empty()
        //console.log(data);
      if(data['status'] == 'success') {
        d = data.data
        $('.vid-title').html(d.title);
        $('.course-vid').attr('src', d.link)
        $('.vid-content').html(d.description);
      }
      else if(data['status'] == 'error') {
        swal('Error', data.message, 'error')
      }
    })
    .catch(err => {
        console.log(err)
        $('.net-alert').show()
        getVideo(id)
    })
  }

  function getProject(id) {
    let url = `${base_url}projects/get_project/?project_id=${id}&api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.net-alert').hide()
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
        $('.net-alert').show()
        getProject(id)
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
        getProjects()
    })
    .catch(err => {
        console.log(err);
        $('.submit-form-btn').html(`Submit Project`).attr('disabled', false)
        $('.net-alert').show()
    })
}

function startReading(id) {
    timer = setTimeout(function() {
        console.log(`Material ${id} Read`)
        var url = `${base_url}courses/read_material/?material_id=${id}&api_token=${localStorage.api_key}`;
        fetch(url)
        .then(res => {return res.json()})
        .then(data => {
            //console.log(data)
            if(data.status == 'success') {
                getMaterials(data.data.id)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, 30000);
}
function stopReading() {
    clearTimeout(timer)
}

  function submitQuiz() {
    let marked_answers = []
    let chosen_answers = []
    let real_answers = []
    let quiz_questions = []
    //console.log('submitted')
    $('.next').html('Submitting')
    let questions = document.querySelectorAll('.questions')
    no_of_que = questions.length
    //console.log(no_of_que)
    for(var i=1; i<=no_of_que; i++) {
        //quiz_questions.push(questions[i].TextContent())
        var real_ans = document.querySelector(`#answer_to_${i}`).value;
        real_answers.push(real_ans)
        var options = document.getElementsByName(`answer_${i}`);
        for(var j=0; j<options.length; j++) {
            if(options[j].checked) {
                chosen_answers.push(options[j].value)
                if(options[j].value === real_ans) {
                    marked_answers.push('correct')
                }
                else {
                    marked_answers.push('wrong')
                }
            }
        }
    }
    //console.log(quiz_questions)
    console.log(chosen_answers)
    console.log(real_answers)
    console.log(marked_answers)

    let url = `${base_url}courses/submit_quiz/`;
    const formData = new FormData();
    formData.append('quiz_id', $('.answers-con').data('id'))
    formData.append('api_token', localStorage.api_key)
    for(var i=0; i<marked_answers.length; i++) {
        formData.append('answers', marked_answers[i])
    }
    console.log(formData)

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
        $('.next').html('Submit')
        swal(data.status, data.message, data.status)
        // show answers
        $('.answers-con').show()
        $('.ans-con').empty()
        for(var i=0; i<real_answers.length; i++) {
            var temp = `<div class="answer-con w-padding w-card">
            <h4><span class="w-text-blue">Question: </span>${i+1}</h4>
            <h4><span class="w-text-blue">Selected Answer: </span>${chosen_answers[i]}</h4>
            <h4><span class="w-text-blue">Real Answer: </span>${real_answers[i]}</h4>
        </div>`;
        $('.ans-con').append(temp)
        }
    })
    .catch(err => {
        console.log(err)
        $('.net-alert').show()
    })
  }
  function escapeHtml(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  }
  function displayHighlight() {
    var code1 = $('#editor').val();
      //console.log(code1)
      escapedString = escapeHtml(code1)
      content = `<pre class="language-markup"><code>${escapedString}</code></pre>`
      //console.log(content)
      $('#editable').html(content)
      Prism.highlightAll()
    }

    var code = document.querySelector("#code_result").contentWindow.document
    var html = document.querySelector("#editor");
    //For code compilation into browser
    function showBrowser() {
        code.open();
        code.writeln(
        html.value
        );
        code.close();
    }
    document.body.onkeyup = function() {
        showBrowser()
    };

  var slideIndex = 1;
  function showQue() {
    showSlides(slideIndex);
  }

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  var prevnext = document.querySelector('.prev-next')
  if (n < 1) {
    slideIndex = 1
}
  
  if (n == slides.length) {
    prevnext.innerHTML = `<a class="prev" onclick="plusSlides(-1)">&#10094; Prev</a>
    <a class="next" onclick="submitQuiz()">Submit</a>`
}
else {
    prevnext.innerHTML = `<a class="prev" onclick="plusSlides(-1)">&#10094; Prev</a>
    <a class="next" onclick="plusSlides(1)">Next &#10095;</a>`
}
  //if (n > slides.length) {slideIndex = 1}
  
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


function readFile() {
    let reader = new FileReader();
    let file = document.querySelector('#pro-img2').files[0];
    reader.onload = function(e) {
        document.querySelector('.emp_image').src = e.target.result;
    }
    reader.readAsDataURL(file);
}

