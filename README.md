# VoiceCast – WebRTC Audio Broadcast App

**VoiceCast** is a minimal, modular WebRTC broadcasting app that allows one or more speakers to broadcast live audio to listeners via easy-to-say URLs. Built with WebRTC, React, WebSocket signaling, and Node.js.

---

## 🔧 Features

- WebRTC peer-to-peer audio streaming
- Host, broadcaster, and listener roles
- Editable room topic (host-only) visible to all
- Raise hand / feedback via WebRTC DataChannel (planned)
- Easy-to-share room URLs (e.g., `/room/blue-apple-cloud`)
- Secure, no audio stored
- Turn-ready for NAT traversal and IP obfuscation

---

## 📁 Project Structure

```
server/         - Node.js WebSocket signaling server
client/         - React + Vite frontend with Tailwind CSS
  └── src/
      ├── rtc/            - WebRTC peer connection logic
      ├── signaling/      - WebSocket signaling client
      ├── context/        - WebRTC role + socket state
      ├── ui/             - UI components
      ├── utils/          - Helper modules
```

---

## 🧪 Local Development

### 1. Install dependencies

```bash
cd client
npm install
cd ../server
npm install
```

### 2. Build frontend

```bash
cd client
npm run build
```

This outputs to `client/dist/`.

### 3. Run server

```bash
cd ../server
node server.js
```

Visit [http://localhost:3000/new](http://localhost:3000/new) to start a new room.

---

## 🚀 Deployment to Fly.io

### 1. Install Fly CLI
```bash
curl -L https://fly.io/install.sh | sh
fly auth login
```

### 2. Deploy
```bash
fly launch
fly deploy
```

Fly will give you a live HTTPS URL like `https://voicecast.fly.dev`.

---

## 📦 Future Features

- Bidirectional messaging for chat and commands
- TURN server integration for IP obfuscation
- Active speaker indicators
- Mobile PWA support
- Moderator controls

---

## ✅ License
MIT — Use freely with attribution
