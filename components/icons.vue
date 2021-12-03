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

  .conta {
    content: url('https://api.iconify.design/codicon/account.svg?color=white');
  }

  .linkedin {
    content: url('https://api.iconify.design/logos/linkedin-icon.svg?color=%23069');
  }
</style>
