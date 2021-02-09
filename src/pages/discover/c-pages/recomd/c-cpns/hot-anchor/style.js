import styled from 'styled-components'

export const StyledWrapper = styled.div`
  margin-bottom: 5px;
  padding: 20px 20px 0 20px;

  .content {
    margin-top: 20px;

    .item {
      display: flex;
      margin-bottom: 10px;
      width: 210px;

      .image {
        img {
          width: 40px;
          height: 40px;
        }
      }

      .info {
        margin-left: 8px;
        width: 160px;
        .name {
          margin-top: 3px;
          color: #000;
        }

        .position {
          color: #666;
        }
      }
    }
  }
`
