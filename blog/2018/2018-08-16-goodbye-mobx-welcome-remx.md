---
title: Goodbye MobX, Welcome RemX
date: 2018-08-06 14:42:50
tags: ['javascript','reactnative']
description: "Selamat tinggal MobX, selamat datang RemX. State management minimalis untuk React Native"
slug: goodbye-mobx-welcome-remx
---

Dalam framework Javascript, kita membutuhkan yang namanya state management sebagai pusat data yang nantinya bisa di konsumsi oleh banyak component, sehingga data yang dijadikan acuan bisa konsisten. Dalam dunia Vuejs, kita mengenal Vuex sebagai state management nya, sedangkan di dunia React mayoritas menggunakan Redux.

Saya sudah lama berkecimpung di dunia Vuex, jadi untuk urusan state management insyaallah ga akan ada hambatan dalam memahami nya. Namun ketika masuk ke dunia mobile dengan React Native, saya diperkenalkan dengan Redux. Oh iya sebelumnya mungkin perlu diketahui, saya ga suka pake ReactJS. Sebenernya pake React native pun juga terpaksa, karena memang di framework Vuejs sendiri masih belum ada mobile native (yang mumpuni), adanya cuma Weex, Nativescript-Vue, dan yang paling baru Vue-Native (nama doang ada native nya, padahal transpile dari React Native).

Nah karena umum banget pake Redux di React Native, ketika saya coba baca baca dan liat kode nya langsung, kok gak ada ketertarikan sama redux, haha. Akhirnya saya coba alternatif lain, pilihan jatuh kepada MobX. Pertama pake MobX keren sih, gampang setup nya dan sangat mudah dipahami. Namun kesenangan ini hanya sementara, yakni sampai React Native versi 0.55.4 saja, ketika ada update ke versi 0.56.0, entah mengapa MobX gak bisa jalan. Habis gugling juga dapet solusi nya sih, tapi kayak nya agak memaksakan. Akhir nya terpaksa beralih ke solusi lain, RemX. Yeaaaaa

Di halaman github nya [remx](https://github.com/wix/remx), sedkit banget docs nya. Bahkan cara instalasi lewat npm pun gak ada haha. Tapi tenang aja, disana udah ada example nya kok, tinggal liat package.json nya trus install deh. Cara install nya gampang, tinggal ketik `npm install remx` kemudian bikin store sesuai dengan yang ada di example nya.

Oke daripada ngalor ngidul langsung aja kita praktek. Pertama buka terminal kamu, masuk ke directory project dan ketik berikut ini untuk instalasi remx.

```
$ npm install remx
```

Kemudian bikin folder di root project nya, susunan nya seperti ini

`projectKamu/src/store/user/index.js`

Setelah itu pada file store index.js nya isikan sebagai berikut

```javascript
import * as remx from 'remx';

const initialState = {
  nama: 'nusendra'
};

const state = remx.state(initialState);
const getters = remx.getters({
  getNama() {
    return state.nama
  }
});

export const store = {
  ...getters
};
```

Kemudian pada file App.js isi seperti ini

```javascript
import { connect } from 'remx';
import { store } from './src/store/user/index';

class App extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.selectedNama}</Text>
      </View>
    );
  }
}

function mapStateToProps(ownProps) {
  return {
    selectedNama: store.getNama()
  };
}

export default connect(mapStateToProps)(App);
```

Setelah itu, di hasil akhirnya silakan jalankan project anda, misalnya kita pake android maka ketik

```
$ react-native run-android
```

Tadaaa, kalian akan mendapati nama nusendra di aplikasi mobile kalian. Artikel ini hanya tutorial bagaimana cara memulai menggunakan remx, dan disini hanya memakai method getters aja. Kalau pengen lebih advance, silakan main main ke halaman github nya. Insya allah kalau ada waktu, saya akan lanjutkan bahas remx di artikel selanjutnya. Aamiiinnn

<hr/>

Terima kasih temen - temen yang udah mau mampir dan baca baca.
