import React from "react";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
    };
  }

  addItem = () => {
    const { input } = this.state;
    if (input) {
      this.props.addItem(input);
      this.setState({ input: "" });
    }
  };

  handleEnter = (event) => {
    if (event.key === "Enter") this.addItem();
  };

  inputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  render() {
    const { input } = this.state;

    return (
      <div className="item-input">
        <input
          onKeyPress={this.handleEnter}
          onChange={this.inputChange}
          value={input}
        />
        <button onClick={this.addItem}>ADD</button>
      </div>
    );
  }
}

export default TodoForm;
