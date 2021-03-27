<template>
  <div>
    <header class="full">
      <div class="box">
        <h1 class="h1">COM.</h1>
      </div>
    </header>

    <div class="explanation">
      <h2 class="main-title">What is COM.?</h2>
      <p class="text">Please share your favorite places.</p>
      <p class="text2">いいなと思った場所を気軽に共有できるアプリです。</p>
    </div>

    <div class="explanation">
      <h2 class="main-title">How to use?</h2>
      <p class="text">地図上でシェアしたい場所をクリックしてください。</p>
      <p class="text2">既存の投稿も地図上で確認できます。</p>
    </div>

    <div class="Googlemap">
      <!-- 座標の表示  -->
      <div
        style=" flex-direction:row; align-items:center; justify-content:space-between"
      >
        <div class="coordinates">
          <!-- 現在地の座標表示 -->
          <div>
            <h1>現在地:</h1>
            <p>
              {{ myCoordinates.lat }} Latitude,{{ myCoordinates.lng }} Longitude
            </p>
          </div>
          <div>
            <!-- マップ上の座標表示 -->
            <h1>Map coordinates:</h1>
            <p>
              {{ mapCoordinates.lat }} Latitude,{{ mapCoordinates.lng }}
              Longitude
            </p>
          </div>
        </div>
      </div>
      <!-- Google Mapの実装 -->
      <GmapMap
        :center="myCoordinates"
        :zoom="zoom"
        style="width:640px;height:360px; margin:32px auto;"
        ref="mapRef"
        @dragend="handleDrag()"
        @click="getPosition($event)"
      >
        <!-- クリックでマーカー表示 -->
        <div v-for="marker in markers" :key="marker.id">
          <GmapMarker
            :position="{
              lat: marker.positionData.lat,
              lng: marker.positionData.lng,
            }"
            :clickable="true"
            :draggable="false"
            v-on:click="showInfowWindow(marker.id)"
          >
            <!-- マーカー上のウィンドウ表示 -->
            <gmap-info-window v-if="marker.infowWindow">
              <div @click="clickPin(marker.id)">{{ marker.title }}</div>
            </gmap-info-window>
          </GmapMarker>
        </div>
        ></GmapMap
      >
    </div>
    <div class="button-panel">
      <input
        type="signout"
        class="button"
        title="Sign out"
        value="Sign out"
        v-on:click="signout"
      />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      // 任意のピン位置設置
      markers: [],
      // マップの解像度
      zoom: 10,
    };
  },
  // ページ開いたとき
  created() {
    //does the user have a saved center?use it instead of the default
    if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center);
    } else {
      //get user's coordinates from browsers
      this.$getLocation({})
        .then((coordinates) => {
          this.myCoordinates = coordinates;
        })
        .catch((error) => alert(error));
    }

    //does the user have a saved center?use it instead of the default
    if (localStorage.zoom) {
      this.zoom = parseInt(localStorage.zoom);
    }
    // 緯度経度をparms propsでhomeからpostに渡す
    // Fifebaseからデータを取得
    firebase
      .firestore()
      .collection("tweets")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.markers.push({
            id: this.markers.length,
            postid: doc.id,
            ...doc.data(),
          });
        });
      });
  },
  mounted() {
    //add the map to a data object
    this.$refs.mapRef.$mapPromise.then((map) => (this.map = map));
  },
  methods: {
    handleDrag() {
      let center = {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng(),
      };
      let zoom = this.map.getZoom();

      localStorage.center = JSON.stringify(center);
      localStorage.zoom = zoom;
    },

    //クリックしたらマーカー表示されるように
    getPosition: function(event) {
      console.log(event.latLng.lat());
      if (event) {
        this.markers.push({
          id: this.markers.length,
          title: "新規登録",
          infowWindow: true,
          positionData: { lat: event.latLng.lat(), lng: event.latLng.lng() },
        });
      }
    },
    signout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("ログアウトしました");
          this.router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // functionの()内に引数markerid入れることで使えるようになる
    clickPin: function(id) {
      if (this.markers[id].title === "新規登録") {
        this.$router.push({
          name: `Post`,
          params: {
            lat: this.markers[id].positionData.lat.toFixed(4),
            lng: this.markers[id].positionData.lng.toFixed(4),
          },
        });
      } else {
        this.$router.push({
          name: `Show`,
          params: {
            postid: this.markers[id].postid,
          },
        });
      }
    },
    showInfowWindow: function(id) {
      this.markers[id].infowWindow = !this.markers[id].infowWindow;
    },
  },
  computed: {
    mapCoordinates() {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0,
        };
      }
      return {
        lat: this.map
          .getCenter()
          .lat()
          .toFixed(4),
        lng: this.map
          .getCenter()
          .lng()
          .toFixed(4),
      };
    },
  },
};
</script>

<style scoped>
.body {
  flex-direction: column;
  display: block;
}
/* header */
.full {
  width: 100%;
  min-height: 100vh;
  background: url("https://wallpaperaccess.com/full/703897.jpg") center / cover;
  background-position: center;
  font-family: "Open Sans", sans-serif;
}

/* 写真内のCOM. */

.h1 {
  border: double 10px #fff;
  opacity: 0.8;
  margin: auto; /* サンプル用 中央寄せ  */
  box-sizing: border-box; /* 罫線も含む長さ       */
  width: 100%; /* BOXの幅              */
  max-width: 300px; /* BOXの最大幅          */

  padding: 18px; /* 文字の位置合わせ     */
  font-size: 30px; /* 文字サイズ           */
  text-align: center; /* 文字位置             */
  color: #5e5e5e;
  border: 12px double #ffffff; /* 枠線の指定           */
  border-radius: 1px;
  top: 50%;
  font-family: "Bangers", cursive;
}

/* What is COM. */
.main-title {
  backface-visibility: hidden;
  filter: blur(0px);
  opacity: 1;
  font-family: "Quicksand", sans-serif;
  display: block;
  position: relative;
  overflow: hidden;
  backface-visibility: hidden;
  font-size: 35px;
  letter-spacing: 5px;
  line-height: 42px;
  margin-top: 150px;
  margin-bottom: 30px;
}
/* 説明文1行目 */
.text {
  margin-bottom: 20px;
  font-size: 15px;
  line-height: 30px;
  font-family: "Quicksand", sans-serif;
}
/* 説明文2行目 */
.text2 {
  margin-bottom: 140px;
  font-size: 15px;
  line-height: 30px;
  font-family: "Quicksand", sans-serif;
}
/* 座標 */
.coordinates {
  justify-content: center;
}
/* googlemap */
.Googlemap {
  width: 100%;
}

/* ログアウトボタン */
.button-panel {
  margin: 2em 0 0;
  width: 100%;
}

.button-panel .button {
  background: #42b983;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 30px;
  font-family: "Open Sans", sans-serif;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.3s ease-in-out;
  width: 30%;
}

.button:hover {
  background: #ee3e52;
}
</style>
