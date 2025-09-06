import {GameCharacter} from "./Game";

type CardProps = {
  character?: GameCharacter | null;
  highlighted: boolean;
  selected: boolean;
  dimmed: boolean;
  trySelect: () => void;
  swapped: boolean;
}

export default function Card({character, highlighted, selected, dimmed, trySelect, swapped}: CardProps) {
  return (
    <div onClick={trySelect}>
      <img className={`game-card 
      ${highlighted ? "highlighted" : ""} 
      ${selected ? "selected" : ""}
      ${dimmed ? "dimmed" : ""}
      ${swapped ? "swapped" : ""}`}
           src={`${process.env.PUBLIC_URL}/game/card_${character || "back"}.svg`} alt="Card Back"
           onDragStart={e => e.preventDefault()}/>
    </div>
  );
}