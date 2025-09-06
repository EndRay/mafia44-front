import {GameCharacter} from "./Game";

type TurnSquareProps = {
  character: GameCharacter;
  isActive: boolean;
  isCurrent: boolean;
  isCopy: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

export default function TurnSquare({character, isActive, isCurrent, isCopy, onHover, onLeave}: TurnSquareProps) {
  return (
    <div style={{position: "relative"}} className={
      `game-turn-square 
      ${isActive ? "" : "inactive"} 
      ${onHover ? "hoverable" : ""}
      ${isCurrent ? "current" : ""}`}
         onMouseEnter={onHover} onMouseLeave={onLeave}>
      <img className={"w-100"}
           src={`game/square_${character}.svg`} alt="Turn Square"
           onDragStart={e => e.preventDefault()}/>
      {
        isCopy ?
          <div style={{
            position: "absolute", color: "hotpink", font: "Kristen ITC", fontSize: 30, fontWeight: "bold",
            top: 0, left: 14
          }}>?</div> : <></>}
    </div>
  );
}