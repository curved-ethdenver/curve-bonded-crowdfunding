import React, { Component } from "react";
import "./LaunchForm.css";

class LaunchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stepOneComplete: false,
      stepTwoComplete: false,
      amount: "",
      duration: "",
      title: "",
      description: "",
      tokenSupply: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitStepOne = this.handleSubmitStepOne.bind(this);
    this.handleSubmitStepTwo = this.handleSubmitStepTwo.bind(this);
  }

  handleChange(value, key) {
    this.setState({ [key]: value });
  }

  handleSubmitStepOne(evt) {
    evt.preventDefault();
    console.log("Step one completed");
    this.setState({
      stepOneComplete: true,
      amount: evt.target.amount,
      duration: evt.target.duration,
      title: evt.target.title
    });
  }

  handleSubmitStepTwo(evt) {
    evt.preventDefault();
    console.log("Step two completed");
    this.setState({
      stepTwoComplete: true,
      description: evt.target.description,
      tokenSupply: evt.target.tokenSupply
    });

    // TODO - Fix forced refresh
    window.location = "/campaign";
  }

  render() {
    return (
      <div className="form-wrapper">
        <div className="launch-form-header">
          <span className="title">Launch your commons.</span>
          <span className="subtitle">
            Raise funds, engage communities, support projects, and incentivize
            action.
          </span>
        </div>
        {!this.state.stepOneComplete ? (
          <FirstPage onSubmit={this.handleSubmitStepOne} />
        ) : !this.state.stepTwoComplete ? (
          <SecondPage
            handleChange={this.handleChange}
            onSubmit={this.handleSubmitStepTwo}
            description={this.state.description}
          />
        ) : (
          <div>Form Completed!</div>
        )}
      </div>
    );
  }
}

const FirstPage = props => (
  <form className="launch-form" onSubmit={props.onSubmit}>
    <div className="field-wrapper">
      <span id="row-title">How much money do you want to raise?</span>
      <input id="input-field" type="number" name="amount" />
      <label id="input-amount-label">xDai</label>
      <span id="row-title">Over how long? (Starting from today)</span>
      <input id="input-field" type="date" name="duration" />
      <span id="row-title">What's the name of your campaign?</span>
      <input id="input-field" type="text" name="title" />
    </div>
    <input id="btn-send" type="button" value="Next" onClick={props.onSubmit} />
  </form>
);

const SecondPage = ({ description, handleChange, onSubmit }) => (
  <form className="submission-form">
    <div className="field-wrapper">
      <span id="row-title">Describe your campaign, cause, or commons.</span>
      <textarea
        id="description"
        rows="6"
        cols="30"
        value={description}
        onChange={evt => handleChange(evt.target.value, "description")}
      >
        Enter a description...
      </textarea>
    </div>
    <span id="row-title">How much initial investment are you pooling?</span>
    <input id="input-field" type="number" name="tokenSupply" />
    <input id="btn-send" type="button" value="Next" onClick={onSubmit} />
  </form>
);

export default LaunchForm;
