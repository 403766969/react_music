import styled from 'styled-components'

export const StyledWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 47px;
  width: 982px;
  height: 301px;
  transform: translateX(-50%);
`

export const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 260px;
  background: url(${require('@/assets/img/playpanel_bg.png').default}) repeat-y;
  background-position: -1016px 0;
`

export const StyledLeft = styled.div`
  width: 556px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const StyledRight = styled.div`
  flex: 1;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`
