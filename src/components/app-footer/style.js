import styled from 'styled-components'

export const StyledWrapper = styled.div`
  padding-bottom: 45px;
  color: #666;
  background-color: #f2f2f2;
  border-top: 1px solid #d3d3d3;

  &>.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
  }

  &>.content .left {
    line-height: 24px;
    font-size: 12px;

    a{
      color: #666;
    }

    a:hover {
      text-decoration: underline;
    }

    .link {
      a {
        color: #999;
      }
      .line {
        margin: 0 10px;
        color: #999;
      }
    }

    .copyright {
      span {
        margin-right: 15px;
      }
    }
  }

  &>.content .right {
    display: flex;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 40px;

      .link {
        display: block;
        width: 50px;
        height: 45px;
        background-image: url(${require('@/assets/img/sprite_footer_02.png').default});
        background-size: 110px 450px;
      }

      :nth-child(1) .link {
        background-position: -60px -101px;
      }

      :nth-child(2) .link {
        background-position: 0 0;
      }

      :nth-child(3) .link {
        background-position: -60px -50px;
      }

      :nth-child(4) .link {
        background-position: 0 -101px;
      }

      .title {
        margin-top: 5px;
        display: block;
        width: 52px;
        height: 10px;
        background-image: url(${require('@/assets/img/sprite_footer_01.png').default});
        background-size: 180px 100px;
      }

      :nth-child(1) .title {
        background-position: -0px -90px;
      }

      :nth-child(2) .title {
        background-position: 0 0;
        margin-top: 7px;
      }

      :nth-child(3) .title {
        background-position: 1px -54px;
        margin-top: 6px;
      }
      
      :nth-child(4) .title {
        background-position: -1px -72px;
        margin-top: 6px;
      }
    }
  }
`
