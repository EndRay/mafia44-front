import {Room, User} from "./App";
import React from "react";
import {deleteRoom, joinRoom, leaveRoom, startGame} from "./roomApi";

type RoomBlockProps = {
  room: Room;
  user: User | null;
  updateRooms: () => void;
  enterGame: (room: Room) => void;
}

export default function RoomBlock({room, user, updateRooms, enterGame}: RoomBlockProps) {

  const isUserInRoom = user != null && room.players.map(u => u.username).includes(user.username);
  const isUserCreator = user != null && room.creator.username === user.username;

  const joinRoomPressed = async () => {
    joinRoom(room.id).then(updateRooms);
  }

  const leaveRoomPressed = () => {
    leaveRoom(room.id).then(updateRooms);
  }

  const deleteRoomPressed = () => {
    deleteRoom(room.id).then(updateRooms);
  }

  const startGamePressed = () => {
    startGame(room.id).then(updateRooms);
  }

  const enterGamePressed = () => {
    enterGame(room);
  }

  return (
    <div className="m-2 p-2 d-flex justify-content-between flex-column border border-light rounded-3"
         style={{width: 275, height: 200}}>
      <h2 className="mt-2">{room.name}</h2>
      <div className="d-flex flex-column justify-content-evenly flex-grow-1 ms-4 me-4">
        <div className="d-flex justify-content-between">
          <div
            className={"d-flex small " + (room.players.length < 1 ? "text-secondary" : "")}> {room.players[0]?.username || "Empty"} </div>
          <div
            className={"d-flex small " + (room.players.length < 2 ? "text-secondary" : "")}> {room.players[1]?.username || "Empty"} </div>
        </div>
        <div className="d-flex justify-content-between">
          <div
            className={"d-flex small " + (room.players.length < 3 ? "text-secondary" : "")}> {room.players[2]?.username || "Empty"} </div>
          <div
            className={"d-flex small " + (room.players.length < 4 ? "text-secondary" : "")}> {room.players[3]?.username || "Empty"} </div>
        </div>
      </div>

      <div className="d-flex justify-content-end w-100 mt-2">
        {user !== null ?
          !room.is_game_started ?
            !isUserCreator ?
              user == null || !isUserInRoom ?
                <button className="btn btn-primary"
                        onClick={joinRoomPressed}>Join
                </button> :
                <button className="btn btn-danger"
                        onClick={leaveRoomPressed}>Leave
                </button>
              :
              <>
                <button className="btn btn-danger" onClick={deleteRoomPressed}>Delete
                </button>
                {
                  room.players.length === 4 ?
                    <button className="btn btn-success ms-2" onClick={startGamePressed}>Start Game</button> : <></>
                }
              </> :
            <button className="btn btn-success ms-2" onClick={enterGamePressed}>Enter</button> :
          <button className="btn btn-secondary" disabled>Log in to join</button>
        }
      </div>
    </div>
  )
}