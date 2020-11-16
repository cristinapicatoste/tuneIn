export const DecodeToken = (token) => {

    //Hacemos un split a token que está en formato JSON
    //encToken devuelve el Payload del token
    //Payload contiene la información encriptada del usuario, en este caso el id (pero podría contener más información, según se lo definamos en el backend)
    const encToken = token.split('.')[1];

    //atob() desencripta el token (en este caso solo el Payload)
    //tokenData contiene el payload (info del usuario, en este caso el id) desencriptado
    const tokenData = atob(encToken);

    //parsedTokenData contiene el token Data en formato string
    const parsedTokenData = JSON.parse(tokenData);

    return parsedTokenData;
}