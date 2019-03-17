class EndGame extends React.Component {
  render() {
    if (this.props.win) {
      return (<div>
        <h1>¡Has ganado!</h1>
      </div>);
    } else {
      return(<div>
        <h1>¡Has perdido!</h1>    
      </div>);
    }
  }
}