class RunGame extends React.Component {
  state = {
    progress: 0,
    progressClass: 'success',
    clickCount: 0
  }
  $button = React.createRef();
  interval;
  timeLimit = 20; // Time limit in seconds
  winClickCount = 20 * (this.props.difficulty || 1); // Ammount of click to win the game
  componentDidMount() {
      this.interval = setInterval(() => {
        if (this.state.progress >= 100) {
          clearInterval(this.interval);
          this.$button.current.disabled = true;
          return this.props.onEndGame(false);
        }
        if (this.state.progressClass !== 'danger' && this.state.progress >= 75) {
          this.setState({progressClass: 'danger'});
        }
        this.setState({progress: this.state.progress + (100 / this.timeLimit)});
      }, 1000);
  }
  componentWillUnmount() {
      clearInterval(this.interval);
  }
  incrementClickCount() {
    if (this.state.clickCount >= this.winClickCount) {
      this.$button.current.disabled = true;
      return this.props.onEndGame(true);
    }
    this.setState({clickCount: this.state.clickCount + 1});
  }
  render() {
    return(<div>
      <h2 class="h4 mb-4 pb-2 border-bottom">{ (this.props.username || 'user').toUpperCase() }</h2>
      <p>¡Ánimo ya llevas <b>{ this.state.clickCount }</b> clicks!</p>
      <p class="mb-4">Te faltan solo <b>{ this.winClickCount - this.state.clickCount }</b> clicks para ganar</p>
      <button ref={ this.$button } onClick={ this.incrementClickCount.bind(this) } class="btn btn-block btn-primary mb-5">CLICK</button>
      <div class="progress">
        <div className={`progress-bar bg-${ this.state.progressClass }`} style={{width: `${ this.state.progress }%`, transition: `all 1s linear`}}></div>
      </div>
    </div>);
  }
}