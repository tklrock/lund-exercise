import executeQuery from '../db';

export default async function handler(req, res) {
    
    const { session_id } = req.query
    const query = "SELECT * FROM sessions WHERE session_id = ?;";
    const values = [session_id];
    try {
        const session = await executeQuery(query, values);
        res.status(200).json({results: session});
    } catch (error){
        res.status(500).send({error: error.message});
    }

}