import db from '../models/index.js'

async function emailExists(email) {
    const user = await db.users.findOne({ where: { email } });
    return !!user;
}

export { emailExists }