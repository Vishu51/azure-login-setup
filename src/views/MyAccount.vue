<template>
  <div>
    <!-- HEADER -->
    <div>
      <v-system-bar height="40" dark color="#3B517E">
        <div class="left-pad pt-2" white--text>
          <img
            width="90"
            src="@/assets/img/solum_logo_w.svg"
            alt="solum website"
          />
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex align-center">
          <div></div>
          <div
            style="padding-right: 90px !important"
            class="h_member drop-down"
          >
            <button
              type="button"
              @click.stop="toggleDropdown"
              id="profileButton"
              class="btn-dropdown"
            >
              <!-- <i class="" @click.stop="parentToggle">{{ getAccountGroup(user.name)}}</i> -->
              <i class="" @click.stop="parentToggle">{{ $t("My Account") }}</i>
            </button>
            <div class="drop-box">
              <div class="_member">
                <p class="name">{{ user.name }}</p>
                <p class="id">(ID : {{ displayUserId }})</p>
              </div>
              <div>
                <v-btn class="btn-logout" @click="onLogout" text width="100%">
                  {{ $t("Log out") }}
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-system-bar>
      <v-system-bar height="100" dark color="#00254D">
        <div class="left-pad" white--text>
          <img
            width="150"
            src="@/assets/img/AIMS_SaaS_logo.svg"
            alt="Aims_Saas_logo"
          />
          <p class="last-update">Last Updated: {{ lastUpdatedTime }}</p>
        </div>
        <v-spacer></v-spacer>
      </v-system-bar>
    </div>
    <!-- REFRESH SECTION -->
    <div class="d-flex">
      <v-row class="left-pad" style="padding-top: 31px">
        <v-col class="pl-0" cols="12" sm="4">
          <div class="custom-label-for-input">Refresh Every</div>
          <v-select
            v-model="selected"
            class="select-column"
            label=""
            :items="timeOptions"
            placeholder="Select Interval"
            item-text="text"
            item-value="value"
            @change="getSelected($event)"
            outlined
            dense
          >
          </v-select>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <div class="d-flex align-center right-pad">
        <div class="px-4">
          <span>
            <img
              class="pt-1 pr-2"
              src="@/assets/img/ic_good.svg"
              alt="active"
            />
          </span>
          <span class="status-text">Good</span>
        </div>
        <div class="px-4">
          <span>
            <img
              class="pt-1 pr-2"
              src="@/assets/img/ic_information.svg"
              alt="active"
            />
          </span>
          <span class="status-text">Information</span>
        </div>
        <div class="px-4">
          <span>
            <img
              class="pt-1 pr-2"
              src="@/assets/img/ic_Warning.svg"
              alt="active"
            />
          </span>
          <span class="status-text">Warning</span>
        </div>
        <div class="px-4">
          <span>
            <img
              class="pt-1 pr-2"
              src="@/assets/img/ic_Critical.svg"
              alt="active"
            />
          </span>
          <span class="status-text">Critical</span>
        </div>
        <div class="px-4">
          <span>
            <img class="pt-1 pr-2" src="@/assets/img/ic_N-A.svg" alt="active" />
          </span>
          <span class="status-text">N/A</span>
        </div>
      </div>
    </div>
    <!-- <v-btn @click="onLogout">Logout</v-btn> -->
    <!-- TABLE -->
    <div class="left-pad right-pad">
      <v-tabs v-model="selectedTab" left background-color="#00254d" dark>
        <!-- TAB HEADERS -->
        <v-tab disabled>
          <span style="color: white !important">CURRENT IMPACT</span>
        </v-tab>
        <v-tab v-for="tab in tabHeader" :key="tab" @click.stop="whichTab(tab)">
          {{ tab }}
        </v-tab>
        <!-- TAB HEADERS END-->

        <!-- TAB ITEMS SECTION START -->
        <!-- REQUIRED FOR CURRENT IMPACT DO NOT REMOVE IT -->
        <v-tab-item> </v-tab-item>
        <!-- AMERICA -->
        <v-tab-item>
          <v-simple-table fixed-header style="height: calc(100% - 10px)">
            <template v-slot:default>
              <thead height="79">
                <tr>
                  <th
                    colspan="7"
                    style="
                      background: #727787 0% 0% no-repeat padding-box;
                      color: #ffffff;
                      font: normal normal normal 17px Source Sans Pro;
                    "
                    class="text-left"
                  >
                    Product and Services
                  </th>
                  <th
                    colspan="7"
                    style="
                      background: #727787 0% 0% no-repeat padding-box;
                      color: #ffffff;
                      font: normal normal normal 17px Source Sans Pro;
                    "
                    class="text-left"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- SUB HEADING -->
                <tr>
                  <td class="subheader-row" colspan="14">
                    <h3>Databases Server</h3>
                  </td>
                </tr>
                <!-- LIST PS-SQL -->
                <tr v-for="(item, idx) in pgSql" :key="idx">
                  <td colspan="7">{{ getNames(`PostgreSQL ${item.name}`) }}</td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
                <!-- NO-SQL LIST -->
                <tr v-for="item in noSql" :key="item.name">
                  <td colspan="7">
                    {{ getNames(`MongoDB Atlas ${item.name}`) }}
                  </td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
                <!-- SUB HEADING -->
                <tr>
                  <td class="subheader-row" colspan="14">
                    <h3>Micro Services</h3>
                  </td>
                </tr>
                <!-- LIST MS -->
                <tr v-for="item in isMs" :key="item.name">
                  <td colspan="7">{{ getNames(item.name) }}</td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>
        <!-- EUROPE -->
        <v-tab-item>
          <v-simple-table fixed-header style="height: calc(100% - 10px)">
            <template v-slot:default>
              <thead height="79">
                <tr>
                  <th
                    colspan="7"
                    style="
                      background: #727787 0% 0% no-repeat padding-box;
                      color: #ffffff;
                      font: normal normal normal 17px Source Sans Pro;
                    "
                    class="text-left"
                  >
                    Product and Services
                  </th>
                  <th
                    colspan="7"
                    style="
                      background: #727787 0% 0% no-repeat padding-box;
                      color: #ffffff;
                      font: normal normal normal 17px Source Sans Pro;
                    "
                    class="text-left"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- SUB HEADING -->
                <tr>
                  <td class="subheader-row" colspan="14">
                    <h3>Databases Server</h3>
                  </td>
                </tr>
                <!-- LIST PS-SQL -->
                <tr v-for="(item, idx) in pgSql" :key="idx">
                  <td colspan="7">{{ getNames(`PostgreSQL ${item.name}`) }}</td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
                <!-- NO-SQL LIST -->
                <tr v-for="item in noSql" :key="item.name">
                  <td colspan="7">
                    {{ getNames(`MongoDB Atlas ${item.name}`) }}
                  </td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
                <!-- SUB HEADING -->
                <tr>
                  <td class="subheader-row" colspan="14">
                    <h3>Micro Services</h3>
                  </td>
                </tr>
                <!-- LIST MS -->
                <tr v-for="item in isMs" :key="item.name">
                  <td colspan="7">{{ getNames(item.name) }}</td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>
        <!-- ASIA -->
        <v-tab-item>
          <v-simple-table fixed-header style="height: calc(100% - 10px)">
            <template v-slot:default>
              <thead height="79">
                <tr>
                  <th
                    colspan="7"
                    style="
                      background: #727787 0% 0% no-repeat padding-box;
                      color: #ffffff;
                      font: normal normal normal 17px Source Sans Pro;
                    "
                    class="text-left"
                  >
                    Product and Services
                  </th>
                  <th
                    colspan="7"
                    style="
                      background: #727787 0% 0% no-repeat padding-box;
                      color: #ffffff;
                      font: normal normal normal 17px Source Sans Pro;
                    "
                    class="text-left"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- SUB HEADING -->
                <tr>
                  <td class="subheader-row" colspan="14">
                    <h3>Databases Server</h3>
                  </td>
                </tr>
                <!-- LIST PS-SQL -->
                <tr v-for="(item, idx) in pgSql" :key="idx">
                  <td colspan="7">{{ getNames(`PostgreSQL ${item.name}`) }}</td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
                <!-- NO-SQL LIST -->
                <tr v-for="item in noSql" :key="item.name">
                  <td colspan="7">
                    {{ getNames(`MongoDB Atlas ${item.name}`) }}
                  </td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
                <!-- SUB HEADING -->
                <tr>
                  <td class="subheader-row" colspan="14">
                    <h3>Micro Services</h3>
                  </td>
                </tr>
                <!-- LIST MS -->
                <tr v-for="item in isMs" :key="item.name">
                  <td colspan="7">{{ getNames(item.name) }}</td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>
        <!-- STAGE -->
        <v-tab-item>
          <v-simple-table fixed-header style="height: calc(100% - 10px)">
            <template v-slot:default>
              <thead height="79">
                <tr>
                  <th
                    colspan="7"
                    style="
                      background: #727787 0% 0% no-repeat padding-box;
                      color: #ffffff;
                      font: normal normal normal 17px Source Sans Pro;
                    "
                    class="text-left"
                  >
                    Product and Services
                  </th>
                  <th
                    colspan="7"
                    style="
                      background: #727787 0% 0% no-repeat padding-box;
                      color: #ffffff;
                      font: normal normal normal 17px Source Sans Pro;
                    "
                    class="text-left"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- SUB HEADING -->
                <tr>
                  <td class="subheader-row" colspan="14">
                    <h3>Databases Server</h3>
                  </td>
                </tr>
                <!-- LIST PS-SQL -->
                <tr v-for="(item, idx) in pgSql" :key="idx">
                  <td colspan="7">{{ getNames(`PostgreSQL ${item.name}`) }}</td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
                <!-- NO-SQL LIST -->
                <tr v-for="item in noSql" :key="item.name">
                  <td colspan="7">
                    {{ getNames(`MongoDB Atlas ${item.name}`) }}
                  </td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
                <!-- SUB HEADING -->
                <tr>
                  <td class="subheader-row" colspan="14">
                    <h3>Micro Services</h3>
                  </td>
                </tr>
                <!-- LIST MS -->
                <tr v-for="item in isMs" :key="item.name">
                  <td colspan="7">{{ getNames(item.name) }}</td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>
        <!-- BIG VOLUME -->
        <v-tab-item>
          <v-simple-table fixed-header style="height: calc(100% - 10px)">
            <template v-slot:default>
              <thead height="79">
                <tr>
                  <th
                    colspan="7"
                    style="
                      background: #727787 0% 0% no-repeat padding-box;
                      color: #ffffff;
                      font: normal normal normal 17px Source Sans Pro;
                    "
                    class="text-left"
                  >
                    Product and Services
                  </th>
                  <th
                    colspan="7"
                    style="
                      background: #727787 0% 0% no-repeat padding-box;
                      color: #ffffff;
                      font: normal normal normal 17px Source Sans Pro;
                    "
                    class="text-left"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- SUB HEADING -->
                <tr>
                  <td class="subheader-row" colspan="14">
                    <h3>Databases Server</h3>
                  </td>
                </tr>
                <!-- LIST PS-SQL -->
                <tr v-for="(item, idx) in pgSql" :key="idx">
                  <td colspan="7">{{ getNames(`PostgreSQL ${item.name}`) }}</td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
                <!-- NO-SQL LIST -->
                <tr v-for="item in noSql" :key="item.name">
                  <td colspan="7">
                    {{ getNames(`MongoDB Atlas ${item.name}`) }}
                  </td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
                <!-- SUB HEADING -->
                <tr>
                  <td class="subheader-row" colspan="14">
                    <h3>Micro Services</h3>
                  </td>
                </tr>
                <!-- LIST MS -->
                <tr v-for="item in isMs" :key="item.name">
                  <td colspan="7">{{ getNames(item.name) }}</td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>
        <!-- STI -->
        <v-tab-item>
          <v-simple-table fixed-header style="height: calc(100% - 10px)">
            <template v-slot:default>
              <thead height="79">
                <tr>
                  <th
                    colspan="7"
                    style="
                      background: #727787 0% 0% no-repeat padding-box;
                      color: #ffffff;
                      font: normal normal normal 17px Source Sans Pro;
                    "
                    class="text-left"
                  >
                    Product and Services
                  </th>
                  <th
                    colspan="7"
                    style="
                      background: #727787 0% 0% no-repeat padding-box;
                      color: #ffffff;
                      font: normal normal normal 17px Source Sans Pro;
                    "
                    class="text-left"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- SUB HEADING -->
                <tr>
                  <td class="subheader-row" colspan="14">
                    <h3>Databases Server</h3>
                  </td>
                </tr>
                <!-- LIST PS-SQL -->
                <tr v-for="(item, idx) in pgSql" :key="idx">
                  <td colspan="7">{{ getNames(`PostgreSQL ${item.name}`) }}</td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
                <!-- NO-SQL LIST -->
                <tr v-for="item in noSql" :key="item.name">
                  <td colspan="7">
                    {{ getNames(`MongoDB Atlas ${item.name}`) }}
                  </td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
                <!-- SUB HEADING -->
                <tr>
                  <td class="subheader-row" colspan="14">
                    <h3>Micro Services</h3>
                  </td>
                </tr>
                <!-- LIST MS -->
                <tr v-for="item in isMs" :key="item.name">
                  <td colspan="7">{{ getNames(item.name) }}</td>
                  <td colspan="7">
                    <img :src="getSignal(item.status)" alt="active" />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>

        <!-- TAB ITEMS SECTION END -->
      </v-tabs>
    </div>
    <!-- FOOTER -->
    <div class="left-pad right-pad">
      <v-divider></v-divider>
      <v-footer>
        <v-row class="d-flex mt-4">
          <v-col class="d-flex mt-3">
            <p @click="gotoLink('Feedback')" class="pl-0 footer-text">
              Feedback
            </p>
            <p @click="gotoLink('Trademarks')" class="footer-text">
              Trademarks
            </p>
            <p
              @click="gotoLink('PrivacyCookies')"
              style="cursor: pointer"
              class="footer-text"
            >
              Privacy & Cookies
            </p>
            <p @click="gotoLink('TermsOfUse')" class="footer-text">
              Terms of use
            </p>
          </v-col>
          <v-spacer></v-spacer>
          <div>
            <img
              style="margin-left: 185px"
              width="80"
              src="@/assets/img/solum_logo_b.svg"
              alt="solum website"
            />
            <p class="footer-text">
              Copyright @ 2023 SOLUM, All Rights reserved.
            </p>
          </div>
        </v-row>
      </v-footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import store from '@/store'
