<template>
  <div :class="icon"></div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    }
  },
}
</script>


<style>
  .wpp {
    content: url('https://api.iconify.design/mdi/whatsapp.svg?color=white');
  }

  .insta {
    content: url('https://api.iconify.design/akar-icons/instagram-fill.svg?color=white');
  }

  .search {
    content: url('https://api.iconify.design/ant-design/search-outlined.svg?color=white');
  }

  .produtos {
    content: url('https://api.iconify.design/mdi-light/briefcase.svg?color=white');
  }

  .novidades {
    content: url('https://api.iconify.design/el/idea.svg?color=white');
  }

  .sobre {
    content: url('https://api.iconify.design/akar-icons/info.svg?color=white');
  }

  .contato {
    content: url('https://api.iconify.design/ant-design/message-outlined.svg?color=white');
  }

  .login {
    content: url('https://api.iconify.design/carbon/login.svg?color=white');
  }

  .loginPreto {
    content: url('https://api.iconify.design/carbon/login.svg?color=black');
  }

  .conta {
    content: url('https://api.iconify.design/codicon/account.svg?color=white');
  }

  .linkedin {
    content: url('https://api.iconify.design/logos/linkedin-icon.svg?color=%23069');
  }

  .pagamento {
    content: url('https://api.iconify.design/icon-park-outline/bank-transfer.svg?color=white');
  }

  .entrega {
    content: url('https://api.iconify.design/carbon/delivery-parcel.svg?color=white');
  }

  .close {
    content: url('https://api.iconify.design/ep/close.svg?color=white');
  }

  .info {
    content: url('https://api.iconify.design/bx/bx-error-circle.svg?color=white')
  }

  .error {
    content: url('https://api.iconify.design/carbon/error.svg?color=white');
  }

  .warning {
    content: url('https://api.iconify.design/bx/bxs-error.svg?color=white');
  }

  .success {
    content: url('https://api.iconify.design/clarity/success-standard-solid.svg?color=white');
  }

  .home {
    content: url('https://api.iconify.design/ant-design/home-filled.svg?color=white');
  }

  .destaque {
    content: url('https://api.iconify.design/akar-icons/star.svg?color=black');
  }

  .editar {
    content: url('https://api.iconify.design/akar-icons/edit.svg?color=black');
  }

  .apagar {
    content: url('https://api.iconify.design/ant-design/delete-filled.svg?color=%23dd6161');
  }
</style>
