const prisma = require("../src/config/prisma")
exports.getUserById = (id =>{
    return prisma.user.findFirst({
        where:{
            id,
        }
    })
})