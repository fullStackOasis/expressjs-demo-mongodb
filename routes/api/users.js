const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const router = require('express').Router();
const DEBUG = true;

/* Expected input:
'{"user" : {"email":"tester@example.com","username":"testuser"} }'.

Example:
curl -vs --header "Content-Type: application/json" \
--request POST --data \
'{"user" : {"email":"tester@example.com","username":"testuser"} }' http://localhost:3000/api/users

Example output:
{"success":true,
"user":{"_id":"6118622c772a7f9ed9dbc1ab","email":"tester3@example.com",
"username":"testuser","__v":0}}
 */
router.post('/', async (req, res, next) => {
    console.log(req.body);
    const {
        body: { user }
    } = req;
  
    if (!user.email) {
        return res.status(422).json({
            success: false,
            errors: {
                email: 'is required'
            }
        });
    }
  
    if (!user.username) {
        return res.status(422).json({
            success: false,
            errors: {
                username: 'is required'
            }
        });
    }

    /**
     * If user email found, reject the submitted User
     */
    const matches = await Users.find({ email: user.email }, (err, res) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: 'Could not find user'
            });
        }
    });

    if (matches.length > 0) {
        return res.status(412).json({
            success: false,
            error: 'This email address has already been registered'
        });
    }

    /**
     * No such email exists in the system.
     * TODO FIXME. validate username. validate email.
     * Allow user to be created.
     */
    try {
        user.email = user.email.trim().toLowerCase();
        const modelUser = new Users({email : user.email, username : user.username});
        await modelUser.save();
        // get the user with id
        const dbUser = await Users.findById(modelUser.id);
        console.log("Going to return dbUser " + dbUser._id);
        return res.status(200).json({ success: true, user: dbUser });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
});

module.exports = router;