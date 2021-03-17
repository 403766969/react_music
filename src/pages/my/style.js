import styled from 'styled-components'

export const StyledWrapper = styled.div`
  height: 700px;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;

  .bg {
    position: relative;
    width: 807px;
    height: 268px;
    margin: 0 auto;
    padding-top: 104px;
    background: url(${require('@/assets/img/mymusic.png').default}) 0 104px no-repeat;
    box-sizing: content-box;

    .login {
      display: block;
      position: absolute;
      bottom: 21px;
      right: 158px;
      width: 167px;
      height: 45px;
      text-indent: -9999px;
      background: url(${require('@/assets/img/mymusic.png').default}) 0 -9999px no-repeat;
      cursor: pointer;

      &:hover {
        background-position: 0 -278px;
      }
    }
  }
`
