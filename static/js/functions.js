//const base_image_url = `http://127.0.0.1:8000`;
const base_image_url = `https://riganapi.pythonanywhere.com`;
const base_url = `${base_image_url}/api/v3/`;


/* Navigation bar */
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
//localStorage.removeItem('api_key')
function openNav() {
    $(".sidenav").toggleClass('active');
    $("main").toggleClass('active');
  }


function showDP() {
  if(localStorage.dp) {
    //console.log(localStorage.dp)
    $('.admin-img').attr('src', `${base_image_url}${localStorage.dp}`)
  }
}
showDP();