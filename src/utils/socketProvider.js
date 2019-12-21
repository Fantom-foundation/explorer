import io from "socket.io-client";

let socketClient;

export const connectSocketConnection=async ()=>{
	console.log("Establishing socket Connection");
	socketClient = io(process.env.REACT_APP_SOCKET_URL);
	return new Promise((resolve,)=>{socketClient.on('connect',async (data)=>{
		console.log("socket connection established");
		socketClient.emit('subscribe');
		resolve(socketClient);
	})});
};

export const disconnectSocket=()=>{
	socketClient.close();
	console.log("socket disconnected");
};