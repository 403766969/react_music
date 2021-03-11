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

  .desc, .fold {
    min-height: 18px;
    line-height: 18px;
    color: #666;
  }

  .desc {
    overflow: hidden;
  }

  .fold {
    position: relative;

    .control {
      position: absolute;
      right: 0;
      top: 50%;
      margin: 0;
      padding: 0 13px 0 0;
      font-size: inherit;
      color: #0c73c2;
      background-color: transparent;
      transform: translateY(-50%);
      cursor: pointer;

      i {
        position: absolute;
        right: 0;
        top: 50%;
        width: 11px;
        height: 8px;
        background-position: ${props => props.isFold ? '-65px' : '-45px'} -520px;
        transform: translateY(-50%);
      }
    }    
  }
`
