import styled from 'styled-components'

export const StyledWrapper = styled.div`
 &>.content {
    display: flex;
    background: url(${require(`@/assets/img/wrap-bg.png`).default}) repeat-y;
    background-color: #fff;
    padding: 0 1px;

    &>.left {
      padding: 22px 30px 40px 39px;
      width: 709px;
    }

    &>.right {
      flex: 1;
      margin-left: 1px;
      padding: 20px 40px 40px 30px;
      width: 0;
    }
 }
`
