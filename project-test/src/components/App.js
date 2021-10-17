import React,{Component} from 'react';
import '../styles/App.css';
//import Data from 'https://rcslabs.ru/ttrp1.json';
 
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
        fetch("https://rcslabs.ru/ttrp1.json", {method: 'GET', mode: 'cors'})
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
    console.log(data.title);
    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
    return (
      <main className="main">
          <div className="main__wrapper">
            
            <h1 className="main__h1">Количество пройденных тестов “{data.title}”</h1>
            
          </div>
      </main>
    );}
  }

    }
export default App;