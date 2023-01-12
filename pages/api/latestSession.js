import executeQuery from './db';

export default async function handler(req, res) {

    const query = "SELECT MAX(date) AS latest_session FROM sessions WHERE name=?;";
    const values = [req.body.name];
    try {
        const latest_session = await executeQuery(query, values);
        res.status(200).json({results: latest_session});
    } catch (error){
        res.status(500).send({error: error.message});
    }
}