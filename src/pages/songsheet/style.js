import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.content {
    display: flex;
    background: url(${require(`@/assets/img/wrap-bg.png`).default}) repeat-y;
    background-color: #fff;

    &>.left {
      position: relative;
      padding: 47px 30px 40px 40px;
      width: 710px;

      .cpn-songsheet-detail {
        margin-bottom: 27px;
      }

      .cpn-song-area {
        margin-bottom: 40px;
      }
    }

    &>.right {
      padding: 20px 40px 40px 30px;
      width: 270px;

      .cpn-simi-user {
        margin-bottom: 25px;
      }

      .cpn-simi-songsheet {
        margin-bottom: 25px;
      }
    }
  }
`
