import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const {charId} = props;
        if (!charId){
            return;//если нет id, останавливаем
        }

        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed')) //fsm
            // setProcess - ф-ция ручного изменения состония и мы её запускаем когда в компоненте данные получены
        // this.foo.bar(); // для проверки ErrorBoundary
    }

    // const skeleton = char || loading || error ? null : <Skeleton/>
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char) ? <View char={char}/> : null;

    // fsm
    // const setContent = (process, char) => {
    //     switch (process) {
    //         case 'waiting':
    //             return <Skeleton/>;
    //             break;

    //         case 'loading':
    //             return <Spinner/>;
    //             break;

    //         case 'confirmed':
    //             return <View char={char}/>;
    //             break;

    //         case 'error':
    //             return <ErrorMessage/>;
    //             break;
        
    //         default:
    //             throw new Error('Unexpected process state');
    //             break;
    //     }
    // }

    return (
        <div className="char__info">
            {/* {skeleton}
            {errorMessage}
            {spinner}
            {content} */}
            {/* {setContent(process, char)} */}
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    
    let imgObjFitStyle = {'objectFit': 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgObjFitStyle = {'objectFit': 'contain'};
    }

    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgObjFitStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki}className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {/* если нет комиксов, выводим сообщение */}
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return; //если больше 10 комиксов, останаливаем
                        return(
                            <li key={i} className="char__comics-item">
                                <a href={item.resourceURI} target="_blank">{item.name}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;