const fs = require('fs');
const path = require("path");

const fileName = path.join("database",'users.json');

const User = {

    generateId: function(){
        let allUsers = this.getUsers();
        let lastUser = allUsers.pop();

        return lastUser ? lastUser.id + 1 : 1;  
    },

    // 1- SALVAR O USUÁRIO NA BASE DE DADOS
    create: function(userData) {
        
        // Salva os usuários do banco de dados na variavel
        let allUsers = this.getUsers();
        
        // Concatena o Id com o usuario recebido do formulario
        let newUser = {
            id: this.generateId(),
            ...userData
        };

        // adciona a ultima linha do array
        allUsers.push(newUser);

        //Salva no banco de dados em formato JSON
        fs.writeFileSync(fileName, JSON.stringify(allUsers, null," "));
        return newUser;
    },

    // 2- BUSCAR NA BASE DE DADOS TODOS OS USUÁRIOS
    getUsers: function () {

        return JSON.parse(fs.readFileSync(fileName, "utf-8"));
    },
    // 3- BUSCAR O USÁRIO PELO SEU ID
    findUsersById: function (id) {

        let allUsers = this.getUsers();
        let userFound = allUsers.find(allUsers => allUsers.id == id);
        return userFound;
    },

    // 4- BUSCAR O USUÁRIO POR QUALQUER CAMPO
    findUsersByField: function (field, value) {

        let allUsers = this.getUsers();
        let userFound = allUsers.find(allUsers => allUsers[field] == value);
        return userFound;
    }
    
}

module.exports = User;