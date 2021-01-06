import styled from 'styled-components'

export const StyleWrapper = styled.div`
  padding: 47px 30px 40px 39px;
`

export const StyleContent = styled.div`
  display: flex;
`

export const StyleLeft = styled.div`
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
`

export const StyleRight = styled.div`
  width: 414px;
  margin-left: 20px;

  .header {
    display: flex;
    align-items: center;
    i {
      display: inline-block;
      width: 54px;
      height: 24px;
      background-position: 0 -463px;
    }

    .title {
      margin-left: 10px;
      font-size: 24px;
      font-weight: 400;
    }
  }

  .singer, .album {
    margin: 10px;
    margin-left: 0px;
    color: #999;

    a {
      color: #0c73c2;
    }
  }

  .singer .name{
    &::after {
      content: "/"
    }
    
    &:last-of-type::after {
      content: ""
    }
  }
`
