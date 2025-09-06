import {CARDS_IN_DISCARD, CARDS_PER_PLAYER, GameStage, PLAYERS} from "./Game";

export function getSelectableCards(playerId: number, stage: GameStage, selectedCards: number[], cardId?: number) {
  let selectableCards = [];

  let discardCards = [];
  let otherPlayerCards = [];
  let notCardIdCards = [];
  let discardCardSelected = false;

  for (let i = 0; i < CARDS_IN_DISCARD; i++) {
    discardCards.push(PLAYERS * CARDS_PER_PLAYER + i);
  }
  for (let i = 0; i < PLAYERS * CARDS_PER_PLAYER; i++) {
    let cardPlayerId = Math.floor(i / CARDS_PER_PLAYER);
    if (cardPlayerId !== playerId) {
      otherPlayerCards.push(i);
    }
  }
  for (let i = 0; i < PLAYERS * CARDS_PER_PLAYER + CARDS_IN_DISCARD; i++) {
    if (i !== cardId) {
      notCardIdCards.push(i);
    }
  }
  for (let i = 0; i < CARDS_IN_DISCARD; i++) {
    if (selectedCards.includes(PLAYERS * CARDS_PER_PLAYER + i)) {
      discardCardSelected = true;
      break;
    }
  }


  if (stage === GameStage.Copy) {
    selectableCards.push(...notCardIdCards);
  }

  if (stage === GameStage.Thief || stage === GameStage.ThiefCopy) {
    selectableCards.push(...otherPlayerCards);
  }

  if (stage === GameStage.Seer || stage === GameStage.SeerCopy) {
    if (!discardCardSelected) {
      selectableCards.push(...otherPlayerCards);
    }
    selectableCards.push(...discardCards);
  }

  if (stage === GameStage.Brawler || stage === GameStage.BrawlerCopy) {
    selectableCards.push(...otherPlayerCards);
  }

  if (stage === GameStage.Drunkard || stage === GameStage.DrunkardCopy) {
    selectableCards.push(...discardCards)
  }

  if (stage === GameStage.Witch || stage === GameStage.WitchCopy) {
    if (selectedCards.length === 0) {
      selectableCards.push(...otherPlayerCards);
      selectableCards.push(...discardCards);
    } else {
      if (discardCardSelected) {
        selectableCards.push(...otherPlayerCards);
      } else {
        selectableCards.push(...discardCards);
      }
    }
  }
  if (stage === GameStage.Shooting) {
    selectableCards.push(...otherPlayerCards);
    selectableCards.push(...discardCards);
    console.log(selectableCards)
  }
  // selectableCards = []
  // for(let i = 0; i < PLAYERS * CARDS_PER_PLAYER + CARDS_IN_DISCARD; i++){
  //   selectableCards.push(i);
  // }

  return selectableCards;
}