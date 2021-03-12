import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.mv-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    
    &>.cpn-mv-item {
      margin: 0 0 40px 26px;

      &:nth-child(5n+1) {
        margin-left: 0;
      }
    }
  }

  &>.footer {
    padding: 15px 0;
  }
`
