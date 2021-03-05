import styled from 'styled-components'

export const StyledWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 420px;
  height: 40px;
  background-position: 0 0;

  .input {
    display: block;
    position: absolute;
    top: 50%;
    left: 20px;
    width: 320px;
    height: 17px;
    line-height: 17px;
    background-color: #fff;
    transform: translateY(-50%);
  }

  .search {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 40px;
    text-indent: -9999px;
    cursor: pointer;
  }

  .suggest {
    position: absolute;
    left: 0;
    top: 43px;
    z-index: 999;
    width: 420px;

    &:hover {
      display: block !important;
    }
  }
`
