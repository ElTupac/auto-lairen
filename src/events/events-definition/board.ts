import { BoardRetrievePermanents } from "../../commands/board/board-retrieve-permanents";
import { BoardRetrieveTreasures } from "../../commands/board/board-retrieve-treasures";
import { DestroyAllBoardUnits } from "../../commands/destroy-all-board-units";
import { EventDefinition } from "../event-type";

export type BoardEventsDefinitions = {
  "board.retrieve-treasures": EventDefinition<BoardRetrieveTreasures>;
  "board.retrieve-permanents": EventDefinition<BoardRetrievePermanents>;
  "board.destroy-all-board-units": EventDefinition<DestroyAllBoardUnits>;
};
