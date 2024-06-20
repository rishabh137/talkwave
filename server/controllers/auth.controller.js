import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { generateToken } from "../lib/utils/generateToken.js"

export const signup = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body

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
            fullname: fullname,
            username: username,
            email: email,
            password: hashPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
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
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!user || !checkPassword) {
            return res.status(400).json({ error: "Invalid username or password" })
        }

        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            followers: user.followers,
            folowing: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        })

    } catch (error) {
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