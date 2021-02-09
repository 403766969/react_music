import styled from 'styled-components'

export const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &>.content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
`
