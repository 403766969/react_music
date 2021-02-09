import styled from 'styled-components'

export const StyledWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &>li {
    padding: 0 0 30px 50px;

    &:nth-child(5n+1) {
      padding-left: 0;
    }
  }
`
