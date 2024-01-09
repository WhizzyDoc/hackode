
var base_url2 = `https://riganapi.pythonanywhere.com/api/v2/`
var admin = [
    // For site API
    {
        title: "Get Author Information",
        value: "get_author_info",
        method: "GET",
        url: `${base_url2}author/get_profile/?api_token={api_key}`,
        request: `
        const url = "${base_url2}author/get_profile/?api_token={api_key}"
        
        fetch(url)
        .then(res => {return res.json()})
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
        `,
        success_response: `
        {
          "status": "success",
          "message": "data fetched successfully",
          "data": {
          "id": 1,
          "user": {
            "id": 3,
            "username": "WhizzyDoc",
            "email": "hassanridwan2536@gmail.com",
            "first_name": "Eniola",
            "last_name": "Hassan",
            "is_superuser": false
          },
          "first_name": "Eniola",
          "last_name": "Hassan",
          "email": "hassanridwan2536@gmail.com",
          "phone_number": "07011978058",
          "site_title": "WhizzyPort",
          "work_description": "A backend Engineer for Web, Desktop and Mobile Application as well As Hardware Inegrations.",
          "intro": "Hi, I'm Hassan",
          "dob": "2001-04-22",
          "github": "https://github.com/WhizzyDoc/",
          "linkedin": "https://linkedin.com",
          "twitter": "https://x.com/",
          "facebook": "https://web.facebook.com/",
          "instagram": "https://instagram.com/",
          "bio": "A backend Engineer for Web, Desktop and Mobile Application",
          "api_token": "c8ghjdkk5tosrtmvbyhpcexeiook5x2gq5gd87ckobhj0jikvtkwh3g2t5xa",
          "image": "/media/portfolio/author/images/avatar-2_8zvDGyk.jpg",
          "site_logo": null,
          "address": "Harmony Villa, GT Junction, Oke Ose, Ilorin, Kwara State"
        }`,
        error_response: `
        {
          "status": "error",
          "message": "invalid API token"
        }`
    },
  /* =========================== Projects ========================= */
  {
    title: "Get Projects",
    value: "get_projects",
    method: "GET",
    url: `${base_url2}projects/get_projects/?api_token={api_key}`,
    request: `
    const url = '${base_url2}projects/get_projects/?api_token={api_key}';
    
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    // when a list is found
    {
      "status": "success",
      "data": [
          {
              "id": 1,
              "title": "Rigan API",
              "category": {
                  "id": 3,
                  "title": "API"
              },
              "database": {
                  "id": 3,
                  "title": "MongoDB"
              },
              "frameworks": [
                  {
                      "id": 1,
                      "title": "Django"
                  },
                  {
                      "id": 2,
                      "title": "Restful API"
                  },
                  {
                      "id": 8,
                      "title": "Vanilla JS"
                  }
              ],
              "description": "<p>An API Hub</p>",
              "image": null,
              "short_description": "A Platform that provides various API integrations",
              "live_url": "https://riganapi.pythonanywhere.com/",
              "github_url": "https://github.com/riganapi",
              "views": 2,
              "created": "2023-12-18T07:12:47Z"
          }
      ],
      "message": "project list retrieved",
      "page_number": 1,
      "list_per_page": 20,
      "total_pages": 1,
      "total_items": 1,
      "search_query": ""
  }
    
    // when requested list is empty
    {
      "status": "success",
      "message": "no project found",
      "page_number": 1,
      "list_per_page": 20,
      "total_pages": 1,
      "total_items": 0,
      "search_query": ""
    }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Error getting project list"
        }`,
  },
  {
    title: "Get Specific Project",
    value: "get_project",
    method: "GET",
    url: `${base_url2}projects/get_project/?project_id={id_of_project}&api_token={api_key}`,
    request: `
    const url = '${base_url2}projects/get_project/?project_id={id_of_project}&api_token={api_key}';
    
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `{
      "status": "success",
      "data": {
          "id": 1,
          "title": "Rigan API",
          "category": {
              "id": 3,
              "title": "API"
          },
          "database": {
              "id": 3,
              "title": "MongoDB"
          },
          "frameworks": [
              {
                  "id": 1,
                  "title": "Django"
              },
              {
                  "id": 2,
                  "title": "Restful API"
              },
              {
                  "id": 8,
                  "title": "Vanilla JS"
              }
          ],
          "description": "<p>An API Hub</p>",
          "image": null,
          "short_description": "A Platform that provides various API integrations",
          "live_url": "https://riganapi.pythonanywhere.com/",
          "github_url": "https://github.com/riganapi",
          "views": 2,
          "created": "2023-12-18T07:12:47Z"
      },
      "message": "project details retrieved"
  }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Invalid project ID or API Token"
        }`,
  },
  {
    title: "Get Project Comments",
    value: "get_project_comments",
    method: "GET",
    url: `${base_url2}comments/get_comments/?project_id={id_of_project}&api_token={api_key}`,
    request: `
    const url = '${base_url2}comments/get_comments/?project_id={id_of_project}&api_token={api_key}';
    
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    {
      "status": "success",
      "project": {
          "id": 1,
          "title": "Rigan API",
          "category": {
              "id": 3,
              "title": "API"
          },
          "database": {
              "id": 3,
              "title": "MongoDB"
          },
          "frameworks": [
              {
                  "id": 1,
                  "title": "Django"
              },
              {
                  "id": 2,
                  "title": "Restful API"
              },
              {
                  "id": 8,
                  "title": "Vanilla JS"
              }
          ],
          "description": "<p>An API Hub</p>",
          "image": null,
          "short_description": "A Platform that provides various API integrations",
          "live_url": "https://riganapi.pythonanywhere.com/",
          "github_url": "https://github.com/riganapi",
          "views": 4,
          "created": "2023-12-18T07:12:47Z"
      },
      "data": [
          {
              "id": 2,
              "name": "Jane Doe",
              "email": "johndoe@gmail.com",
              "comment": "dsfdgfgfg g dgdfhfdfhdfhdh",
              "reply": "We dont understand",
              "star": 4,
              "active": true,
              "date": "2023-12-21T20:12:18Z"
          },
          {
              "id": 1,
              "name": "Peter Parker",
              "email": "peterparker@gmail.com",
              "comment": "This is an awesome project, i've used the server functionalities for my portfolio site. kudos",
              "reply": "Thank you",
              "star": 5,
              "active": true,
              "date": "2023-12-18T07:14:52Z"
          }
      ],
      "message": "comment list retrieved",
      "page_number": 1,
      "list_per_page": 10,
      "total_pages": 1,
      "total_items": 2,
      "search_query": ""
  }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Invalid project ID or API Token"
        }`,
  },
  {
    title: "Add Comment",
    value: "add_comment",
    method: "POST",
    url: `${base_url2}comments/add_comment/`,
    request: `
    const url = '${base_url2}comments/add_comment/';
    const formData = new FormData();
    formData.append('api_token', your-api-key)
    formData.append('project_id', id-of-project-to-be-commented) // integer
    formData.append('name', 'John')
    formData.append('email', 'john@gmail.com')
    formData.append('comment', 'user-comment')
    formData.append('star', 4) // integer value for project rating (default is 5)
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    {
      "status": "success",
      "message": "comment added sucessfully",
      "data": {
        "id": 7,
        "name": "John",
        "email": "john@gmail.com",
        "comment": "user-comment",
        "reply": "",
        "star": 4,
        "active": true,
        "date": "2023-12-21T20:12:18Z"
      }
    }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Invalid project ID or API Token"
        }`,
  },
  /* =========================== Messages ========================= */
  {
    title: "Send Message",
    value: "send_message",
    method: "POST",
    url: `${base_url2}messages/add_message/`,
    request: `
    const url = '${base_url2}messages/add_message/';
    const formData = new FormData();
    formData.append('api_token', your-api-key)
    formData.append('name', 'John')
    formData.append('email', 'john@gmail.com')
    formData.append('message', 'user-message')
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    {
      "status": "success",
      "message": "message sent sucessfully"
    }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "error sending message"
        }`,
  },
  // template
  {
    title: "Admin Resume URL",
    value: "",
    method: "",
    url: `https://riganapi.pythonanywhere.com/resume/{admin_username}/`,
    request: ``,
    success_response: ``,
    error_response: ``,
  },
]



