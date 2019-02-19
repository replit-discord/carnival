import asyncio

import games.python.lib as lib

class Game():
  def __init__(self, players):
    self.players = players
    self.played = {}
    self.all_played = asyncio.Event()

  def handle_cmd(self, player, played):
    self.played.setdefault(player, int(played)) # setdefault so they cant change it
    if len(self.played) == len(self.players):
      self.all_played.set()
  
  def remove_player(self, player):
    self.players.remove(player)
    self.played.pop(player, None)
    if len(self.played) >= len(self.players):
      self.all_played.set()

  async def run(self, send):
    await self.all_played.wait()

    if len(self.players) == 2:
      player_1, player_2 = [self.players.pop() for _ in range(2)]
      played_1, played_2 = self.played[player_1], self.played[player_2]
      diff = (played_1 - played_2) % 3

      if diff == 0:
        send(player_1, "Tied")
        send(player_2, "Tied")
      
      elif diff == 1:
        send(player_1, "Win")
        send(player_2, "Lose")
      
      elif diff == 2:
        send(player_1, "Lose")
        send(player_2, "Win")

    else: # if someone left
      for player in tuple(self.players): # might lose a player while sending
        send(player, "no-winner-someone-left") # no spaces until i implement a real protocol

lib.run(lobby=lib.make_base_lobby(Game))