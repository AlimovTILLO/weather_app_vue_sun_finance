<template>
  <div>
    <button type="button" @click="getLocation">Share my Location</button>
    <pre> {{ title }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DataService from "../services/DataService";

@Component
export default class Weather extends Vue {
  private tutorials: any[] = [];
  private currentTutorial: any = null;
  private currentIndex: number = -1;
  private title: string = "";

  setActiveTutorial(tutorial: any, index: number) {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  getLocation() {
    console.log("getLocation Called");
    var bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        bdcApi =
          bdcApi +
          "?latitude=" +
          position.coords.latitude +
          "&longitude=" +
          position.coords.longitude +
          "&localityLanguage=en";
        DataService.request("GET", bdcApi)
          .then((response: any) => {
            this.title = response.target.responseText;
            console.log("response:", response.target.response);
          })
          .catch((e: any) => {
            console.log(e);
          });
      },
      (err) => {
        DataService.request("GET", bdcApi);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  mounted() {
    this.getLocation();
  }
}
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>