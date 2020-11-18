const fs = require("fs");

exports.index = (req, res) => {
    res.render("index", {
        "title": "Index"
    });
};

exports.createTask = (req, res) => {
    let task = {
        "taskName": req.body.name,
        "taskDesc": req.body.desc
    };

    let jsonData = JSON.parse(readFile());
    if (jsonData != null) {
        console.log(task);
        jsonData.push(task);
        writeFile(JSON.stringify(jsonData));
    } else {
        writeFile(JSON.stringify(task));
    }

    res.redirect('/');
};

const readFile = () => {
    var jsonData;
    if (fs.existsSync('tasks.json')) {
        let rawData = fs.readFileSync("tasks.json", { encoding: 'utf-8' });
        jsonData = JSON.parse(JSON.stringify(rawData));
    }
    else {
        console.log("Dosn't Exists")
        fs.writeFileSync("tasks.json", "[]");
        jsonData = null;
    }
    return jsonData;
}

const writeFile = (jsonData) => {
    fs.writeFileSync("tasks.json", jsonData);
}