import Shayari from "../models/shayari.model.js";

export const getJokes = async (req, res) => {
    try {
        let jokes = []
        let num = 0

        while (num < 2) {
            const response = await fetch("https://v2.jokeapi.dev/joke/Miscellaneous,Pun,Spooky,Christmas?type=single&amount=10");

            if (!response) {
                return res.status(400).json({ error: "Something went wrong" })
            }

            const data = await response.json();
            jokes = jokes.concat(data.jokes.map(jokeObj => jokeObj.joke))
            num++
        }

        res.status(200).json(jokes);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" })
    }
}

export const getHappyContent = async (req, res) => {
    try {
        let content = []
        const seenAffirmations = new Set()
        const batchPromises = []

        // Fetch affirmations in batches
        while (content.length < 20) {
            batchPromises.push(fetch("https://www.affirmations.dev/")
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch affirmation')
                    }
                    return response.json();
                })
                .then(data => {
                    if (!seenAffirmations.has(data.affirmation)) {
                        seenAffirmations.add(data.affirmation)
                        content.push(data.affirmation)
                    }
                })
                .catch(error => {
                    console.error('Error fetching affirmation:', error)
                }));

            if (batchPromises.length === 5) {
                await Promise.all(batchPromises)
                batchPromises.length = 0
            }
        }

        if (batchPromises.length > 0) {
            await Promise.all(batchPromises)
        }

        res.status(200).json(content)

    } catch (error) {
        res.status(500).json({ error: "Something went wrong" })
    }
}

export const getAngryContent = async (req, res) => {
    try {
        let content = []

        const response = await fetch("https://zenquotes.io/api/quotes")
        if (!response) {
            return res.status(400).json({ error: "Something went wrong" })
        }

        const data = await response.json()
        content = content.concat(data.map(adviceObj => adviceObj.q))

        res.status(200).json(content)

    } catch (error) {
        res.status(500).json({ error: "Something went wrong" })
    }
}

export const getLoveContent = async (req, res) => {
    try {
        let content = []
        const count = await Shayari.countDocuments()

        if (count < 15) {
            return res.status(400).json({ message: 'Not enough documents to fetch 15 random shayari' });
        }

        const numShayari = Math.floor(Math.random() * (15 - 10 + 1)) + 10       // shayari should range between 10 and 15

        const randomIndices = []
        while (randomIndices.length < numShayari) {
            const randomIndex = Math.floor(Math.random() * count)
            if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex)
            }
        }

        const randomShayari = await Shayari.find({}).skip(randomIndices[0]).limit(numShayari)


        content = content.concat(randomShayari.map(shayariObj => shayariObj.data))
        res.status(200).json(content)

    } catch (error) {
        res.status(500).json({ error: "Something went wrong" })
    }
}