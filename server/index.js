const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let counter = 1;
let users = [];

app.get('/users', (req, res) => {
    res.json(users);
});

app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    let userUpdate = req.body;

    let selectedIndex = users.findIndex(user => user.id == id);

    if(userUpdate.name){
        users[selectedIndex].name = userUpdate.name;
    }

    res.json({
        message: 'update user complete!',
        data:{
            user: userUpdate,
            indexUpdate: selectedIndex
        }
    });
})


app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter;
    counter += 1;
    users.push(user);
    res.json({
        message: 'ok',
        user: user
    })
});

app.delete('/users/:id', (req, res) => {
    let id = req.params.id;

    let selectedIndex = users.findIndex(user => user.id == id);

    users.splice(selectedIndex, 1);

    res.json({
        message: 'delete cpmpete!',
        IndexDelete: selectedIndex
    })

})



app.listen(8000, (req, res) => {
    console.log('Http Server run at port 8000');
});