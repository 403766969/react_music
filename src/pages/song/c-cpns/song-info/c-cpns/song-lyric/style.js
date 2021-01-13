import styled from 'styled-components'

export const StyledWrapper = styled.div`
  padding: 30px 0 50px;

  .content {
    p {
      height: 23px;
      line-height: 23px;
      font-size: 12px;
      color: #333;
    }
  }

  .control {
    margin-top: 5px;

    button {
      position: relative;
      margin: 0;
      padding: 0;
      height: 23px;
      line-height: 23px;
      font-size: 12px;
      color: #0c73c2;
      background-color: transparent;
      cursor: pointer;


      i {
        position: absolute;
        right: -13px;
        top: 50%;
        width: 11px;
        height: 8px;
        background-position: ${props => props.isFold ? '-65px' : '-45px'} -520px;
        transform: translateY(-50%);
      }
    }
  }
`
