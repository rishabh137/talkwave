export const POSTS = [
    {
        _id: "1",
        text: "I am cooking this. How is it looking guys. Come and tase it. It looks tasty.",
        img: "/posts/maggie.jpg",
        user: {
            username: "rishabh",
            profileImg: "/avatars/boy1.png",
            fullName: "Rishabh Raj",
        },
        comments: [
            {
                _id: "1",
                text: "Looking tasty",
                user: {
                    username: "harsh",
                    profileImg: "/avatars/boy1.png",
                    fullName: "Harsh Raj",
                },
            },
        ],
        likes: ["6658s891", "6658s892", "6658s893", "6658s894"],
    },
    {
        _id: "2",
        text: "How you guys doing?",
        user: {
            username: "sidd",
            profileImg: "/avatars/boy2.png",
            fullName: "Siddhant Kumar",
        },
        comments: [
            {
                _id: "1",
                text: "Looking tasty",
                user: {
                    username: "shubham",
                    profileImg: "/avatars/boy2.png",
                    fullName: "Shubham Raj",
                },
            },
        ],
        likes: ["6658s891", "6658s892", "6658s893", "6658s894"],
    },
    {
        _id: "3",
        text: "I am cooking this. How is it looking guys. Come and tase it. It looks tasty.",
        img: "/posts/pizza.jpg",
        user: {
            username: "vaibhav",
            profileImg: "/avatars/boy3.png",
            fullName: "Vaibhav Raj",
        },
        comments: [],
        likes: ["6658s891", "6658s892", "6658s893", "6658s894", "6658s895", "6658s896"],
    },
    {
        _id: "4",
        text: "I am cooking this. How is it looking guys. Come and tase it. It looks tasty.",
        img: "/posts/rasgulla.jpg",
        user: {
            username: "rishabh",
            profileImg: "/avatars/boy3.png",
            fullName: "Rishabh Raj",
        },
        comments: [
            {
                _id: "1",
                text: "Nice",
                user: {
                    username: "vaibhav",
                    profileImg: "/avatars/boy2.png",
                    fullName: "Vaibhav Raj",
                },
            },
        ],
        likes: ["6658s891", "6658s892", "6658s893", "6658s894", "6658s895", "6658s896", "6658s897", "6658s898", "6658s899",],
    },
];

export const USERS_FOR_RIGHT_PANEL = [
    {
        _id: "1",
        fullName: "Shubham Raj",
        username: "shubham",
        profileImg: "/avatars/boy2.png",
    },
    {
        _id: "2",
        fullName: "Vaibhav Raj",
        username: "vaibhav",
        profileImg: "/avatars/boy2.png",
    },
    {
        _id: "3",
        fullName: "Siddhant Kumar",
        username: "sidd",
        profileImg: "/avatars/boy3.png",
    },
    {
        _id: "4",
        fullName: "Harsh Raj",
        username: "harsh",
        profileImg: "/avatars/boy3.png",
    },
];