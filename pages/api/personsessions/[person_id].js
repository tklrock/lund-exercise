import executeQuery from '../db';

export default async function handler(req, res) {

    const {person_id} = req.query;

    const query = "SELECT * FROM sessions WHERE name=?;";
    const values = [person_id];
    try {
        const sessions = await executeQuery(query, values);
        res.status(200).json({results: sessions});
    } catch (error){
        res.status(500).send({error: error.message});
    }
}