import styled from 'styled-components'

export const StyledMask = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 47px;
`

export const StyledWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 982px;
  height: 301px;
  transform: translateX(-50%);
`

export const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 260px;
  background: url(${require('@/assets/img/playpanel_bg.png').default}) repeat-y;
  background-position: -1016px 0;
`

export const StyledLeft = styled.div`
  position: relative;
  padding-right: 6px;
  width: 556px;
  height: 100%;

  .scroll-bar {
    position: absolute;
    right: 0;
    top: 0;
  }
`

export const StyledRight = styled.div`
  position: relative;
  flex: 1;
  padding: 21px 41px 21px 35px;
  height: 100%;

  .scroll-bar {
    position: absolute;
    right: 0;
    top: 0;
  }
`
