"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubeID = youtubeID;
function youtubeID(url) {
    const [uri, composto] = url.split('?v=');
    const [uuid, params] = composto.split('&');
    return uuid;
}
