import * as SecureStore from "expo-secure-store"

import { logger } from './logger'

export async function saveToSecureStore(key, value) {
    try {
        await SecureStore.setItemAsync(key, value, {
            keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
        });
        logger.writeLog('Данные сохранены!');
    } catch (error) {
        logger.writeLog(`Ошибка сохранения в SecureStore -> ${error}`);
    }
}

export async function getFromSecureStore(key) {
    try {
        const value = await SecureStore.getItemAsync(key);
        if (value) {
            logger.writeLog('Полученные данные:', value);
            return value;
        } else {
            logger.writeLog('Ключ не найден.');
            return null;
        }
    } catch (error) {
        logger.writeLog(`Ошибка чтения из SecureStore -> ${error}`);
        return null;
    }
}

export async function deleteFromSecureStore(key) {
    try {
        await SecureStore.deleteItemAsync(key);
        logger.writeLog('Данные удалены!');
    } catch (error) {
        logger.writeLog(`Ошибка удаления из SecureStore -> ${error}`);
    }
}