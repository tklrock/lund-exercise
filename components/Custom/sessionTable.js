import Link from 'next/link';
import { Button } from 'reactstrap';
import path from 'path';

export const SessionTable = ({sessions, deleteSession}) => {

 return (
     <>
         <div style={{display: 'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
             <div style={{display: 'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
                 <div style={{flexGrow: '1', flexShrink: '1'}}><h4>Total sessions: <span className="h3">{sessions?.length}</span></h4></div>
                 <div style={{flexGrow: '1', flexShrink: '1'}}><h4>Total time: <span className="h3">{parseInt((sessions?.reduce((accum,session) => accum + session.minutes, 0) / 60), 10)}:{((sessions?.reduce((accum,session) => accum + session.minutes, 0)) % 60).toString().padStart(2, '0')}</span></h4></div>
                 <div style={{flexGrow: '1', flexShrink: '1'}}><h4>Average minutes: <span className="h3">{((sessions?.reduce((accum,session) => accum + session.minutes, 0)) / sessions?.length).toFixed(1)}</span></h4></div>
             </div>
             <div style={{flexShrink: '1', overflowX: 'auto'}}>
                 <table className="table table-hover border border-dark border-2 rounded-3">
                     <thead className="h5 font-weight-bold" style={{height:'20px'}}>
                         <tr className="table-dark">
                             <th>Name</th>
                             <th>Date</th>
                             <th>Length (min)</th>
                             <th>Category</th>
                             <th>Notes</th>
                             <th>Edit</th>
                             <th>Delete</th>
                         </tr>
                     </thead>
                     <tbody>                    
                 {sessions.map((session, index) => (
                     <tr key={session.session_id} className={parseInt(index) % 2 === 0 ?("table-primary"): ("table-light")}>
                         <td className="h5">{session.name}</td>
                         <td>{new Date(session.date).toLocaleDateString('en-US', {timeZone: 'UTC'})}</td>
                         <td>{session.minutes}</td>
                         <td>{session.category}</td>
                         <td style={{wordWrap: 'break-word'}}>{session.notes}</td>
                         <td style={{fontWeight:'bold'}} className="font-weight-bold h3 text-center"><Link href={path.join(process.cwd(), `editSession/${session.session_id}`)}><Button color="warning"><i className="bi bi-pencil-square"></i></Button></Link></td>
                         <td style={{fontWeight:'bold'}} className="font-weight-bold h3 text-center"><Button color="danger" onClick={() => deleteSession(session.session_id)}><i className="bi bi-trash3-fill"></i></Button></td>
                     </tr>
                 ))}
                     </tbody>
                 </table>
             </div>
         </div>
     </>
 )
}