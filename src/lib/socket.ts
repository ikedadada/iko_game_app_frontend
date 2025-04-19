export let socket: WebSocket;
export const connectSocket = () => {
  socket = new WebSocket("http://host.docker.internal:8000/ws");
};
