<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-simple-table fixed-header height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Last Activity</th>
                  <th class="text-left">Date and Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in desserts" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.calories }}</td>
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
export default {
  name: "UserLogsComponent",
  data() {
    return {
      desserts: [
        {
          name: "Updated user details",
          calories: "2 mins ago",
        },
        {
          name: "Changed password",
          calories: "3 mins ago",
        },
        {
          name: "updated Property for sale",
          calories: "1 day ago",
        },
        {
          name: "Cancelled buyer request",
          calories: "3rd July 2021 11:59 Am",
        },
        {
          name: "Contacted Stanbic properties",
          calories: "3rd July 2021 11:59 Am",
        },
        {
          name: "Updated property Location",
          calories: "3rd July 2021 11:56 Am",
        },
        {
          name: "Updated property Location",
          calories: "3rd July 2021 11:52 Am",
        },
        {
          name: "Updated property Location",
          calories: "3rd July 2021 11:50 Am",
        },
        {
          name: "Updated property Location",
          calories: "3rd July 2021 11:44 Am",
        },
        {
          name: "Updated property price",
          calories: "3rd July 2021 11:40 Am",
        },
      ],
    };
  },
};
</script>