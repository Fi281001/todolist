let btnadd = document.querySelector('button');
let input = document.querySelector('#content');


let todos = gettodos()
renderTodo(todos);

btnadd.addEventListener('click', function(){
    if(!input.value){
        alert("vui lòng nhập lại");
        return false;
    }
    
    let todoid = this.getAttribute('id')

    let todos = gettodos()
    let todo = {name: input.value}

    if(todoid == 0 || todoid){
        todos[todoid] = todo
        this.removeAttribute('id')
    }else {
        todos.push(todo)
    }
  
    //console.log(todo)
    input.value= ''

    //lưu vào storage 
    localStorage.setItem('todos', JSON.stringify(todos))
    
    //hiển thị todo
    renderTodo(todos);
})

function renderTodo(todos = []){
    let content ='<ul>';

    todos.forEach((todo,index)=>{
        content +=    `<li>
                <div class="todo-name">${todo.name}</div>
                <a class="delete" href="#" onclick="deletetodo(${index})">delete</a>
                <a  href="#" onclick="edittodo(${index})">update</a>
            </li>`    
    })
    
    content +='</ul>';
    document.querySelector('#result').innerHTML = content;
}

function gettodos(){
    return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
}
function edittodo(id){
    let todos = gettodos();
    if(todos.length > 0){
        input.value = todos[id].name
        btnadd.setAttribute('id',id)
    }
}
function deletetodo(id){
    if(confirm('Bạn có muốn xóa ko?')){
        // dọc lại các todo
     //  let todos= gettodos();
       // xóa todo theo id
       todos.splice(id,1);
       // ghi lại todo
       localStorage.setItem('todos', JSON.stringify(todos))
       // hiển thị lại todo
       renderTodo(gettodos())
    }
}