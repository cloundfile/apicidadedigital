const encoding = process.env.TOKEN;
const jwt = require('jsonwebtoken');

type jwtClient = {
	uuid: number,
    username: string
}

export function createToken(payload: jwtClient){
	return jwt.sign(payload, encoding, { expiresIn: '24h' })
}

export function verifyToken(token: string): jwtClient{
	return jwt.verify(token, encoding) as jwtClient
}