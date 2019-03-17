class NewGame extends React.Component {
  $username = React.createRef();
  $difficulty = React.createRef();
  next(e) {
      e.preventDefault();
      if (!this.$username.current.value) {
          return;
      }
      this.props.onStartGame(this.$username.current.value, this.$difficulty.current.value);
  }
  render() {
      return(<form onSubmit={ this.next.bind(this) }>
          <h2 class="h4 mb-4 pb-2 border-bottom">NUEVA PARTIDA</h2>
          <div class="text-left">
            <label>Competidor</label>
            <input ref={ this.$username } onKeyUp={ this.updateValue } placeholder="username" class="form-control mb-3"/>
          </div>
          <div class="text-left mb-4">
            <label for="dificulltyLevel">Dificultad</label>
            <select ref={ this.$difficulty } class="form-control" id="dificulltyLevel">
                <option value="1">Stickman</option>
                <option value="2">Normal</option>
                <option value="5">Nighmare</option>
                <option value="10">Hell</option>
            </select>
          </div>
          
          <button type="submit" class="btn btn-block  btn-primary">Empezar</button>
      </form>);
  }
}