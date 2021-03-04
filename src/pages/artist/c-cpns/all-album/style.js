import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.album-list {
    display: flex;
    flex-wrap: wrap;

    .album-item {
      width: 145px;
      margin: 0 0 18px 20px;

      &:nth-child(4n+1){
        margin-left: 0;
      }

      .cpn-album-cover {
        .top-cover {
          margin-bottom: 8px;
        }

        .bottom-desc {
          .name {
            margin-bottom: 3px;
            max-height: 38px;
            line-height: 19px;
            font-size: 14px;
            white-space: normal;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }

  &>.footer {
    padding: 15px 0;
  }
`
