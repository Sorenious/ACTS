import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import Chat from "../../components/Chat";

class Introduction extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    return <Wrapper>
      <h1 className="title">Amazon Communications</h1>
      <div id="other">
        <Chat />
      </div>
    </Wrapper>
  }
}


export default Introduction;
