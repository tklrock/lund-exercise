import executeQuery from './db';

export default async function handler(req, res) {

    const query = "INSERT INTO sessions (name, date, minutes, category, notes) VALUES (?,?,?,?,?);";
    const values = [req.body.name, req.body.date, req.body.minutes, req.body.category, req.body.notes];
    try {
        await executeQuery(query, values);
        res.status(200).json({results: req.body});
    } catch (error){
        res.status(500).send({error: error.message});
    }
}