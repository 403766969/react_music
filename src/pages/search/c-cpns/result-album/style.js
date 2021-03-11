import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.album-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    
    &>.cpn-album-item {
      margin: 0 0 30px 33px;

      &:nth-child(5n+1) {
        margin-left: 0;
      }
    }
  }

  &>.footer {
    padding: 15px 0;
  }
`
