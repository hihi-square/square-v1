"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Dashboard = () => (react_1.default.createElement("div", null,
    react_1.default.createElement("h1", null, "Welcome to the Dashboard!"),
    react_1.default.createElement("p", null, "This is a private page accessible after successful login.")));
exports.default = Dashboard;
