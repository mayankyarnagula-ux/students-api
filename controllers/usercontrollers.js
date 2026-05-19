const User = require("../model/User");
const bcrypt = require("bcrypt");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.send("user already exists");
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hash
        });

        await user.save();

        res.send("user registered");

    } catch (err) {
        res.send(err.message);
    }
};

