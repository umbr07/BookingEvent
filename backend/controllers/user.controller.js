const userService = require('../services/user.service');

class UserController {
    createUser(req, res){
        try {
            const { name } = req.body;
            const user = userService.createUser(name);
            res.end("User register")
        } catch(e){}
    }
}


module.exports = new UserController();