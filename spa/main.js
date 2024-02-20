
let item = document.querySelector('.spa')
let userList = []
let comments = []
async function home() {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts");
        let data = await response.json();
        console.log(data);
        let glav = item.innerHTML = ``;
        data.forEach(post => {
            item.innerHTML += `
                <div class="cart">
                    <h3>Пост: </h3>
                    <p>${post.title}</p>
                    <a href="#" onclick="info_post(${post.id}); return false;">Подробнее</a>
                    <hr>
                </div>
            `;
        });
}

async function info_post(pk) {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${pk}`);
        let post = await response.json();
        console.log(post);
        let glav = item.innerHTML = ``;
        item.innerHTML += `
            <div class="cart_ll">
                <h3>Пост: </h3>
                <p>${post.title}</p>
                <h3>Описание: </h3>
                <p>${post.body}</p>
                <h3>Комментарии</h3>
                <a onclick="comment_html()">Создать комент</a>
                <div id="commentsSection"></div>
            </div>
        `;
        let commentsSection = document.querySelector("#commentsSection");
        let response2 = await fetch(`https://jsonplaceholder.typicode.com/comments`);
        let comment = await response2.json();
        console.log(comment);
        for (let comm of comment){
            if (comm.postId == pk){
                commentsSection.innerHTML +=`
                <p>Коммент: ${comm.body}</p>
                `
            }
        }


}


function register_html() {
    item.innerHTML = `
        <div class="margin">
            <a class="button72">Регистрация</a><br>
            <input type="text" name="username" id="username" placeholder="Имя пользователя"><br>
            <input type="password" name="password" id="password" placeholder="Пароль"><br>
            <button class="button7" onclick="register()">Регистрация</button>
        </div>
    `;
}

function register() {
    let usernameInput = document.querySelector("#username");
    let passwordInput = document.querySelector("#password");
    let username = usernameInput.value;
    let password = passwordInput.value;
    let newUser = { username: username, password: password };
    userList.push(newUser);
    console.log("Пользователь зарегистрирован:", newUser);
}


async function users() {
    let item = document.querySelector('.spa')
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await response.json();
    
    item.innerHTML = `<h1>Все пользователи</h1>`;

    data.forEach(user => {
        item.innerHTML += `
            <p>${user.username}</p><br>
        `;
    });
}


function post_html(){
    item.innerHTML = `
        <div class="margin">
            <a class="button72">Создание поста</a><br>
            <input class="title" type="text" name="title" id="title" placeholder="Название"><br>
            <input class="body" type="text" name="dis" id="dis" placeholder="Описание"><br>
            <button class="button7" onclick="createPost()">Создать пост</button>
        </div>
    `;
}
async function createPost() {
    let title = document.querySelector(".title")
    let body = document.querySelector(".body")

    let title_inp = title.value
    let body_inp = body.value
    let newPost = {
        title: title_inp,
        body: body_inp,
    };

    let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    });

    let data = await response.json();
    console.log("Новый пост создан:", data);
}

function comment_html(){
    item.innerHTML = `
        <div class="margin">
            <a class="button72">Создание комента</a><br>
            <input class="body" type="text" name="dis" id="dis" placeholder="Описание"><br>
            <button class="button7" onclick="comment()">Создать комент</button>
        </div>
    `;
}

function comment(){
    let body = document.querySelector(".body")
    let body_val = body.value
    comments += {
        "opis": body_val,
    }
    console.log(comments)
}