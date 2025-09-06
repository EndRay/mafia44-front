import {Room, User} from "./App";
import "./Game.css";
import GameTable from "./GameTable";
import {useCallback, useEffect, useState} from "react";
import {fetchGameStage, fetchHistory, submitAction} from "./gameApi";

type GameProps = {
  user: User;
  room: Room;
  returnToLobby: () => void;
}

export const PLAYERS = 4;
export const CARDS_IN_DISCARD = 3;
export const CARDS_PER_PLAYER = 2;

export enum GameCharacter {
  Copy = "copy",
  Thief = "thief",
  Brothers = "brothers",
  Seer = "seer",
  Brawler = "brawler",
  Drunkard = "drunkard",
  Witch = "witch",
  Milkman = "milkman",
  Mafia = "mafia",
  Suicide = "suicide",
}

export enum GameStage {
  Beginning,
  Copy,
  Thief,
  ThiefCopy,
  Brothers,
  Seer,
  SeerCopy,
  Brawler,
  BrawlerCopy,
  Drunkard,
  DrunkardCopy,
  Witch,
  WitchCopy,
  Milkman,
  MilkmanCopy,
  Shooting,
  Finished
}

type GameState = {
  swap?: [number, number];
  cards_to_show?: (GameCharacter | null)[];
  players_to_show?: number[];
}

export default function Game({user, room, returnToLobby}: GameProps) {
  const [stage, setStage] = useState(GameStage.Beginning)
  const [history, setHistory] = useState<GameState[]>([])
  const [stageToShow, setStageToShow] = useState<number | null>(null)
  const [selectedCards, setSelectedCards] = useState<number[]>([])

  const checkReadyForSubmit = (selection: number[]) => {
    if ([GameStage.Copy, GameStage.Thief, GameStage.ThiefCopy, GameStage.Drunkard, GameStage.DrunkardCopy].includes(stage)) {
      return selection.length === 1;
    }
    if ([GameStage.Brawler, GameStage.BrawlerCopy, GameStage.Witch, GameStage.WitchCopy].includes(stage)) {
      return selection.length === 2;
    }
    if ([GameStage.Seer, GameStage.SeerCopy].includes(stage)) {
      if (selection.length === 1 && selection[0] < PLAYERS * CARDS_PER_PLAYER) {
        return true;
      }
      if (selection.length === 2 && selection.every(s => s >= PLAYERS * CARDS_PER_PLAYER)) {
        return true;
      }
    }
  }

  let showableStages = []
  if(stage === GameStage.Finished && history[GameStage.Finished] !== undefined){
    const roles = history[0].cards_to_show!;
    console.log(history)
    let copied_role = null
    for(const card of history[1].cards_to_show!){
      if (card !== null) {
        if (copied_role === null)
          copied_role = card;
        else{
          copied_role = null;
          break;
        }
      }
    }
    showableStages.push(GameStage.Beginning);
    for(let role of roles.slice(0, PLAYERS * CARDS_PER_PLAYER)){
      if(role === GameCharacter.Copy) showableStages.push(GameStage.Copy);
      if(role === GameCharacter.Thief) showableStages.push(GameStage.Thief);
      if(role === GameCharacter.Brothers) showableStages.push(GameStage.Brothers);
      if(role === GameCharacter.Seer) showableStages.push(GameStage.Seer);
      if(role === GameCharacter.Brawler) showableStages.push(GameStage.Brawler);
      if(role === GameCharacter.Drunkard) showableStages.push(GameStage.Drunkard);
      if(role === GameCharacter.Witch) showableStages.push(GameStage.Witch);
      if(role === GameCharacter.Milkman) showableStages.push(GameStage.Milkman);
    }
    if(copied_role === GameCharacter.Thief) showableStages.push(GameStage.ThiefCopy);
    if(copied_role === GameCharacter.Seer) showableStages.push(GameStage.SeerCopy);
    if(copied_role === GameCharacter.Brawler) showableStages.push(GameStage.BrawlerCopy);
    if(copied_role === GameCharacter.Drunkard) showableStages.push(GameStage.DrunkardCopy);
    if(copied_role === GameCharacter.Witch) showableStages.push(GameStage.WitchCopy);
    if(copied_role === GameCharacter.Milkman) showableStages.push(GameStage.MilkmanCopy);
  }
  else {
    for (let s in history) {
      const stage_id = parseInt(s)
      if (stage_id >= stage)
        continue;
      if (history[s] !== undefined)
        showableStages.push(stage_id)
    }
  }

  let smartStageToShow = stageToShow
    if (stageToShow === null && history[stage] !== undefined && history[stage] !== null)
      smartStageToShow = stage;

  console.log("HISTORY", history)

  const selectionRequired = history[stage] === null;
  let selectableCards: number[] = []
  if (selectionRequired) {
    // TODO: determine selectable cards based on game stage
    selectableCards = Array(PLAYERS * CARDS_PER_PLAYER + CARDS_IN_DISCARD).fill(0).map((_, i) => i)
  }

  const trySelectCard = (cardId: number) => {
    const newSelectedCards = selectedCards.slice()
    if (selectedCards.includes(cardId)) {
      newSelectedCards.splice(newSelectedCards.indexOf(cardId), 1)
    } else {
      if (!selectableCards.includes(cardId))
        return
      newSelectedCards.push(cardId)
    }
    setSelectedCards(newSelectedCards)
    if (checkReadyForSubmit(newSelectedCards)) {
      submitAction(room.id, newSelectedCards).then(() => {
        setSelectedCards([])
        updateGameState()
      }).catch(() => {
        setSelectedCards([])
      })
    }
  }

  const updateGameState = useCallback(() => {
    fetchGameStage(room.id).then(setStage);
    fetchHistory(room.id).then(setHistory);
  }, [room])

  useEffect(() => {
    updateGameState()
    const interval = setInterval(() => {
      updateGameState()
    }, 500)
    return () => clearInterval(interval)
  }, [updateGameState]);

  return (
    <div>
      <div className="d-flex justify-content-end vw-100 p-2">
        <div style={{flexGrow: 1}}></div>
        <h2>Game in {room.name}</h2>
        <div style={{flexGrow: 1}}></div>
        <button className="btn btn-danger" onClick={returnToLobby}>Return To Lobby</button>
      </div>

      <GameTable
        playerId={room.players.map(u => u.username).indexOf(user.username)}
        cards={(smartStageToShow != null && history[smartStageToShow]?.cards_to_show) ||
          Array(PLAYERS * CARDS_PER_PLAYER + CARDS_IN_DISCARD).fill(null)}
        gameStage={stage}
        stageToShow={smartStageToShow}
        setStageToShow={setStageToShow}
        selectedCards={selectedCards}
        selectableCards={selectableCards}
        trySelectCard={trySelectCard}
        showableStages={showableStages}
        swappedCards={smartStageToShow ? history[smartStageToShow]?.swap : undefined}
      />
    </div>
  );
}