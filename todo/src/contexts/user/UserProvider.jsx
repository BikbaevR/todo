import {createContext, useState} from "react";
import { logger } from '../../scripts/logger'
import {deleteFromSecureStore, getFromSecureStore, saveToSecureStore} from "../../scripts/secureStore";
import {generateId} from "../../scripts/generateId";
// import {findUser} from "../../db/db_crud";



export const AuthContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [authorized, setAuthorized] = useState(false);
    const [storedValue, setStoredValue] = useState(null);
    const [user, setUser] = useState(null);


    const tempData = [
        {
            login: 'rafael',
            password: '123456',
        },
        {
            login: 'admin',
            password: '123456',
        },
        {
            login: '1',
            password: '1',
        }
    ]

    const _checkLoginData = ({ loginValue, passwordValue}) => {

        logger.writeLog("checkLoginData | login  | data --> " + loginValue)

        const isValid = tempData.some(
            (item) => item.login === loginValue && item.password === passwordValue
        );
        if (isValid) {
            logger.writeLog(`checkLoginData | user with login [${loginValue}] authorized`);
            return true;
        }
        logger.writeLog(`checkLoginData | user with login [${loginValue}] not authorized`);
        return false;

        // let dataFromDB = findUser(loginValue, passwordValue)
        // logger.writeLog("dataFromDB --> " + dataFromDB)

    };

    const login = ({loginValue, passwordValue}) => {

        logger.writeLog("login  | data --> " + loginValue)

        if(_checkLoginData({loginValue, passwordValue})){
            setAuthorized(true);
            setUser(loginValue);
            saveToSecureStore('userToken', generateId()).then(r => {logger.writeLog("Авторизация завершена и токен записан")})
            setToken('token')
            return true
        }
        else{
            logger.writeLog("login | error")
            return false
        }
    }

    const logout = () => {
        logger.writeLog("logout")

        setAuthorized(false);
        setUser(null)
        setToken('')
        deleteFromSecureStore('userToken').then(r => {logger.writeLog("Пользователь разлогинился")})
    }

    const _checkLoginName = (loginName) => {
        return !tempData.some((item) => item.login === loginName);
    };

    const register = (registerData) => {
        if(_checkLoginName(registerData.login)){
            logger.writeLog(`register _checkLoginName is true`);
            tempData.push({
                login: registerData.login,
                password: registerData.password,
            })
            logger.writeLog(`register | user with login [${registerData.login}] registered`);
            return true;
        }
        logger.writeLog(`register _checkLoginName is false`);
        logger.writeLog(`register | user with login [${registerData.login}] not registered`);
        return false;
    }

    const getToken = () => {
        // let token = getFromSecureStore('userToken').then(null)
        logger.writeLog('getToken.token --> ' + token)
        return token.length > 0
    }


    return (
        <AuthContext.Provider value={{ token, setToken, authorized, user, login, logout, register, getToken }}>
            {children}
        </AuthContext.Provider>
    )
}