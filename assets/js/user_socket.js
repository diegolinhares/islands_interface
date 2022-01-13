import { Socket } from "phoenix"

let socket = new Socket("/socket", { params: { token: window.userToken } })

socket.connect()

window.socket = socket

function new_channel(subtopic, screen_name) {
  return socket.channel("game:" + subtopic, { screen_name: screen_name });
}

function new_game(channel) {
  channel.push("new_game")
    .receive("ok", response => {
      console.log("New game!", response)
    })
    .receive("error", response => {
      console.log("Unable to start a new game", response)
    })
}

function join(channel) {
  channel.join()
    .receive("ok", response => {
      console.log("joined", response)
    })
    .receive("error", response => {
      console.log("not joinned", response)
    })
}

function add_player(channel, player) {
  channel.push("add_player", player)
    .receive("error", response => {
      console.log("Unable to add new player " + player, response)
    })
}

function position_island(channel, player, island, row, col) {
  var params = { "player": player, "island": island, "row": row, "col": col }

  channel.push("position_island", params)
    .receive("ok", response => {
      console.log("Island positioned!", response)
    })
    .receive("error", response => {
      console.log("Unable to position island.", response)
    })
}

function set_islands(channel, player) {
  channel.push("set_islands", player)
    .receive("ok", response => {
      console.log("Here is the board!")
      console.log(response.board)
    })
    .receive("error", response => {
      console.log("Unable to set islands for:" + player, response)
    })
}

function guess_coordinate(channel, player, row, col) {
  var params = { "player": player, "row": row, "col": col }

  channel.push("guess_coordinate", params)
    .receive("error", response => {
      console.log("Unable to guess a coordinate: " + player, response)
    })
}