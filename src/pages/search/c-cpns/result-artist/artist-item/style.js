import styled from 'styled-components'

export const StyledWrapper = styled.li`
  width: 130px;

  .cover {
    position: relative;
    width: 130px;
    height: 130px;

    img {
      width: 100%;
      height: 100%;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-position: 0 -680px;
    }
  }

  .desc {
    margin-top: 8px;

    .link {
      color: #000;
    }
  }
`
