import executeQuery from './db';

export default async function handler(req, res) {

    const query = "SELECT * FROM people;";
    const values = [];
    try {
        const goals = await executeQuery(query, values);
        res.status(200).json({results: goals});
    } catch (error){
        res.status(500).send({error: error.message});
    }
}