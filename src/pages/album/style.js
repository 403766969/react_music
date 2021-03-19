import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  background: url(${require(`@/assets/img/wrap-bg.png`).default}) repeat-y;
  background-color: #fff;
  padding: 0 1px;

  &>.left {
    position: relative;
    padding: 47px 30px 40px 40px;
    width: 709px;

    .cpn-song-area {
      margin: 27px 0 40px 0;
    }
  }

  &>.right {
    flex: 1;
    margin-left: 1px;
    padding: 20px 40px 40px 30px;
    width: 0;

    .cpn-simi-album {
      margin-bottom: 25px;
    }
  }
`
