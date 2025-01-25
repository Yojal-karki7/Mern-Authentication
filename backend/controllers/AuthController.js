const UserModel = require("../models/userModel");
const { oauth2client } = require("../utils/googleConfig");
const axios = require('axios');
const jwt = require('jsonwebtoken');

const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;

        // Step 1: Exchange the authorization code for tokens
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);

        // Step 2: Fetch user info from Google
        const userRes = await axios.get(
            'https://openidconnect.googleapis.com/v1/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${googleRes.tokens.access_token}`,
                },
            }
        );
        console.log(userRes);
        

        // Step 3: Extract user info (email, name, picture)
        const { email, name, picture } = userRes.data;
        

        // Step 4: Check if the user exists in the database
        let user = await UserModel.findOne({ email });
        if (!user) {
            // If the user does not exist, create a new one
            user = await UserModel.create({
                name,
                email,
                image: picture,
            });
        }

        // Step 5: Generate a JWT token for the user
        const { _id } = user;
        const token = jwt.sign(
            { _id, email },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_TIMEOUT,
            }
        );

        // Step 6: Return a response with the token and user info
        return res.status(200).json({ message: 'Success', token, user });
    } catch (error) {
        console.error('Error during Google login:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    googleLogin,
};
