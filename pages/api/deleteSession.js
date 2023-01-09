import executeQuery from './db';

export default async function handler(req, res) {

    const query = "DELETE FROM sessions WHERE (session_id = ?);";
    const values = [req.body.Id];
    try {
        await executeQuery(query, values);
        res.status(200).json({results: req.body});
    } catch (error){
        res.status(500).send({error: error.message});
    }
}