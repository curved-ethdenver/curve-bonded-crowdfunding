import React, { Component } from "react";
import Box from "3box";
import styled from "styled-components";
import Avatar from "react-avatar";
import { Card, Button } from "rebass";
import { Line } from "rc-progress";

import getWeb3 from "../../utils/getWeb3";
// import Web3 from "web3";
// import { portis } from "../utils/getPortisWeb3";

import Header from "../Header/Header.jsx";
import Test from "../../images/header-img.jpg";
import "./Campaign.css";

const StyledInput = styled.input`
  height: 30px;
  width: 75%;
  float: left;
`;

const Contribution = styled.div`
  width: 375px;
  overflow: hidden;
  margin: 0;
  float: left;
`;

const ContributeButton = styled.div`
  float: left;
`;

const ABBY_ADDRESS = "0x9f2942fF27e40445d3CB2aAD90F84C3a03574F26";
const SETH_ADDRESS = "0x3e9976d5ba86a78d6e5c25bc2f309049676c0798";
const TO_ADDRESS = "0x9f2942fF27e40445d3CB2aAD90F84C3a03574F26";

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [ABBY_ADDRESS, SETH_ADDRESS],
      profiles: {},
      avatars: {},
      error: null,
      account: null,
      contributionAmount: 0,
      web3: null,
      networkId: null,
      txReceipt: null
    };
    this.getProfile = this.getProfile.bind(this);
    this.handleContribution = this.handleContribution.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  async getProfile(address) {
    const profile = await Box.getProfile(address);
    try {
      console.log("profile: ", profile);
      this.setState({
        profiles: {
          ...this.state.profiles,
          [address]: profile
        }
      });
    } catch (err) {
      this.setState({
        error: new Error(`Error getting profile for ${address}`, err)
      });
    }
  }
  async componentDidMount() {
    const web3 = await getWeb3();
    const networkId = await web3.eth.net.getId();
    const account = await web3.eth.getAccounts();

    this.setState({ web3, networkId, account });
    console.log(networkId);

    this.getProfile(this.state.addresses[0]);
    this.getProfile(this.state.addresses[1]);
  }

  async handleContribution(evt) {
    evt.preventDefault();
    console.log("Value to send: ", this.state.contributionAmount);

    const txReceipt = await this.state.web3.eth.sendTransaction({
      to: TO_ADDRESS,
      from: `${this.state.account}`,
      value: this.state.web3.utils.toWei(
        `${this.state.contributionAmount}`,
        "ether"
      )
    });

    this.setState({ txReceipt });
  }

  handleChange(value, key) {
    this.setState({ [key]: value });
  }

  render() {
    const { addresses, profiles, error } = this.state;
    return (
      <div>
        <Header />
        <div className="top-wrapper">
          <div className="image-wrapper">
            <img className="coimg" src={Test} />
          </div>
          <div className="card-wrapper">
            <p className="funding-status">Open</p>
            <p className="campaign-title">
              Rocky Mountain National Park Commons
            </p>
            <p className="subtitle">
              Keep our parks funded during the government shutdown!
            </p>
            <span className="goal">
              <b>$30,000 USD raised</b>
            </span>
            <Line
              percent={Math.floor((30000 / 50000) * 100)}
              strokeWidth="4"
              strokeColor="#000072"
            />
            <span className="remaining">2 months left</span>
            <div className="owners">
              {profiles.hasOwnProperty(addresses[0]) &&
                Object.keys(profiles).map(owner => (
                  <a
                    href={`https://3box.io/${owner}`}
                    key={owner}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Avatar
                      round={true}
                      name={profiles[owner].name}
                      src={`https://ipfs.io/ipfs/${
                        profiles[owner].image[0].contentUrl["/"]
                      }`}
                    />
                  </a>
                ))}
            </div>
            <Card>
              <Contribution>
                <StyledInput
                  id=""
                  label="DAI"
                  onChange={evt =>
                    this.handleChange(evt.target.value, "contributionAmount")
                  }
                />
              </Contribution>
              <ContributeButton>
                <Button onClick={this.handleContribution}>Contribute</Button>
              </ContributeButton>
            </Card>
          </div>
        </div>
        <p className="our-projects">Our Projects</p>
        <div className="giveth-container">
          <iframe
            width={"100%"}
            height={1000}
            src="https://develop.giveth.io"
          />
        </div>
      </div>
    );
  }
}

export default Campaign;
// https://develop.giveth.io/dacs/5c68b37a6086062bbd85beaf
