import { Event } from "../../commons/event";
import { Player } from "../player";

export class ConnectedEvent extends Event {
  constructor(player: Player) {
    super({
      type: "info",
      data: {
        player_id: player.id,
        message: "I have connected",
      },
    });
  }
}
