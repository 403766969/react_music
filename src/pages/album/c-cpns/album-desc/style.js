import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .title {
    margin-top: 35px;
    font-size: 12px;
    font-weight: bold;
    color: #333;
  }

  .desc, .fold {
    min-height: 24px;
    line-height: 24px;
    color: #666;
  }

  .desc {
    margin-top: 4px;
    text-indent: 2em;
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
