import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .brief, .intro {
    h2 {
      margin: 28px 0 8px 0;
      font-size: 14px;
      font-weight: bold;
      color: #333;
    }

    p {
      line-height: 25px;
      color: #666;
    }
  }

  .brief{
    h2 {
      padding-left: 7px;
      border-left: 4px solid #c10d0c;
    }

    p {
      text-indent: 2em;
    }
  }
`
