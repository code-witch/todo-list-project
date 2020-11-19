const fs = require("fs");

exports.index = (req, res) => {
    let tasks = JSON.parse(fs.readFileSync('./tasks.json'))

    res.render("index", {
        "title": "Index",
        "tasks": tasks.tasks
    });
};

exports.createTask = (req, res) => {
    let task = {
        "taskName": req.body.name,
        "taskDesc": req.body.desc
    };
    let tasks = readFile(task);
    res.redirect('/');
};

const readFile = (task) => {

    if (!fs.existsSync('tasks.json')) {
        fs.writeFileSync("tasks.json", "{\"tasks\":[]}");
    }
    fs.readFile("tasks.json", { encoding: 'utf-8' }, function (err, tasks) {
        if (err) throw err;
        var arrayTasks = JSON.parse(tasks);
        arrayTasks.tasks.push(task);
        console.log(arrayTasks);

        fs.writeFile("tasks.json", JSON.stringify(arrayTasks), "utf-8", function () {
            console.log("Write Done");
        });

        return arrayTasks.tasks;
    });
}
