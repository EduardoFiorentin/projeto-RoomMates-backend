// { id: '1234', name: 'admin', iat: 1720925226, exp: 1720928826 }
export interface IPayLoad {
    id: string,
    name: string,
    room: string|null,
    iat?: number,
    exp?: number
}