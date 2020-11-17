const fs = require('fs');

const index = (req,res) => {
    res.render('index')
}

// return all data
const getAllData = () => {
    let data = JSON.parse(fs.readFileSync('./data.json', {encoding:'utf-8'}));
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
    fs.writeFileSync('./data.json',JSON.stringify(data, null, 4),{encoding:'utf-8'});
}


module.exports = {
    index,
}