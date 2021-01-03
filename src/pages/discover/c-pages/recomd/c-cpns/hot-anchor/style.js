import styled from 'styled-components'

export const HotAnchorWrapper = styled.div`
  margin-bottom: 5px;
  padding: 20px 20px 0 20px;
`

export const HotAnchorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;

  h3 {
    font-size: 12px;
    font-weight: bold;
    color: #333;
  }
`

export const HotAnchorContent = styled.div`
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
`

export const HotAnchorFooter = styled.div`

`
