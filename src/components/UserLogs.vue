<template>
  <div>
    <base-dialog :message="message" :title="title" :dialogState="state">
      <template v-slot:button>
        <v-btn text @click="state = !state">close</v-btn>
      </template>
    </base-dialog>
    <v-container>
      <v-row>
        <v-col>
          <v-simple-table fixed-header height="480px" dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Activities</th>
                  <th class="text-left">When Executed</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(log, index) in getCurrentUserAuditLogs" :key="index">
                  <td>{{ log.activity }}</td>
                  <td>{{ log.when_created }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "UserLogsComponent",
  data: () => ({
        message: '',
        title: '',
        state: false
  }),
  computed: {
    ...mapGetters(["getCurrentUserAuditLogs"])
  },
  methods: {
    ...mapActions(["getAUserLog"]),
    defaultResponse(msg, heading, status) {
      this.message = msg
      this.title = heading
      this.state = status
      setTimeout(() => {
          this.message = ""
          this.title = ""
          this.state = false
      }, 2000);
    },
    async fetchUserLogs(){
      try {
        const response = await this.getAUserLog();
        if(response.data.status == 0){
          this.defaultResponse(response.data.message, 'Error', true);
        }
      } catch (error) {
        this.defaultResponse(error.message, 'Error', true);
      }
    }
  },
  created() {
    this.fetchUserLogs();
  },
};
</script>