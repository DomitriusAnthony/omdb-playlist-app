import React, { Component } from "react";
import styled from "styled-components";

const MainDivContainer = styled.div`
  width: 100%;
  height: 100%;
`;

class Main extends Component {
  render() {
    const { DefaultComponent } = this.props;
    return (
      <MainDivContainer>
        {!DefaultComponent ? (
          <p>No Default Component provided. Check Routes to add one</p>
        ) : (
          <DefaultComponent />
        )}
      </MainDivContainer>
    );
  }
}

export default Main;
