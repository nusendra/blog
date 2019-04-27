<template lang='pug'>
  Layout
    #homepage
      .container
        .small
          Header
          hr
          .column
            .wide
              .small
                span Updated at 27 April, 2019
              h4 Jelasin dikit dong buat apa halaman ini
              p
                Halaman now ini masih jarang diterapkan di beberapa blog di Indonesia, saya juga baru tau dari blog nya kang <a href="https://108kb.io/">Fariz Rizaldy</a>. Silakan baca baca di <a href="https://nownownow.com/">sini</a> untuk lebih lanjut mengenai halaman <b>now</b> ini.
              h4 Kerjaan
              p Freelancer as a software engineer (Backend API Services, Frontend, Mobile Apps, you name it).
              h4 Project yang lagi dikerjain
              p
                ol
                  li ERP PT. Benteng Api Technic
                  li Ahtefe Reload (Mobile Apps)
                  li Payroll PT.BAT - PT. Ume Persada Indonesia
                  li Duitku Mobile Apps
              h4 Software yang saya pake
              p
                ol
                  li OS: Linux (Debian)
                  li Spreadsheet: Libre Office
                  li Music Player: Clementine & Spotify
                  li Movie Player: VLC
                  li Code Editor: VIM
                  li Database GUI: HeidiSQL (with Wine) & RoboMongo
                  li Browsers: Google Chrome & Mozilla Firefox for Developer
                  li Mail: Mozilla Thunderbird
                  li RSS Reader: Mozilla Thunderbird
                  li Image Editing: GIMP & InkScape
                  li Others: Telegram Desktop, Teamviewer
              p back to 
                a(href='/') Home
</template>

<script>
import Header from '../components/Header'

export default {
  components: { Header }
}
</script>
