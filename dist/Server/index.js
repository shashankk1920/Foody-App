"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const connectDB_1 = __importDefault(require("./db/connectDB"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const resturant_routes_1 = __importDefault(require("./routes/resturant.routes"));
const menu_route_1 = __importDefault(require("./routes/menu.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
dotenv_1.default.config();
(0, connectDB_1.default)();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "3000", 10);
const server = http_1.default.createServer(app);
// Use __dirname safely (CommonJS style works with current tsconfig)
const DIRNAME = path_1.default.resolve();
// Middlewares
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// API routes
app.use("/api/v1/user", user_routes_1.default);
app.use("/api/v1/restaurant", resturant_routes_1.default);
app.use("/api/v1/menu", menu_route_1.default);
app.use("/api/v1/order", order_route_1.default);
// Serve frontend
app.use(express_1.default.static(path_1.default.join(DIRNAME, "/Client/dist")));
app.use("*", (_, res) => {
    res.sendFile(path_1.default.resolve(DIRNAME, "Client", "dist", "index.html"));
});
// Start server
server.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
