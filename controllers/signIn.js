
const handleSignIn = (db, bcrypt) => (req, res) => {
    // bcrypt.compare("apples", '$2a$10$V7U4SfQ94vxcxdaXGmYyROVLbOgXoyG4Ubiu11V8LVuD5Vvb3nMay',
    // function(err, res) {
    //     console.log("first guess", res);
    // });
    // bcrypt.compare("veggies", '$2a$10$V7U4SfQ94vxcxdaXGmYyROVLbOgXoyG4Ubiu11V8LVuD5Vvb3nMay', 
    // function(err, res) {
    //     console.log("second guess", res);
    // });

    // if (req.body.email === database.users[0].email 
    //     && req.body.password === database.users[0].password) {
    //         res.json(database.users[0]);
    //     }
    // else {
    //     res.status(400).json('error logging in');
    // }
    // res.json('signing');
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }
    db.select('email', 'hash').from('login')
        //select the given login creds and check it with login table
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            // console.log(isValid);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        // console.log(user);
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json('unable to get user'));
            }
            else {
                res.status(400).json('wrong credentials');
            }
        })
        .catch(err => res.status(400).json('wrong credentials'));
}

module.exports = {
    handleSignIn: handleSignIn
}