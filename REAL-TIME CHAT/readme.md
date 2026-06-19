Intern ID:CTIS05S19

Task 2: Real-Time Chat Server📝 
Project Overview
This project targets the development of a low-latency, bidirectional, real-time communication platform layer. Utilizing stateful connection architectures, the server facilitates persistent WebSocket channels across client instances, enabling concurrent room creation, scalable group isolation, and instantaneous payload delivery.  
Core Architecture & Concepts
Persistent Bi-directional Socket Routing: Eliminates the overhead of HTTP polling by sustaining long-lived TCP handshakes via Socket.IO or native WebSockets.
Channel/Room Partitioning: Isolates data broadcasting layers, allowing individual clients to subscribe to specific room contexts without cross-contaminating unrelated channels.
  Event-Driven Packet Dispatching: Listens for distinct message events asynchronously, immediately broadcasting structural JSON payloads to active subscribers. 
  Technical StackEngine Framework: Node.js (Express) or Python (ASGI / FastAPI)  
  Real-Time Protocol: Socket.IO / WebSockets  
  Session Memory Cache (Optional): Redis (for pub/sub horizontal scaling)