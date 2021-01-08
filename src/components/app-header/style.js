import styled from 'styled-components'

export const StyledWrapper = styled.div`
  height: 75px;
  font-size: 14px;
  background-color: #242424;

  .content {
    display: flex;
    justify-content: space-between;
    height: 70px;
  }

  .divider {
    height: 5px;
    background-color: #C20C0C;
  }
`

export const StyledLeft = styled.div`
  display: flex;

  .logo {
    background-position: 0 0;

    a {
      display: block;
      width: 176px;
      height: 70px;
      text-indent: -9999px;
    }
  }

  .channel-menu {
    display: flex;

    .channel-item a{
      position: relative;
      display: block;
      padding: 0 19px;
      height: 70px;
      line-height: 70px;
      color: #ccc;
      text-decoration: none;

      &:hover, &.active {
        background: #000;
        color: #fff;
      }

      &.active::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0px;
        width: 0px;
        height: 0px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 5px solid transparent;
        border-bottom: 5px solid #C20C0C;
        transform: translateX(-50%);
      }
    }

    .channel-item:last-of-type a::after {
      content: "";
      position: absolute;
      right: -20px;
      top: 21px;
      width: 28px;
      height: 19px;
      background-image: url(${require("@/assets/img/sprite_01.png").default});
      background-position: -190px 0;
    }
  }
`
export const StyledRight = styled.div`
  display: flex;
  align-items: center;

  .search {
    width: 158px;
    height: 32px;
    border: none;
    border-radius: 16px;

    input {
      font-size: 12px;
      color: #333;

      &::placeholder {
        font-size: 12px;
        color: #9b9b9b;
      }
    }
  }

  a {
    font-size: 12px;
    text-decoration: none;
  }
  
  .creator-center {
    margin: 0 20px 0 12px;
    width: 90px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #4F4F4F;
    border-radius: 16px;
    cursor: pointer;

    &:hover{
      border-color: #ccc;
    }

    a {
      color: #ccc;
    }
  }

  .login{
    margin-right: 26px;

    a {
      color: #787878;
    }
    
    a:hover {
      color: #999;
    }
  }
`
