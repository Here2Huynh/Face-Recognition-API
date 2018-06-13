
const handleRegister = (db, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            //insert the user registration into login table
            .into('login')
            //if returns good, continue
            .returning('email')
            //then insert the loginEmail into the users table
            .then(loginEmail => {
                return trx('users')
                    //SQL automatically checks if there is a dupe user
                    .returning('*')
                        .insert({
                            email: loginEmail[0],
                            name: name,
                            joined: new Date()
                        })
                        //returns the added user 
                        .then(user => {
                            res.json(user[0]);
                        })
            })
            //if transaction is good, then commit
            .then(trx.commit)
            //if not, then rollback the changes
            .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
}