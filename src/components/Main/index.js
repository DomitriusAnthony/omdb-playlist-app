import React, { Component } from "react";
import styled from "styled-components";

const MainDivContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

class Main extends Component {
  render() {
    const { DefaultComponent } = this.props;
    return (
      <MainDivContainer>
        <DefaultComponent />
      </MainDivContainer>
    );
  }
}

export default Main;
