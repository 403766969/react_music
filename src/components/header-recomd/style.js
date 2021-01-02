import styled from 'styled-components'

export const HeaderRecomdWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 4px 34px;
  height: 33px;
  background-position: -225px -156px;
  border-bottom: 2px solid #C10D0C;
`

export const HeaderRecomdLeft = styled.div`
  display: flex;
  align-items: center;

  .title {
    margin-right: 20px;
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
    font-size: 20px;
  }

  .keyword {
    display: flex;
    .item {
      .divider {
        margin: 0 13px;
        color: #ccc;
      }
      &:last-of-type .divider {
        display: none;
      }
    }
  }

`
export const HeaderRecomdRight = styled.div`
  display: flex;
  align-items: center;

  .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 4px;
    background-position: 0 -240px;
  }
`
