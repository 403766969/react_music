import styled from 'styled-components'

export const RankListWrapper = styled.div`
  flex: 1;
`

export const RankListHeader = styled.div`
  display: flex;
  margin: 20px 0 0 20px;
  height: 100px;

  .image {
    position: relative;
    width: 80px;
    height: 80px;

    img {
      width: 80px;
      height: 80px;
    }
  }

  .info {
    margin: 5px 0 0 10px;

    a {
      font-size: 14px;
      font-weight: 700;
      color: #333;
    }

    .btn {
      display: inline-block;
      margin: 8px 10px 0 0;
      width: 22px;
      height: 22px;
      text-indent: -9999px;
      cursor: pointer;
    }

    .play {
      background-position: -267px -205px;
      &:hover {
        background-position: -267px -235px;
      }
    }

    .favor {
      background-position: -300px -205px;
      &:hover {
        background-position: -300px -235px;
      }
    }
  }
  
`

export const RankListContent = styled.div`
  .list-item {
    display: flex;
    align-items: center;
    position: relative;
    height: 32px;

    &:nth-child(-n+3) .rank {
      color: #c10d0c;
    }

    .rank {
      margin-left: 10px;
      width: 35px;
      font-size: 16px;
      text-align: center;
      color: #666;
    }

    .info {
      display: flex;
      justify-content: space-between;
      width: 170px;
      height: 17px;
      line-height: 17px;
      font-size: 12px;
      color: #000;

      .name {
        flex: 1;
        color: #000;
      }

      .operate {
        display: none;
        width: 82px;

        .btn {
          margin-left: 7px;
          width: 17px;
          height: 17px;
          vertical-align: middle;
          cursor: pointer;
        }

        .play {
          background-position: -267px -268px;
          &:hover {
            background-position: -267px -288px;
          }
        }

        .addto {
          background-position: 2px -698px;
          &:hover {
            background-position: -20px -698px;
          }
        }

        .favor {
          background-position: -297px -268px;
          &:hover {
            background-position: -297px -288px;
          }
        }
      }
    }
    
    &:hover {
      .operate {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
`

export const RankListFooter = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  margin-right: 32px;
  justify-content: flex-end;

  a {
    color: #000;
  }
`
