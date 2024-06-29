import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { generateToken } from "../lib/utils/generateToken.js"

export const signup = async (req, res) => {
    try {
        const { email, username, fullname, password } = req.body

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email" })
        }

        const existUser = await User.findOne({ username })
        if (existUser) {
            return res.status(400).json({ error: "Username already exists" })
        }

        const existEmail = await User.findOne({ email })
        if (existEmail) {
            return res.status(400).json({ error: "Email already exists" })
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email: email,
            username: username,
            fullname: fullname,
            password: hashPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                fullname: newUser.fullname,
                followers: newUser.followers,
                folowing: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })
        } else {
            res.status(400).json({ error: "Invalid credentials" })
        }

    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
}

export const login = async (req, res) => {
    try {
        const { username } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" })
        }
        const { password } = req.body
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(400).json({ error: "Invalid username or password" })
        }

        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username,
            fullname: user.fullname,
            followers: user.followers,
            folowing: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
}

// User authenticated or not
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
}