function loadApi() {
  var x = admin
  $('.api-main').empty();
  for (var i in x) {
      var temp = `
      <section id="${x[i].value}" class="w-card w-padding">
          <h3 class="w-bold-xx mt-3">${x[i].title}</h3>
          <div class="table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <td>Method</td>
                  <td>${x[i].method}</td>
                </tr>
                <tr>
                  <td>URL</td>
                  <td>${x[i].url}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <section>
              <div class="code-header">
                  <div>Request</div>
                  <select class="lang-sel">
                      <option selected value="axios">Fetch</option>
                  </select>
              </div>
<pre aria-hidden="true">
<code class="language-javascript highlighting-content axios">
${x[i].request}
</code>
</pre>
</section>

<section>
<div class="code-header">
  <div>Response</div>
  <select class="res-sel">
    <option selected value="success">success</option>
    <option value="error">error</option>
  </select>
</div>            
<pre aria-hidden="true">
<code class="language-javascript highlighting-content success">
${x[i].success_response}
</code>
<code class="language-javascript highlighting-content error">
${x[i].error_response}
</code>
</pre>
</section>

</section>
      `;
      $('.api-main').append(temp);
  }
  $('.res-sel').on('change', function() {
    $(this).parent('.code-header').siblings('pre').children('code').hide();
    var val = $(this).val();
    val = '.' + val;
    //alert(val)
    $(this).parent('.code-header').siblings('pre').children(val).show();
})
$('.lang-sel').on('change', function() {
  $(this).parent('.code-header').siblings('pre').children('code').hide();
  var val = $(this).val();
  val = '.' + val;
  //alert(val)
  $(this).parent('.code-header').siblings('pre').children(val).show();
})
}

loadApi();