export const apiAddr = () => {
    return `${environment.protocol}${environment.ipServer}:${environment.port}`; 
}

export const environment = {
    ipServer: '192.168.1.70',
    protocol:  'http://',
    port: '81'    
};