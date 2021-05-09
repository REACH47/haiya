const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:3000/haiya",
    methods: ["GET", "POST"],
  },
});
