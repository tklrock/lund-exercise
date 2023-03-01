import Link from 'next/link';
import { Button } from 'reactstrap';
import path from 'path';

export const SessionTable = ({sessions, deleteSession}) => {

    return (
        <>
            <div style={{display: 'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
                <div style={{flex: '1'}}><h4>Total sessions: <span className="h3">{sessions?.length}</span></h4></div>
                <div style={{flex: '1'}}><h4>Total time: <span className="h3">{parseInt((sessions?.reduce((accum,session) => accum + session.minutes, 0) / 60), 10)}:{((sessions?.reduce((accum,session) => accum + session.minutes, 0)) % 60).toString().padStart(2, '0')}</span></h4></div>
                <div style={{flex: '1'}}><h4>Average minutes: <span className="h3">{((sessions?.reduce((accum,session) => accum + session.minutes, 0)) / sessions?.length).toFixed(1)}</span></h4></div>
            </div>
            <table className="w-100 table table-hover border border-dark border-2 rounded-5" style={{flex: '3'}}>
                <thead className="h5 font-weight-bold" style={{height:'20px'}}>
                    <tr className="table-dark">
                        <th style={{width:'10%', margin:'1%'}}>Name</th>
                        <th style={{width:'10%', margin:'1%'}}>Date</th>
                        <th style={{width:'10%', margin:'1%'}}>Length (min)</th>
                        <th style={{width:'10%', margin:'1%'}}>Category</th>
                        <th style={{width:'20%', margin:'1%'}}>Notes</th>
                        <th style={{width:'5%', margin:'1%'}}>Edit</th>
                        <th style={{width:'5%', margin:'1%'}}>Delete</th>
                    </tr>
                </thead>
                <tbody>                    
            {sessions.map((session, index) => (
                <tr key={session.session_id} className={parseInt(index) % 2 === 0 ?("table-primary"): ("table-light")}>
                    <td style={{width:'10%', margin:'1%'}} className="h5">{session.name}</td>
                    <td style={{width:'10%', margin:'1%'}}>{new Date(session.date).toLocaleDateString('en-US', {timeZone: 'UTC'})}</td>
                    <td style={{width:'10%', margin:'1%'}}>{session.minutes}</td>
                    <td style={{width:'15%', margin:'1%'}}>{session.category}</td>
                    <td style={{width:'20%', margin:'1%'}}>{session.notes}</td>
                    <td style={{width:'5%', margin:'1%', fontWeight:'bold'}} className="font-weight-bold h3 text-center"><Link href={path.join(process.cwd(), `editSession/${session.session_id}`)}><Button color="warning"><i className="bi bi-pencil-square"></i></Button></Link></td>
                    <td style={{width:'5%', margin:'1%', fontWeight:'bold'}} className="font-weight-bold h3 text-center"><Button color="danger" onClick={() => deleteSession(session.session_id)}><i className="bi bi-trash3-fill"></i></Button></td>
                </tr>
            ))}
                </tbody>
            </table>
        </>
    )
}