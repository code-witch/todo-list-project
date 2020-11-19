const fs = require("fs");

 const index = (req, res) => {
    if (!fs.existsSync('tasks.json')) {
        fs.writeFileSync("tasks.json", "[]");
    }
    // let tasks = JSON.parse(fs.readFileSync('./tasks.json'))

    res.render("index", {
        "title": "Index",
        "tasks": getAllData()
    });
};

const createTask = (req, res) => {
    let task = {
        "taskName": req.body.name,
        "taskDesc": req.body.desc
    };
    addTask(task);
    res.redirect('/');
};

// const readFile = (task) => {

//     if (!fs.existsSync('tasks.json')) {
//         fs.writeFileSync("tasks.json", "{\"tasks\":[]}");
//     }
//     fs.readFile("tasks.json", { encoding: 'utf-8' }, function (err, tasks) {
//         if (err) throw err;
//         var arrayTasks = JSON.parse(tasks);
//         arrayTasks.tasks.push(task);
//         // console.log(arrayTasks);

//         fs.writeFile("tasks.json", JSON.stringify(arrayTasks), "utf-8", function () {
//             console.log("Write Done");
//         });
//     });
// }




// return all data
const getAllData = () => {
    let data = JSON.parse(fs.readFileSync('./tasks.json', {encoding:'utf-8'}));
    return data;
}

// add user to the data file
const addTask = task => {
    let data = getAllData();
    data.push(task);
    writeAllData(data);
};

// override all data with new data
const writeAllData = data => {
    fs.writeFileSync('./tasks.json',JSON.stringify(data, null, 4),{encoding:'utf-8'});
}

// remove task from file
const removeTask = taskName => {
    let data = getAllData();
    for(let i = 0; i < data.length; i++) {
        // change the `taskName` to what ever we are deleting on...
        // this includes the parameter at the top and the stuff in the if statement below
        if(data[i].taskName == taskName) {
            delete data[i];
            break;
        }
    }
    writeAllData(data.filter(data=>data != null));
}


// edit task with new all new data 
const updateTask = newTask => {
    let oldTask = getTask(newTask.taskName);
    removeTask(oldTask.username);
    addTask(newTask);

}

// gets a specific task data
const getTask = taskName => {
    let data = getAllData();
    for(datum of data) {
        if(datum.taskName == taskName) {
            return datum;
        }
    }
    return undefined; 
}

module.exports = {
    index,
    createTask
}