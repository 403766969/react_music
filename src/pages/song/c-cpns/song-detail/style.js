import styled from 'styled-components'

export const StyleWrapper = styled.div`
  &>.content {
    display: flex;
  }

  &>.content>.left {
    width: 206px;

    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 198px;
      height: 198px;

      .cover {
        top: -4px;
        left: -4px;
        width: 206px;
        height: 205px;
        background-position: -140px -580px;
      }
    }

    .link {
      margin: 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-position: -34px -863px;
      }

      a {
        color: #0c73c2;
        text-decoration: underline;
      }
    }
  }

  &>.content>.right {
    width: 414px;
    margin-left: 20px;

    .header {
      position: relative;
      padding-left: 64px;
      
      i {
        display: block;
        position: absolute;
        top: 4px;
        left: 0;
        width: 54px;
        height: 24px;
        background-position: 0 -463px;
      }

      .title {
        line-height: 32px;
        font-size: 24px;
        font-weight: 400;
      }
    }

    .singer, .album {
      margin: 10px;
      margin-left: 0px;
      color: #999;
    }

    .singer {
      .cpn-artist-divide {
        color: #0c73c2;

        span {
          color: #333;
        }
      }
    }

    .album {
      .name {
        color: #0c73c2;
      }
    }
  }
`
