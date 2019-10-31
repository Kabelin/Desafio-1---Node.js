const express = require("express");

const server = express();

var counter = 0;

server.use(express.json());

const projects = [{
    id: '1',
    title: 'Novo projeto',
    tasks: []
}];

server.use((req, res, next) =>{
    counter++;
    console.log('Método: ' + req.method + '; URL: ' + req.url + '; Counter: ' + counter.toString());
    
    return next();
})

function checkProjectInArray(req, res, next){
    const project = projects[req.params.id];

    if(!project){
        return res.status(400).json({ error: 'Project is required'})
    }

    return next();
}

server.get('/projects', (req, res) =>{
    return res.json(projects);
});

server.post('/projects', (req, res) =>{
    const { id } = req.body;
    const { title } = req.body;

    projects.push({ id: id, title: title, tasks: []});

    return res.json(projects);
});

server.put('/projects/:id', checkProjectInArray, (req, res) =>{
    const { id } = req.params;
    const { title } = req.body;

    projects[id].title = title;

    return res.json(projects);
});

server.delete('/projects/:id', checkProjectInArray, (req, res) =>{
    const { id } = req.params;

    projects.splice(id, 1);

    return res.send();
});

server.post('/projects/:id/tasks', checkProjectInArray, (req, res) =>{
    const { id } = req.params;
    const { task } = req.body;

    projects[id].tasks.push(task);

    return res.json(projects);
});

server.listen(3000);