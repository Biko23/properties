<template>
  <div>
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
  computed: {
    ...mapGetters(["getCurrentUserAuditLogs"])
  },
  methods: {
    ...mapActions(["getAUserLog"]),
  },
  created() {
    this.getAUserLog();
  },
};
</script>