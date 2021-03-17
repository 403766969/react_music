import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .image {
    width: 270px;
    height: 112px;
    background: url(${require('@/assets/img/logo.png').default}) 0 -405px no-repeat;
  }

  .text {
    margin-top: 35px;
    font-size: 18px;
    font-family: "Microsoft Yahei";
    color: #666;
  }
`
