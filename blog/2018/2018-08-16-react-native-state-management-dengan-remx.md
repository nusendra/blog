---
title: React Native - State Management dengan Remx
date: 2018-08-16 13:53:27
tags: ['javascript','reactnative']
description: "Cara mudah mengimplementasikan state management di React Native menggunakan remx."
slug: react-native-state-management-dengan-remx
---

State management di React Native ada bermacam - macam, salah satu nya remx. Oh iya, sebelum lanjut saya mau jelaskan dulu kenapa saya beralih dari Mobx ke Remx, dan kenapa saya gak pake Redux seperti pada umumnya. Silakan baca ke post saya [kesini](https://nusendra.com/post/goodbye-mobx-welcome-remx). Ok, mungkin akan saya jelaskan lagi kenapa kita harus pake state management, dan apa kelebihannya daripada kita menyimpan data di local component state.

### Local Component State

- Kelebihan : Mudah, kita tinggal mainin setState dan this.state saja untuk membaca state nya
- Kelemahan: Akan sangat merepotkan mengatur state ketika app nya semakin membesar dan ini juga merupakan bad practice dalam design pattern

### Redux

- Kelebihan: Design pattern nya bagus dan scalable
- Kelemahan: Terlalu banyak boilerplate, susah untuk menerapkan TDD (Test Driven Development) dan mungkin agak susah mempelajarinya (bagi pemula).

### Mobx

- Kelebihan: Mudah dalam penggunaannya, hampir tanpa boilerplate, performa yang bagus dan simple.
- Kelemahan: Saya pribadi belum menemukan kelemahan nya, cuman dia belum support dengan React Native versi 0.56, that's why i moved to remx :)

Baik, langsung saja kita coba implementasi menggunakan remx di app React Native kita. Pertama buka terminal dan masuk ke direktori project kita. Kemudian ketik berikut untuk instalasi nya

```
$ npm install remx
```

Kemudian bikin folder di root project nya, susunan nya seperti ini

`projectKamu/src/store/user/index.js`

Setelah itu pada file store index.js nya isikan sebagai berikut

```javascript
import * as remx from 'remx';

const initialState = {
  nama: 'Nusendra'
};

// inisialisasi state
const state = remx.state(initialState);

// getters berfungsi untuk get data
const getters = remx.getters({
  getNama: () => state.nama
});

// setters untuk mengubah state
const setters = remx.setters({
  setName: payload =>  state.nama = payload
 });

export const store = {
  ...getters,
  ...setters
};
```

Untuk actions (berfungsi untuk asynchronous) kita buatkan file terpisah. Kita namakan saja `actions.js`

```javascript
import {store} from './index';

export async function fetchData(){
  const response = await fetch('http://url-api');
  const result = await response.json();
  store.setName(result.value);
}
```

Nah, store sudah beres. Sekarang kita pakai store nya di component. Misalkan kita pakai di App.js .

```javascript
import { connect } from 'remx';
import { store } from '../store/user/index';
import * as actions from '../store/user/actions';

class Home extends Component {
  gantiNama() {
    actions.fetcData();
  }

  render() {
    return (
      <Container>
        <Text>Hai, {this.props.selectedNama} ...</Text>
        <TouchableOpacity onPress={() => { this.gantiNama() }}>
           <Text>Ganti Nama</Text>
        </TouchableOpacity>
      </Container>
    )
  }
}

function mapStateToProps(ownProps) {
  return {
    selectedNama: store.getNama();
  };
}

export default connect(mapStateToProps)(Home);
```

Penjelasan dari kode diatas adalah. Component Home tersebut akan menginjeksi data store kedalam nya, kemudian function mapStateToProps menginisialisasi value / state selectedNama dengan value yang ada di store, yakni nama. Kemudian data state nama tersebut di tampilkan di function render. Dalam function render tersebut, terdapat sebuah tombol yang jika di tekan akan mentrigger function gantiNama() dan berfungsi untuk menjalankan / dispatch  actions store. Setelah itu actions store melakukan fetch data yang kemudian melakukan mutasi data dengan setter.

Bingung ya? haha. Oke begini alur nya

1. **State** nama diinisialisasi di dalam store
2. Component mengambil state nama menggunakan fungsi **getters**
3. Component melakukan fetch data (api call) dengan menekan tombol. Seketika itu juga **actions** akan melakukan pengambilan data.
4. **Actions** melakukan perubahan data state melalui fungsi **setters**.
5. Component akan secara reaktif menerima perubahan state dan menampilkan nya.

<hr/>

Simple kan? Semoga bermanfaat buat temen - temen pembaca. Kalau masih ada yang di bingungkan, jangan sungkan untuk bertanya di kolom komentar. Thanks .....
