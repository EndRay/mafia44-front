import React, {useState} from "react";
import {createRoom} from "./roomApi";

type CreateRoomFormProps = {
  updateRooms: () => void;
}

export default function CreateRoomForm({updateRooms}: CreateRoomFormProps) {
  const [createRoomName, setCreateRoomName] = useState("")

  const formCreateRoom = async () => {
    createRoom(createRoomName).then(room => {
      setCreateRoomName("");
      updateRooms();
    });
  }

  return (
    <div className="m-2 p-2 d-flex justify-content-between flex-column border border-light rounded-3"
         style={{width: 275, height: 200}}>
      <h2 className="mt-2">Create Room</h2>
      <input className="w-100" placeholder="Room Name" value={createRoomName} onChange={(e) => setCreateRoomName(e.target.value)}/>
      <div className="d-flex justify-content-end w-100">
        <button className="btn btn-primary" onClick={formCreateRoom}>Create</button>
      </div>
    </div>
  )
}