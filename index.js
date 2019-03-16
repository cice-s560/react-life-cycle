class Padre extends React.Component {
  state = {
    valor: 7,
    sonValue: null,
  };

  cambio(value) {
    console.log("cambio", this.state)
    this.setState({sonValue: value});
  }
  
  render() {
    if (this.state.sonValue > this.state.valor) {
        return (<p>Adiós hijo :( te has emancipado)</p>);
    }
    
    return(<Hijo valor={this.state.valor} onChangeNumber={valor => this.cambio(valor)} />);
  }
}

class Hijo extends React.Component {
  constructor(props) {
     super(props);
    
    this.state = {
      luckyNumber: props.valor
    };
    
    console.log("--> Construyo");
  }
  
  render() {
    console.log("--> Render");
    
    return (
      <React.Fragment>
        <p>Hola</p>
        <p>Este es mi número de la suerte: {this.state.luckyNumber} El de mi padre es: {this.props.valor}</p>
        <button onClick={() => this.changeNumber()}>Cambia número</button>
      </React.Fragment>      
    );
  }
  
  componentDidMount() {
    console.log("--> Fin montaje")
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log("--> Fin render");
  }
  
  componentWillUnmount() {
    console.log("--> Adiós mundo!");
  }
  
  
  changeNumber() {
    const newNumber = Math.round(Math.random() * 10);
    
    this.setState({luckyNumber: newNumber});
    
    this.props.onChangeNumber(newNumber);
  }
}

ReactDOM.render(
  <Padre />,
  document.getElementById('root')
);
