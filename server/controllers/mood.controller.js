export const getJokes = async (req, res) => {
    try {
        // const apiUrl = 'https://v2.jokeapi.dev/joke/Any?type=single&amount=20';
        let jokes = []
        let num = 0
        const apiUrl = 'https://v2.jokeapi.dev/joke/Miscellaneous,Pun,Spooky,Christmas?type=single&amount=20';

        while (num < 2) {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            jokes = jokes.concat(data.jokes.map(jokeObj => jokeObj.joke))
            num++
        }

        res.status(200).json(jokes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" })
    }
}