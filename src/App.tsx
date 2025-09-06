import React, {useEffect, useState} from 'react';
import './App.css';
import LoginForm from "./LoginForm";
import CreateRoomForm from "./CreateRoomForm";
import {fetchRooms} from "./roomApi";
import RoomBlock from "./RoomBlock";
import Game from "./Game";

export type User = {
  id: string;
  username: string;
}

export type Room = {
  id: string;
  name: string;
  is_game_started: boolean;
  creator: User;
  players: User[];
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)

  const updateRooms = () => {
    fetchRooms().then(setRooms);
  }

  const enterGame = (room: Room) => {
    setCurrentRoom(room);
  }

  const returnToLobby = () => {
    setCurrentRoom(null);
    updateRooms();
  }

  useEffect(() => {
    updateRooms();
    const interval = setInterval(() => {
      updateRooms();
    }, 2000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="App">
      <div className="App-header">
        {currentRoom ?
          <Game user={user!} room={currentRoom} returnToLobby={returnToLobby}/>
          :
          <div style={{
            display: "grid",
            width: "100vw",
            height: "100vh",
            gridTemplateColumns: "1fr auto",
            gridTemplateRows: "auto 1fr",
            gap: 16,
          }}>
            <h1 className="align-content-center">Rooms</h1>
            <LoginForm user={user} setUser={setUser}/>
            <div className="d-flex justify-content-start flex-wrap">
              <CreateRoomForm updateRooms={updateRooms}/>
              {rooms
                .filter(room => room.players.length !== 4 ||
                  (user != null && room.players.map(u => u.username).includes(user.username)))
                .map(room => (
                  <RoomBlock room={room} user={user} updateRooms={updateRooms} enterGame={enterGame} key={room.id}/>
                ))}
            </div>
            <div></div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
