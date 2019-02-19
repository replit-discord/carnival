import asyncio
import sys
import select
import json

STDIN_BUF = sys.stdin.buffer
STDOUT_BUF = sys.stdout.buffer

async def read_msg():
  async def read(length):
    res = []
    while len(res) < length:
      if not select.select([STDIN_BUF], [], [], 0)[0]:
        await asyncio.sleep(0)
        continue
      res.append(STDIN_BUF.read1(length - len(res)))
    return b"".join(res)
  
  res = b""
  while True:
    char = await read(1)
    if char == b"\n":
      break
    res += char
  return res.decode().split(" ")

  """
  async def read_num():
    return int.from_bytes(await read(4), "little")
  
  return [await read(await read_num()) for count in range(await read_num())]"""

def write_msg(args):
  print(" ".join(args))
  return

  """def write_num(num):
    STDOUT_BUF.write(num.to_bytes(4, "little"))

  write_num(len(args))
  for arg in args:
    write_num(len(arg))
    STDOUT_BUF.write(arg)"""

def make_base_lobby(game):
  class Lobby():
    def __init__(self):
      self.players = set()
    
    def add_player(self, id_):
      self.players.add(id_)
      return len(self.players) == 2
    
    def remove_player(self, id_):
      self.players.remove(id_)
    
    def make_game(self):
      return game(self.players)
  
  return Lobby

class MessageRouter():
  def __init__(self, lobby, json=True):
    self.lobbies = {}
    self.games = {}

    self.lobby = lobby
    self.json = json

  async def handle_cmd(self, type_, *data):
    if type_ == "lobby":
      cmd, *data = data
      if cmd == "make":
        name, = data
        self.lobbies[name] = self.lobby()
        write_msg(["lobby", "make", name])

      elif cmd == "add":
        name, id_ = data
        full = self.lobbies[name].add_player(id_)
        
        if full:
          game = self.lobbies[name].make_game()
          self.games[name] = game

          if self.json:
            def send(to, *args):
              write_msg(["game", name, to] + [json.dumps(arg) for arg in args])
          
          else:
            def send(*args):
              write_msg(["game", name, *args])

          asyncio.ensure_future(game.run(send))

          del self.lobbies[name]

        write_msg(["lobby", "add", name, id_, str(full)])

      elif cmd == "remove":
        name, id_ = data
        self.lobbies[name].remove_player(id_)
        write_msg(["lobby", "remove", name, id_])
    
    elif type_ == "game":
      name, *args = data
      self.games[name].handle_cmd(*args)

  async def run(self):
    while True:
      await self.handle_cmd(*await read_msg())

def run(lobby):
  router = MessageRouter(lobby)
  asyncio.get_event_loop().run_until_complete(router.run())