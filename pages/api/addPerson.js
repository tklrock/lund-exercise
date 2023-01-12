import executeQuery from './db';

export default async function handler(req, res) {

    const query = "INSERT INTO people (first_name, goal, image_link) VALUES (?,?,?);";
    const values = [req.body.first_name, req.body.goal, req.body.image_link];
    try {
        await executeQuery(query, values);
        res.status(200).json({results: req.body});
    } catch (error){
        res.status(500).send({error: error.message});
    }
}