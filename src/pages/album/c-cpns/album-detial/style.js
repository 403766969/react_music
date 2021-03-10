import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;

  &>.left {
    flex: 1;
    position: relative;
    width: 0;

    .cover {
      img {
        width: 177px;
        height: 177px;
      }

      .mask {
        position: absolute;
        width: 209px;
        height: 177px;
        background-position: 0 -986px;
      }
    }
  }

  &>.content {
    width: 410px;

    &>.header {
      position: relative;
      margin-bottom: 17px;
      padding-left: 64px;
      font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;

      .icon-tag {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 54px;
        height: 24px;
        background-position: 0 -186px;
      }

      .title {
        line-height: 24px;
        font-size: 20px;
        font-weight: normal;
      }

      .alias {
        margin-top: 1px;
        line-height: 14px;
        font-size: 14px;
        color: #bababa;     
      }
    }

    &>.info {
      margin-top: 4px;
      line-height: 18px;
      color: #666;
    }

    &>.artist {
      .link {
        color: #0c73c2;
      }
    }

    &>.opertaion {
      margin-top: 20px;
    }
  }
`
