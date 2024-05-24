import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import Chat from './chat'
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io.connect("http://localhost:3001")

function App() {
  const [usename, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [chat, setChat] = useState(false)

  const joinRoom = () =>{
    if(usename!== "" && room !== ""){
      socket.emit("join_room",room)
      setChat(true)
    }
  }
  return (
    <>
      {!chat ? (
        <div className='container text-center'>
          <h1 className='m-4 text-primary'>Chat</h1>
          <div className='container bg-body-secondary col-6 rounded-3 p-4'>
            <div className='row justify-content-center gap-3 my-4'>
              <div className='col-6 d-flex align-items-center text-center'>
                <label className='form-label me-2'>Usuario</label>
                <input
                  type='text'
                  className="form-control form-control-md"
                  placeholder=''
                  onChange={e => setUsername(e.target.value)} />
              </div>
            </div>
            <div className='row justify-content-center items-center gap-3'>
              <div className='col-6 d-flex align-items-center text-center'>
                <label className='form-label me-2'>Id sala</label>
                <input
                  type='text'
                  className="form-control form-control-md"
                  placeholder=''
                  onChange={e => setRoom(e.target.value)} />
              </div>
            </div>
            <button type='submit' className='btn btn-primary row my-2' onClick={joinRoom}>
              Unirme
            </button>
          </div>

        </div>
      ) : (
        <Chat socket={socket} username={usename} room={room} />
      )}
    </>
  )
}

export default App
