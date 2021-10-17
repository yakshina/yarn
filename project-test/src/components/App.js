import React,{Component} from 'react';
import '../styles/App.css';
const DATAURL = 'https://rcslabs.ru/ttrp1.json';
 
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          data: []
        };
      }
      componentDidMount() {
        fetch(DATAURL, {method: 'GET', mode: 'cors'})
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                data: result,
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    

  render(){
    const { error, isLoaded, data } = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
    return (
      <><header className="header">
            <article className="header__wrapper wrapper">
                <h1 className="header__h1">Количество пройденных тестов “{data.title}”</h1>
                <nav className="header__nav">
                    <span className="header__nav__burger"></span>
                    <ul className="header__nav__items">
                        <li className="header__nav__item">{data.title}</li>
                    </ul>
                </nav>
            </article>
        </header>
        <main className="main">
            <article className="main__wrapper wrapper">
                <section className="charts">
                    <div className="compare"></div>
                    <div className="companent">
                        <CreateColum instance={[data.dev, 'dev']}/>
                        <CreateColum instance={[data.test, 'test']}/>
                        <CreateColum instance={[data.prod, 'prod']}/>
                        <CreateNorm instance={[data.norm, 'норматив']}/>
                    </div>
                </section>
                <section className="label">

                </section>
            </article>
        </main></>
    );}
    //столбцы 
    function CreateColum(props) {
        //let sum = props.instance[0].front+props.instance[0].back+props.instance[0].db;
        let frontStyle = {
            height: props.instance[0].front + '%'
        };
        let backStyle = {
            height: props.instance[0].back  + '%'
        };
        let dbStyle = {
            height: props.instance[0].db  + '%'
        };
        return (
            <div className="companent__col">
            <div className="companent__front" style={frontStyle}>{props.instance[0].front}</div>
            <div className="companent__back" style={backStyle}>{props.instance[0].back}</div>
            <div className="companent__db" style={dbStyle}>{props.instance[0].db}</div>
            <div className="companent__label">{props.instance[1]}</div>
            </div>

        )
    }
    function CreateNorm(props) {
        console.log(props);

        return (
            <div className="companent__col">
                <div className="companent__norm">
                <div className="companent__norm__value">{props.instance[0]}</div>
                </div>
            <div className="companent__label">{props.instance[1]}</div>
            </div>

        )
    }

    }
}    

export default App;