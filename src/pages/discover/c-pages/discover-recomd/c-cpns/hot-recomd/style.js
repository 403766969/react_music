import styled from 'styled-components'

export const StyledWrapper = styled.div`
  margin-bottom: 35px;

  &>.content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &>li {
      margin-bottom: 30px;
      height: 204px;
    }
  }
`
