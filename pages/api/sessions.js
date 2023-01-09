import executeQuery from './db';

export default async function handler(req, res) {

    const query = "SELECT * FROM sessions;";
    const values = [];
    try {
        const sessions = await executeQuery(query, values);
        res.status(200).json({results: sessions});
    } catch (error){
        res.status(500).send({error: error.message});
    }
}