import { cloudLogout } from '@/adLogin/authPopup'
export default {
  name: 'MyAccount',
  components: {},
  data () {
    return {
      selected: 2,
      pgSql: [],
      noSql: [],
      isMs: [],
      hostUrl: '',
      serverList: {},
      selectedTab: 1,
      tabHeader: [],
      setInterval: 0,
      lastUpdatedTime: '',
      user: {},
      displayUserId: ''
    }
  },
  computed: {
    timeOptions () {
      return [
        { text: '2 minutes', value: 2 },
        { text: '5 minutes', value: 5 },
        { text: '10 minutes', value: 10 },
        { text: '30 minutes', value: 30 }
      ]
    }
  },
  watch: {},
  async mounted () {
    clearInterval(this.setInterval)
    const getServer = await fetch(process.env.BASE_URL + 'server_list.json')
    this.serverList = await getServer.json()
    this.tabHeader = await Object.keys(this.serverList)
    this.getSelected(2)
    this.getUserInfo()
  },
  beforeDestroy () {
    clearInterval(this.setInterval)
  },
  methods: {
    // Logout
    async onLogout () {
      const account = await this.$msal.getAccountByHomeId(
        store.state.auth.tokenAPI.homeAccountId
      )
      const logoutRequest = {
        account: account
      }
      this.$msal.logoutRedirect(logoutRequest)
      if (this.$store.state.auth.tokenAPI) {
        this.processCloudLogout()
      }
    },
    processCloudLogout () {
      const uniqueId = this.$store.state.auth.tokenAPI.uniqueId
      this.$store
        .dispatch('auth/logout')
        .then((res) => {
          cloudLogout(uniqueId)
          this.$store.dispatch('dataStore/CLEAN')
        })
        .catch((error) => {
          this.$store.dispatch('dataStore/CLEAN')
          this.loading = false
          this.message = error.message
        })
    },
    getAccountGroup (accountGroup) {
      let userRole = ''
      if (accountGroup) {
        const arr = accountGroup.split(' ')
        for (var i = 0; i < arr.length; i++) {
          userRole = userRole + arr[i].charAt(0).toUpperCase()
        }
      }
      return userRole || ''
    },
    toggleDropdown (event) {
      event.target.classList.toggle('isOpenend')
      document.addEventListener('click', function (e) {
        if (e.target !== event.target) {
          event.target.classList.remove('isOpenend')
        }
      })
    },
    parentToggle (event) {
      event.target.parentNode.classList.toggle('isOpenend')
      document.addEventListener('click', function (e) {
        if (e.target.parentNode !== event.target.parentNode) {
          event.target.parentNode.classList.remove('isOpenend')
        }
      })
    },
    getUserInfo () {
      setTimeout(() => {
        this.user = JSON.parse(
          atob(this.$store.state.auth.tokenAPI.accessToken.split('.')[1])
        )
        this.displayUserId = this.user.emails[0]
      }, 500)
    },
    // OPEN FOOTER LINKS
    gotoLink (type) {
      if (type === 'Feedback') {
      }
      if (type === 'Trademarks') {
      }
      if (type === 'PrivacyCookies') {
        window.open('https://www.solumesl.com/en/privacy-policy', '_blank')
      }
      if (type === 'TermsOfUse') {
      }
    },

    // FUNCTION TO GET COUNTDOWN TIME BASED ON DIFFERENT TIME OPTIONS
    getSelected (val) {
      const duration = val * 60 * 1000 || 10000
      this.whichTab(this.tabHeader[this.selectedTab - 1])
      clearInterval(this.setInterval)
      this.setInterval = setInterval(() => {
        this.whichTab(this.tabHeader[this.selectedTab - 1])
      }, duration)
    },

    // FUNCTION TO GET ICONS BASED ON THE BOOLEAN VALUE
    getSignal (item) {
      if (item === 1) {
        return require('../assets/img/ic_good.svg')
      } else {
        return require('../assets/img/ic_Critical.svg')
      }
    },

    // CUSTOMIZE NAME FUNCTION
    getNames (name) {
      if (name) {
        if (name === 'PostgreSQL primary-1') {
          return 'PostgreSQL Primary-1'
        }
        if (name === 'MongoDB Atlas primary-1') {
          return 'MongoDB Atlas Primary-1'
        }
        if (name === 'api') {
          return 'API Service'
        }
        if (name === 'ig') {
          return 'Image Generator'
        }
        if (name === 'inbound') {
          return 'Inbound'
        }
        if (name === 'outbound') {
          return 'Outbound'
        }
        if (name === 'realtime') {
          return 'Real Time'
        }
        if (name === 'scheduler') {
          return 'Scheduler'
        }
      } else {
        return name
      }
    },

    // FUNCTION TO EXTRACT PROPERTIES FROM THE OBJECT
    extractNestedProperty (obj, propertyPath) {
      const properties = propertyPath.split('.')
      let value = obj

      for (const prop of properties) {
        if (value && value.hasOwnProperty.call(prop)) {
          value = value[prop]
        } else {
          return undefined
        }
      }

      return value
    },

    // ###### get STATUS DATA #####
    // @@@@ API URL: 'api/v1/status'
    async getAccountStatus () {
      this.lastUpdatedTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      axios
        .get(`${this.hostUrl}api/v1/status`, {})
        .then((res) => {
          if (res.data) {
            this.pgSql = this.extractNestedProperty(res.data.db, 'pgsql')
            this.noSql = this.extractNestedProperty(res.data.db, 'nosql')
            this.isMs = res.data.ms.map((obj) => {
              return {
                name: obj.name,
                status: obj.status
              }
            })
          } else {
            this.pgSql = []
            this.noSql = []
            this.isMs = []
          }
        })
        .catch((ex) => {
          console.log('ERROR!! ', ex)
          clearInterval(this.setInterval)
        })
    },

    // FUNCTION TO CALL API BASED ON THE TAB SELECTED
    async whichTab (tabName) {
      if (tabName === 'AMERICAS') {
        this.hostUrl = this.serverList.AMERICAS
      } else if (tabName === 'EUROPE') {
        this.hostUrl = this.serverList.EUROPE
      } else if (tabName === 'ASIA') {
        this.hostUrl = this.serverList.ASIA
      } else if (tabName === 'STAGE') {
        this.hostUrl = this.serverList.STAGE
      } else if (tabName === 'BIG VOLUME') {
        this.hostUrl = this.serverList['BIG VOLUME']
      } else if (tabName === 'STI') {
        this.hostUrl = this.serverList.STI
      }
      this.getAccountStatus()
    }
  }
}
</script>

