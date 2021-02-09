import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.content {
    display: flex;
    margin-bottom: 30px;
    height: 472px;
    background-image: url(${require('@/assets/img/recommend-top-bg.png').default});
  }
`
