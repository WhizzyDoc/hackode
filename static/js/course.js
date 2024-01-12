
function getCourses() {
    let url = `${base_url}courses/get_courses/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
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
        swal("Error", "Please check your internet connection", "error")
    })
  }
  getCourses();

  function getQuizzes(id) {
    let url = `${base_url}courses/get_quizzes/?course_id=${id}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
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
        swal("Error", "Please check your internet connection", "error")
    })
  }

  function getMaterials(id) {
    let url = `${base_url}courses/get_materials/?course_id=${id}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.mat-row').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                let icon, clas;
                if(d[i].active === true) {
                    icon = `<i class="w-text-red fa fa-certificate"></i>`;
                    clas = 'm-active'
                }
                else {
                    icon = `<i class="w-text-red fa fa-lock"></i>`;
                    clas = 'm-inactive'
                }
                var temp = `
                <tr class="q-item ${clas}" data-id="${d[i].id}">
                    <td>${icon}&nbsp;&nbsp;${d[i].topic.title}<td>
                    <td><i class="fa fa-chevron-right"></i></td>
                </tr>`;
                $('.mat-row').append(temp)
            }
            $('.m-active').click(function() {
                let id = $(this).data('id')
                $('.mat_c_con').addClass('active')
                getMaterial(id)
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
        swal("Error", "Please check your internet connection", "error")
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
        swal("Error", "Please check your internet connection", "error")
    })
  }

  function getMaterial(id) {
    let url = `${base_url}courses/get_material/?material_id=${id}`;
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
      if(data['status'] == 'success') {
        d = data.data
        $('.mat-title').html(d.topic.title);
        $('.mat-content').html(d.content);
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
        swal("Error", "Please check your internet connection", "error")
    })
  }

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
