import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo){
        console.log(error, errorInfo);
        this.setState({error: true})
    }

    render(){
        // если ошибка - рендерим запасной интерфейс
        if (this.state.error){
            return <ErrorMessage/>
        }

        // если нет ошибки, рендерим структуру компонента, т.е. потомка, т.к. этот компонент обёртка
        return this.props.children;
    }
}
export default ErrorBoundary;