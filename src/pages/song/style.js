import styled from 'styled-components'

export const StyleWrapper = styled.div`
  &>.content {
    display: flex;
    background: url(${require(`@/assets/img/wrap-bg.png`).default}) repeat-y;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;

    &>.left {
      position: relative;
      padding: 37px 30px 40px 40px;
      width: 709px;
    }

    &>.right {
      flex: 1;
      padding: 20px 40px 40px 30px;
      width: 0;

      .cpn-simi-songsheet {
        margin-bottom: 40px;
      }

      .cpn-simi-song {
        margin-bottom: 25px;
      }
    }
  }
`
