import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.content {
    display: flex;
    background: url(${require(`@/assets/img/wrap-bg.png`).default}) repeat-y;
    background-color: #fff;
    padding: 0 1px;

    &>.left {
      position: relative;
      padding: 25px 30px 40px 40px;
      width: 709px;

      .mv-comment {
        margin-top: 45px;
      }
    }

    &>.right {
      flex: 1;
      margin-left: 1px;
      padding: 20px 40px 40px 30px;
      width: 0;

      .cpn-mv-desc {
        margin-bottom: 34px;
      }

      .cpn-simi-mv {
        margin-bottom: 25px;
      }
    }
  }
`
