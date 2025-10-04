const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserService {
    async createUser(name) {
        const user = await prisma.user.create({data: {
            name
        }})
        return user;
    }
}

module.exports = new UserService();