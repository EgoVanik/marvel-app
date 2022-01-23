import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [process, setProcess] = useState('waiting'); //fsm

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        
        setProcess('loading'); //при загрузке меняем процесс
        try{
            const response = await fetch(url, {method, body, headers});
            // if error
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            }

            const data = await response.json();

            return data; // возвращаем данные
        } catch(e){
            setProcess('error'); //sfm
            throw e; // выкидываем ошибку
        }
    }, []);

    const clearError = useCallback(() => {
        setProcess('loading'); //при очищении ошибки делаем запрос заново
    }, []); //очищаем ошибку чтобы дальше все работало и можно было сделать запрос
    
    //возвращаем все из кастомного хука 
    return {request, clearError, process, setProcess};
}

// process пробрасываем в MarvelService