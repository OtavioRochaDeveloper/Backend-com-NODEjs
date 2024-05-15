const knex = require("../src/database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");
const { response } = require("express");

class UserAvatarController {
    async update (req, res) {
        const user_id = request.user.id;
        const avatarFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const user = await knex("users")
        .where({ id: user_id }).first().orderBy("name");

        if (!user) {
            throw new AppError("Somente usuarios autenticados podem efetuar alteracoes no avatar", 401);
        }

        if (user.avatar) {
            await diskStorage.deleteFile(user.avatar);
        }

        const filename = await diskStorage.saveFile(avatarFilename);
        user.avatar = filename;
    
        await knex("users").update(user).where ({ id: user_id }); 

        return response.json(user);
    }

}

module.exports = UserAvatarController;