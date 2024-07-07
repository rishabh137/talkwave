import { NavLink } from "react-router-dom";
import moodEmoji from "../../utils/mood/moodEmoji";

const UserMood = () => {

    return (
        <div className="container p-4">
            <h1 className="font-bold mb-4">How are you feeling today?</h1>
            <div className="flex space-x-4 justify-between items-center border border-gray-700 px-2 text-center">
                {
                    moodEmoji.map((data) => (
                        <NavLink key={data.id} to={`/mood/${data.link}`}
                            className="text-2xl border-r border-gray-700 p-2"
                        >
                            {data.emoji}
                        </NavLink>
                    ))
                }
                <NavLink to="/mood/love"
                    className="text-2xl text-center"
                >
                    ❤️
                </NavLink>
            </div>
        </div>
    )
}

export default UserMood