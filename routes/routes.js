const fs = require("fs");
const filename = "./public/tasks.json";
if(fs.existsSync(filename)){
    const tasks = require("../public/tasks.json");
 
    exports.index = (req, res) => {
        res.render("index", {
            "title": "Index",
            "tasks": tasks
        });
    };
}else{
    exports.index = (req, res) => {
        res.render("index", {
            "title": "Index"
        });
    }
}

exports.createTask = (req, res) => {
    let task = {
        "taskName": req.body.name,
        "taskDesc": req.body.desc
    };
    readFile(task);
    res.redirect('/');
};

const readFile = (task) => {

    if (!fs.existsSync(filename)) {
        fs.writeFileSync(filename, "{\"tasks\":[]}");
    }
    fs.readFile(filename, { encoding: 'utf-8' }, function (err, tasks) {
        if (err) throw err;
        var arrayTasks = JSON.parse(tasks);
        arrayTasks.tasks.push(task);
        console.log(arrayTasks);

        fs.writeFile(filename, JSON.stringify(arrayTasks), "utf-8", function () {
            console.log("Write Done");
        })
    });
}
