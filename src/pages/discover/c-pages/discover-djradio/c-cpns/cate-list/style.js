import styled from 'styled-components'

export const StyledWrapper = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .item {
    margin: 0 0 25px 33px;

    &:nth-child(9n+1) {
      margin-left: 0;
    }

    &.active {
      .link {
        background-position: -70px 0;

        .icon {
          background-position: -48px 0;
        }

        .text {
          color: #d35757;
        }
      }
    }

    .link {
      display: block;
      width: 70px;
      height: 70px;
      text-align: center;
      text-decoration: none;
      background-image: url(${require('@/assets/img/radio_bg.png').default});
      background-position: 0 9999px;
      background-repeat: no-repeat;
      cursor: pointer;

      &:hover{
        background-color: #f6f7f7;
        border-radius: 5px;
      }

      .icon {
        width: 48px;
        height: 48px;
        margin: 2px auto 0 auto;
        background-position: 0 0;
        background-repeat: no-repeat;
      }

      .text {
        color: #888;
      }
    }
  }

  .faq {
    .icon {
      background-image: url(${require('@/assets/img/radio_faq.png').default});
    }
  }

  .apply {
    .icon {
      background-image: url(${require('@/assets/img/radio_apply.png').default});
    }

    .text {
      color: #5ab5e7;
    }
  }
`
