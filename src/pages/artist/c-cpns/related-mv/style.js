import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.mv-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .mv-item {
      width: 137px;
      margin: 0 0 25px 30px;

      &:nth-child(4n+1){
        margin-left: 0;
      }
    }
  }

  &>.footer {
    padding: 15px 0;
  }
`
