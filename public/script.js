const fr = new FileReader();
let json_data = JSON.stringify(tasks);
const blob = new Blob([json_data], {type: "application/json"});

let task_list = document.getElementById('task_holder');

fr.onload = (evt) => {
    console.log(JSON.parse(fr.result));
}   

fr.readAsText(blob);