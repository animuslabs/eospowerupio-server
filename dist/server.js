"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const ms_1 = __importDefault(require("ms"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var cors = require('cors');
const serverActions = __importStar(require("./lib/serverActions"));
app.set('trust proxy', 1);
const basicAuth = __importStar(require("express-basic-auth"));
var proxy = require('express-http-proxy');
const istorexit_1 = __importDefault(require("istorexit"));
const express_blacklist_1 = __importDefault(require("express-blacklist"));
app.use(express_blacklist_1.default.blockRequests('../blacklist.txt'));
const express_cache_middleware_1 = __importDefault(require("express-cache-middleware"));
const cache_manager_1 = __importDefault(require("cache-manager"));
const limiter = express_rate_limit_1.default({
    windowMs: ms_1.default('24h'),
    max: 4
});
const limiter2 = express_rate_limit_1.default({
    windowMs: ms_1.default('30m'),
    max: 10
});
const cacheMiddleware = new express_cache_middleware_1.default(cache_manager_1.default.caching({
    max: 100,
    store: 'memory', ttl: 10
}));
const auth = basicAuth.default({
    users: {
        'powerupadmin': 'boidisthewoid',
    },
    challenge: true,
    realm: 'eospowerupio'
});
app.use(express_1.default.json());
app.use(cors());
let blocklist = [];
let whitelist = [];
app.use(async function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const exit = () => {
        console.log('Blocking request From:', ip);
        res.statusCode = 403;
        res.end();
        return;
    };
    if (whitelist.some(el => el == ip))
        return next();
    else if (blocklist.some(el => el == ip))
        return exit();
    else if (await istorexit_1.default(ip)) {
        console.log('Blocked Tor:', ip);
        blocklist.push(ip);
        console.log('blocklist length:', blocklist.length);
        return exit();
    }
    else {
        whitelist.push(ip);
        console.log('Whitelist length:', whitelist.length);
        next();
    }
});
app.use('/freePowerup/:accountName', limiter, async (req, res) => {
    try {
        console.log('Powerup Request:', req?.params?.accountName, req.headers['x-forwarded-for'] || req.socket.remoteAddress);
        console.log(req.rateLimit);
        const name = String(req.params.accountName).trim().toLowerCase();
        const result = await serverActions.freePowerup(name, req.query);
        if (result?.status == 'error') {
            res.statusCode = 400;
        }
        console.log(result);
        res.json({ result, rateLimit: req.rateLimit });
    }
    catch (error) {
        res.statusCode = 500;
        console.log(error);
        res.json(error);
    }
});
app.use('/studio', auth, proxy('http://localhost:5555'));
cacheMiddleware.attach(app);
app.use('/stats', limiter2, async (req, res) => {
    try {
        const result = await serverActions.getStats();
        res.json(result);
    }
    catch (error) {
        res.statusCode = 500;
        console.log(error);
        res.json(error);
    }
});
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
//# sourceMappingURL=server.js.map