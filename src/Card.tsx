import {GameCharacter} from "./Game";

type CardProps = {
  character?: GameCharacter | null;
  highlighted: boolean;
  selected: boolean;
  selectable: boolean;
  dimmed: boolean;
  shotBy: string | null;
  trySelect: () => void;
  swapped: boolean;
}

export default function Card({character, highlighted, selected, selectable, dimmed, shotBy, trySelect, swapped}: CardProps) {
  return (
    <div onClick={trySelect} style={{position: "relative"}}>
      <div className={`game-card 
      ${highlighted ? "highlighted" : ""} 
      ${selected ? "selected" : ""}
      ${selectable ? "selectable" : ""}
      ${dimmed ? "dimmed" : ""}
      ${shotBy ? "shot" : ""}
      ${swapped ? "swapped" : ""}`}>
           <img src={`${process.env.PUBLIC_URL}/game/card_${character || "back"}.svg`} alt="Card Back"
           onDragStart={e => e.preventDefault()}/>
        {shotBy &&
          <div className={"shot-by-label"}>
            <span>{shotBy}</span>
          </div>
        }

      </div>
    </div>
  );
}