import styled from 'styled-components'

export const StyleWrapper = styled.div`
  &>.content {
    display: flex;
    background: url(${require(`@/assets/img/wrap-bg.png`).default}) repeat-y;
    background-color: #fff;

    &>.left {
      position: relative;
      padding: 37px 30px 40px 39px;
      width: 710px;
    }

    &>.right {
      padding: 20px 40px 40px 30px;
      width: 270px;

      .cpn-simi-songsheet {
        margin-bottom: 40px;
      }
    }
  }
`
