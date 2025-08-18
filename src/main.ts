import { Connection, InterfaceType } from "./interface/interface-type";
import { Match } from "./match/match";
import { Player } from "./player/player";

const _connections: Connection[] = [];

export const main: InterfaceType = (...connections) => {
  const players: Player[] = [];

  for (let i = 0; i < connections.length; i++) {
    if (!_connections.some(({ id }) => id === connections[i].id)) {
      const connection = connections[i];
      _connections.push(connection);
      players.push(new Player({ connection: connection }));
    }
  }

  const match: Match = new Match((event) => {
    for (let i = 0; i < _connections.length; i++) {
      _connections[i].onAction(event);
    }
  });
  for (let i = 0; i < players.length; i++) match.addPlayer(players[i]);

  return {
    connections: _connections.map(({ id }) => ({
      id,
      socket: match.emitEvent,
    })),
    addConnections: (...connections) => {
      for (let i = 0; i < connections.length; i++) {
        if (!_connections.some(({ id }) => id === connections[i].id)) {
          const connection = connections[i];
          _connections.push(connection);
          players.push(new Player({ connection: connection }));
        }
      }

      for (let i = 0; i < players.length; i++) match.addPlayer(players[i]);

      return _connections.map(({ id }) => ({ id, socket: match.emitEvent }));
    },
    startMatch: () => {
      if (!!players[0] && !!players[1]) {
        match.startMatch([players[0].id, players[1].id]);
      }
    },
  };
};
