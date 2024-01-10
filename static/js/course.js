
function getCourses() {
    let url = `${base_url}courses/get_courses/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      console.log(data);
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
                $('.c-options').data('id', id)
                $('.sel_c_con').addClass('active')
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
    .catch(err => {console.log(err)})
  }
  getCourses();




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
