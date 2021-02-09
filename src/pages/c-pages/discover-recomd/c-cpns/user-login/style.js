import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 22px;
  height: 126px;
  background-position: 0 0;

  p {
    line-height: 25px;
  }

  span {
    display: inline-block;
    margin-top: 10px;
    width: 100px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    text-decoration: none;
    text-shadow: 0 1px 0 #8a060b;
    color: #fff;
    background-position: 0 -195px;
    cursor: pointer;

    :hover {
      background-position: -110px -195px;
    }
  }
`
