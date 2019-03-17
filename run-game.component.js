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
  getDestroyedLevel(buildingWeakness) {
    const destroyedPercentage = Math.round(this.state.clickCount / (this.winClickCount / buildingWeakness) * 100);
    if (destroyedPercentage >= 100) {
      return 90;
    }
    return destroyedPercentage;
  }
  render() {
    return(<div>
      <h2 class="h4 mb-4 pb-2 border-bottom">{ (this.props.username || 'user').toUpperCase() } EL DESTRUCTOR</h2>
      <div class="city">
        <img style={{transform: `translateY(${ this.getDestroyedLevel(10) }%)`}} class="city__building city__building--05" src="assets/img/building_05.png"/>
        <img style={{transform: `translateY(${ this.getDestroyedLevel(8) }%)`}} class="city__building city__building--04" src="assets/img/building_04.png"/>
        <img style={{transform: `translateY(${ this.getDestroyedLevel(4) }%) translateX(-50%)`}} class="city__building city__building--03" src="assets/img/building_03.png"/>
        <img style={{transform: `translateY(${ this.getDestroyedLevel(2) }%) translateX(-50%)`}} class="city__building city__building--02" src="assets/img/building_02.png"/>
        <img style={{transform: `translateY(${ this.getDestroyedLevel(1) }%) translateX(-50%)`}} class="city__building city__building--01" src="assets/img/building_01.png"/>
      </div>
      <div class="progress mb-4">
        <div className={`progress-bar bg-${ this.state.progressClass }`} style={{width: `${ this.state.progress }%`, transition: `all 1s linear`}}></div>
      </div>
      <button ref={ this.$button } onClick={ this.incrementClickCount.bind(this) } class="btn btn-block btn-primary mb-5">DESTRUYE</button>
    </div>);
  }
}