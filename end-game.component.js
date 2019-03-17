class EndGame extends React.Component {
  clickRetry() {
    this.props.onRetry();
  }
  render() {
    if (this.props.win) {
      return (<div>
        <img class="mb-3" src="assets/img/win.gif" />
        <h1 class="mb-4">¡Has ganado!</h1>
        <button onClick={ this.clickRetry.bind(this) } class="btn btn-primary btn-block">Volver a Jugar</button>
      </div>);
    } else {
      return(<div>
        <img class="mb-3" src="assets/img/lose.gif" />
        <h1 class="mb-4">¡Has perdido!</h1>    
        <button onClick={ this.clickRetry.bind(this) } class="btn btn-primary btn-block">Volver a Jugar</button>
      </div>);
    }
  }
}