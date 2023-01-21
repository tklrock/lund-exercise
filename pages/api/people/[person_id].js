import executeQuery from '../db';

export default async function handler(req, res) {
    const {person_id} = req.query
    const query = "SELECT * FROM people WHERE person_id = ?;";
    const values = [person_id];
    try {
        const person = await executeQuery(query, values);
        res.status(200).json({results: person});
    } catch (error){
        res.status(500).send({error: error.message});
    }

}