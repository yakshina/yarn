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
    let sum = 0;
    let max = 0;
//для расчета высоты гистограммы ищу максимальную высоту деления 
    for (let n of Object.values(data)) {
        let arr = n;
    if(arr){
        for (let x of Object.values(arr)) {
            sum += x;
          }
          if(sum>max)max=sum;
          sum = 0;
    }  
    }
     // console.log("max: "+max);
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
                    <div className="compare">
                        <CreateDif def={[data.dev, data.test]}/>
                        <CreateDif def={[data.test, data.prod]}/>

                    </div>
                    <div className="companent">
                        <CreateColum instance={[data.dev, 'dev']}/>
                        <CreateColum instance={[data.test, 'test']}/>
                        <CreateColum instance={[data.prod, 'prod']}/>
                        <CreateNorm instance={[data.norm, 'норматив']}/>
                    </div>
                </section>
                <section className="label">
                    <ul className="label__descriptions">
                        <li className="label__descriptions__el">Клиентская часть</li>
                        <li className="label__descriptions__el">Серверная часть</li>
                        <li className="label__descriptions__el">База данных</li>
                    </ul>
                </section>
            </article>
        </main></>
    );}
    //столбцы 
    function CreateColum(props) {
        //компонент может занимать больше 100% от деления, учитывая это делаю высоту гистограммы 3,5 деления 
        const heig=max/3*3.5;
        let frontStyle = {
            height: props.instance[0].front*100/heig + '%'
        };
        let backStyle = {
            height: props.instance[0].back*100/heig + '%'
        };
        let dbStyle = {
            height: props.instance[0].db*100/heig + '%'
        };
        return (
            <div className="wrapper-companent">
            <div className="companent__col">
                <div className="companent__front" style={frontStyle}><p>{props.instance[0].front}</p></div>
                <div className="companent__back" style={backStyle}><p>{props.instance[0].back}</p></div>
                <div className="companent__db" style={dbStyle}><p>{props.instance[0].db}</p></div>
            </div>
            <div className="companent__label"><p>{props.instance[1]}</p></div>
            </div>


        )
    }
    function CreateNorm(props) {
        const heig=max/3*3.5;
        let normStyle = {
            height: props.instance[0]*100/heig + '%'
        };
        return (
            <div className="wrapper-companent">
            <div className="companent__col">
                <div className="companent__norm" style={normStyle}>
                <div className="companent__norm__value"><p>{props.instance[0]}</p></div>
                </div>
            </div>
            <div className="companent__label"><p>{props.instance[1]}</p></div>
            </div>
        )
    }

function CreateDif(props) {
        let a  = [0, 0];
        for(let i = 0; i < props.def.length; i++){
            let arr = props.def[i];
            for (let x of Object.values(arr)) {
                a[i]+=x;                
            }
        }
        let b = a[1]-a[0];
        let defStyle = {
            background:  '#FC440F'
        };
       if(b>0) {
           b = "+"+b;
            defStyle = {
            background:  '#00CC99'
        };
       } else if(b==0) {
        defStyle = {
            background:  '#898290',
        };
       }
        return (
            <div className="compare__def" style={defStyle}>
                <p>{b}</p>
            </div>
        )
    }
    }
}    

export default App;