import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .tags {
    margin-bottom: 5px;
    line-height: 25px;
    
    b {
      font-weight: normal;
      color: #666;
    }

    a {
      display: inline-block;
      margin-right: 9px;
      padding: 0 12px;
      height: 22px;
      line-height: 20px;
      text-decoration: none;
      background-color: #f5f5f5;
      border: 1px solid #d1d1d1;
      border-radius: 11px;

      &:hover {
        background-color: #fcfcfc;
      }
    }
  }

  .dec {
    overflow: hidden;

    p {
      min-height: 18px;
      line-height: 18px;
      color: #666;
    }
  }

  .ellipsis {
      line-height: 18px;
      color: #666;
  }

  .control {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;

    button {
      position: relative;
      margin-right: 15px;
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
