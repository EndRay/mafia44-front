import {CARDS_PER_PLAYER, GameCharacter, GameStage, PLAYERS} from "./Game";
import Card from "./Card";
import TurnSquare from "./TurnSquare";

type GameTableProps = {
  cards: (GameCharacter | null)[];
  gameStage: GameStage;
  playerId: number;
  stageToShow: number | null;
  setStageToShow: (stage: number | null) => void;
  selectedCards: number[];
  selectableCards: number[];
  trySelectCard: (cardId: number) => void;
  showableStages: GameStage[];
  swappedCards?: [number, number];
  playerNames: string[];
  playersToShow: number[];
}

export default function GameTable({
                                    cards,
                                    gameStage,
                                    playerId,
                                    stageToShow,
                                    setStageToShow,
                                    selectedCards,
                                    selectableCards,
                                    trySelectCard,
                                    showableStages,
                                    swappedCards,
                                    playerNames,
                                    playersToShow
                                  }: GameTableProps) {

  const showIdToId = (id: number) => {
    if (id >= PLAYERS * CARDS_PER_PLAYER)
      return id;  // discard
    return (id + playerId * CARDS_PER_PLAYER + PLAYERS * CARDS_PER_PLAYER) % (PLAYERS * CARDS_PER_PLAYER);
  }

  const showCard = (showId: number) => {
    const id = showIdToId(showId);
    const isSelected = selectedCards.includes(id) && stageToShow === null
    return <Card
      character={cards[id]}
      highlighted={cards[id] != null}
      selected={isSelected}
      dimmed={selectableCards.length !== 0 && !selectableCards.includes(id) && stageToShow === null && !isSelected}
      trySelect={() => trySelectCard(id)}
      swapped={swappedCards !== undefined && swappedCards.includes(id)}
      key={"card_" + showId}
    />
  }

  const showTurnSquare = (stage: GameStage, character: GameCharacter, isCopy: boolean) => {
    return <TurnSquare
      character={character}
      isActive={
        stage === GameStage.Shooting ||
        (gameStage === GameStage.Finished && showableStages.includes(stage)) ||
        gameStage === stage
      }
      isCurrent={gameStage === stage}
      isCopy={isCopy}
      onHover={showableStages.includes(stage) ? () => setStageToShow(stage) : undefined}
      onLeave={showableStages.includes(stage) ? () => setStageToShow(null) : undefined}
      key={"turn_square_" + stage}
    />
  }

  const showPlayerName = (showId: number) => {
    const id = (showId + playerId) % PLAYERS;
    return (
      <span className={`player-name ${playersToShow.includes(id) ? "shown" : ""}`}>
        {playerNames[id]}
      </span>
    )
  }

  return (
    <div className="border border-light rounded-3"
         style={{
           position: "relative", margin: "auto", marginTop: 16,
           width: 900, height: 600, backgroundColor: "#202b45"
         }}>

      <div className={"d-flex align-items-center"}
           style={{position: "absolute", top: 330, left: 261}}>
        <div className={"d-flex flex-column"}>
          {showTurnSquare(GameStage.Copy, GameCharacter.Copy, false)}
        </div>

        <div className={"d-flex flex-column"}>
          {showTurnSquare(GameStage.Thief, GameCharacter.Thief, false)}
          {showTurnSquare(GameStage.ThiefCopy, GameCharacter.Thief, true)}
        </div>

        <div className={"d-flex flex-column"}>
          {showTurnSquare(GameStage.Brothers, GameCharacter.Brothers, false)}
        </div>

        <div className={"d-flex flex-column"}>
          {showTurnSquare(GameStage.Seer, GameCharacter.Seer, false)}
          {showTurnSquare(GameStage.SeerCopy, GameCharacter.Seer, true)}
        </div>

        <div className={"d-flex flex-column"}>
          {showTurnSquare(GameStage.Brawler, GameCharacter.Brawler, false)}
          {showTurnSquare(GameStage.BrawlerCopy, GameCharacter.Brawler, true)}
        </div>

        <div className={"d-flex flex-column"}>
          {showTurnSquare(GameStage.Drunkard, GameCharacter.Drunkard, false)}
          {showTurnSquare(GameStage.DrunkardCopy, GameCharacter.Drunkard, true)}
        </div>

        <div className={"d-flex flex-column"}>
          {showTurnSquare(GameStage.Witch, GameCharacter.Witch, false)}
          {showTurnSquare(GameStage.WitchCopy, GameCharacter.Witch, true)}
        </div>

        <div className={"d-flex flex-column"}>
          {showTurnSquare(GameStage.Milkman, GameCharacter.Milkman, false)}
          {showTurnSquare(GameStage.MilkmanCopy, GameCharacter.Milkman, true)}
        </div>
      </div>

      <div className={"d-flex"} style={{position: "absolute", left: 265, top: 170}}>
        {showCard(8)}
        {showCard(9)}
        {showCard(10)}
      </div>

      <div className={"d-flex"} style={{position: "absolute", left: 325, top: 430}}>
        {showCard(0)}
        {showCard(1)}
      </div>
      <div style={{position: "absolute", left: 0, top: 540, textAlign: "right", width: 320}}>
        {showPlayerName(0)}
      </div>

      <div className={"d-flex"}
           style={{position: "absolute", left: -25, top: 215, transform: "rotate(90deg)"}}>
        {showCard(2)}
        {showCard(3)}
      </div>
      <div style={{position: "absolute", left: 30, top: 135, textAlign: "left"}}>
        {showPlayerName(1)}
      </div>

      <div className={"d-flex"}
           style={{position: "absolute", left: 325, top: 5, transform: "rotate(180deg)"}}>
        {showCard(4)}
        {showCard(5)}
      </div>
      <div style={{position: "absolute", left: 570, top: 20, textAlign: "left"}}>
        {showPlayerName(2)}
      </div>

      <div className={"d-flex"}
           style={{position: "absolute", left: 675, top: 215, transform: "rotate(-90deg)"}}>
        {showCard(6)}
        {showCard(7)}
      </div>
      <div style={{position: "absolute", left: 640, top: 415, textAlign: "right", width: 220}}>
        {showPlayerName(3)}
      </div>

      <div style={{position: "absolute", left: 570, top: 525}}
           className={"show-my-roles-square"}
           onMouseEnter={() => setStageToShow(GameStage.Beginning)}
           onMouseLeave={() => setStageToShow(null)}>
        <img className={"w-100"} style={{filter: "grayscale(100%) brightness(70%) contrast(500%)"}}
             src={`${process.env.PUBLIC_URL}/game/square_copy.svg`} alt="Roles"/>
      </div>


    </div>
  )
}