<style scoped>
.theme--dark.v-system-bar {
  color: #fff;
}
.header-texts {
  background: #ffffff 0% 0% no-repeat padding-box;
  font: normal normal normal 15px/19px Source Sans Pro;
  letter-spacing: 0px;
}
.last-update {
  width: 216px;
  height: 19px;
  padding-top: 12px;
  text-align: center;
  font: normal normal normal 15px/19px Source Sans Pro;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.status-text {
  width: 34px;
  height: 19px;
  text-align: right;
  font: normal normal normal 15px/19px Source Sans Pro;
  letter-spacing: 0px;
  color: #00254d;
  opacity: 1;
}
.left-pad {
  margin-left: 135px !important;
}
.right-pad {
  margin-right: 135px !important;
}
.subheader-row {
  background-color: #d7daed;
  text-align: left;
  font: normal normal bold 13px/17px Source Sans Pro;
  letter-spacing: 0px;
  color: #00254d;
  text-transform: uppercase;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  width: 84px;
  height: 46px;
  text-align: left;
  font: normal normal normal 14px/18px Source Sans Pro;
  letter-spacing: 0px;
  color: #00254d;
  opacity: 1;
}
.v-tab--active {
  background: #3b517e 0% 0% no-repeat padding-box;
}

::v-deep.theme--light.v-footer {
  background-color: #ffffff !important;
}
.footer-text {
  color: #858585;
  padding-left: 12px;
  padding-right: 12px;
  font: normal normal normal 13px/17px Source Sans Pro;
  letter-spacing: 0.26px;
}
::v-deep.select-column::placeholder {
  color: white !important;
}
::v-deep.theme--light.v-select .v-select__selections {
  color: #ffffff !important;
}
::v-deep.v-data-table--fixed-header > .v-data-table__wrapper {
  overflow-y: overlay;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid rgba(236, 236, 236, 0.2);
}

::v-deep.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:nth-child(odd)
  > td:not(.subheader-row) {
  background-color: #ececec33;
  /* border-bottom: thin solid #FBFBFB ; */
}
::v-deep.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:nth-child(odd)
  > td:not(.subheader-row) {
  border-bottom: thin solid #ececec;
}
.v-tab--disabled {
  opacity: 1.5;
}
</style>
