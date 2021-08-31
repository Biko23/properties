<template>
  <div>
    <ShareNetwork
      v-for="network in networks"
      :network="network.network"
      style="text-decoration: none"
      :key="network.name"
      :url="url"
      :title="sharing.title"
      :image="sharing.image"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
      :twitterUser="sharing.twitterUser"
    >
      <v-icon :color="network.color">{{ network.icon }}</v-icon>
    </ShareNetwork>
  </div>
</template>
<script>
export default {
    name: 'NetworkSharing',
    props: {
        url: {
            type: String,
            default: 'http://localhost:8080'
        }
    },
  data() {
    return {
      sharing: {
        title: "Stanbic properties Limited",
        description:
          "would like you to come and have a look at this property by Stanbic properties",
        image: require("../assets/logo.png"),
        quote: "An Ounce of action is better than 1000 words",
        hashtags: "SHUL",
        twitterUser: "isaacpro01",
      },
      networks: [
        {
          network: "email",
          name: "Email",
          icon: "mdi-email",
          color: "#333333",
          type: "popup",
        },
        {
          network: "facebook",
          name: "Facebook",
          icon: "mdi-facebook",
          color: "#1877f2",
          type: "popup",
        },
        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "mdi-linkedin",
          color: "#007bb5",
          type: "popup",
        },
        {
          network: "skype",
          name: "Skype",
          icon: "mdi-skype",
          color: "#00aff0",
          type: "popup",
        },
        {
          network: "telegram",
          name: "Telegram",
          icon: "mdi-telegram",
          color: "#0088cc",
          type: "popup",
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "mdi-twitter",
          color: "#1da1f2",
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "mdi-whatsapp",
          color: "#25d366",
          type: "popup",
        },
      ],
    };
  },
};
</script>