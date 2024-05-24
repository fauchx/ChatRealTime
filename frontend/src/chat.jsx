/* eslint-disable react/prop-types */
import  { useEffect, useState  } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


export const Chat = ({socket, username, room}) => {
    const [currentMessage, setCurrenMessage] = useState("")
    const [messageReceived, setMessageReceived] = useState([])
    
   
    const sendMessage = async() =>{
        if(username && currentMessage){
            const info = {
                message: currentMessage,
                room,
                author:username,
                time: new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message", info)
            setMessageReceived((list)=>[...list,info])
        }
        
    }
    useEffect(()=>{
        
        const messageHandle = (data) => {
            setMessageReceived((list)=>[...list,data])
        }
        socket.on("receive_message", messageHandle)
        return () => socket.off("receive_message", messageHandle)
    }, [socket])
    return (
    <div className='container text-center justify-content-center mt-4'>
        <section className='chat-header mb-4'>
            <h2>
                Chat en vivo, sala {room}
            </h2>
        </section>
        <section className=''>
            <div className='align-items-center col-6 container py-2 pt-2 my-2
                       justify-content-center flex-column rounded-3 bg-body-secondary overflow-auto ' 
                       style={{  height:'300px', width: '600px'}}
                        >
                    {messageReceived.map((item, i)=>{
                       if(username==item.author){
                        return <p key={i} className="badge text-success d-flex row w-75 justify-content-end items-center"
                               >{item.message}
                               </p>
                               
                       }
                       else {
                        return  <p key={i} className="badge text-primary d-flex row w-50 justify-content-center items-center"
                               >{item.message}</p>
                       }
                    } )}
            </div>
        </section>
        
        <div className='row justify-content-center mt-4'>
            <div className='d-flex aling-items-center col-4 gap-3'>
                <input type='text' className="form-control form-control-sm" placeholder='Mensaje'
                    onChange={e=>setCurrenMessage(e.target.value)}
                />
                <button type='submit' className='btn btn-primary ' onClick={sendMessage}>
                    Envio
                </button>
            </div>
        </div>
    </div>
  )
}
export default Chat