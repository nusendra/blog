const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/post/optimasi-aset-berbasis-teks-untuk-performa-web-dengan-gzip-nginx.md"),
	() => import("../../../src/routes/post/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-1.md"),
	() => import("../../../src/routes/post/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-2.md"),
	() => import("../../../src/routes/post/mengorganisir-api-call-di-nuxtjs-dengan-repository-pattern.md"),
	() => import("../../../src/routes/post/how-to-yank-or-copy-text-from-different-instances-of-vim.md"),
	() => import("../../../src/routes/post/terselamatkan-oleh-startup-script-di-google-cloud-engine.md"),
	() => import("../../../src/routes/post/menentukan-teknologi-yang-tepat-sebelum-membuat-project.md"),
	() => import("../../../src/routes/post/react-native-057-images-is-not-showing-on-generated-apk.md"),
	() => import("../../../src/routes/post/duplikasi-object-dan-array-dengan-benar-di-javascript.md"),
	() => import("../../../src/routes/post/membuat-rbac-sendiri-menu-rendering-di-nuxtjs-part-3.md"),
	() => import("../../../src/routes/post/mini-workshop-speed-up-vuejs-development-with-nuxt.md"),
	() => import("../../../src/routes/post/setup-https-ssl-di-nuxtjs-dan-laravel-dengan-nginx.md"),
	() => import("../../../src/routes/post/workshop-vuejs-basic-bersama-komunitas-surabayadev.md"),
	() => import("../../../src/routes/post/redirect-http-ke-https-dengan-htaccess-di-laravel.md"),
	() => import("../../../src/routes/post/download-private-video-youtube-dengan-youtube-dl.md"),
	() => import("../../../src/routes/post/migrasi-blog-dari-vue-gridsome-ke-svelte-sapper.md"),
	() => import("../../../src/routes/post/tdd-menggunakan-mocha-dan-chai-di-nodejs-part-1.md"),
	() => import("../../../src/routes/post/tdd-menggunakan-mocha-dan-chai-di-nodejs-part-2.md"),
	() => import("../../../src/routes/post/memproteksi-laravel-web-app-dari-serangan-csrf.md"),
	() => import("../../../src/routes/post/berkomunitaslah-dapatkan-dan-sebarkan-manfaat.md"),
	() => import("../../../src/routes/post/method-destroy-di-controller-laravel-5-part-8.md"),
	() => import("../../../src/routes/post/membuat-rbac-sendiri-backend-response-part-2.md"),
	() => import("../../../src/routes/post/method-create-di-controller-laravel-5-part-3.md"),
	() => import("../../../src/routes/post/method-update-di-controller-laravel-5-part-7.md"),
	() => import("../../../src/routes/post/rest-api-dengan-nodejs-dan-typescript-part-1.md"),
	() => import("../../../src/routes/post/rest-api-dengan-nodejs-dan-typescript-part-2.md"),
	() => import("../../../src/routes/post/rest-api-dengan-nodejs-dan-typescript-part-3.md"),
	() => import("../../../src/routes/post/menampilkan-data-polymorphic-tanpa-eloquent.md"),
	() => import("../../../src/routes/post/method-index-di-controller-laravel-5-part-2.md"),
	() => import("../../../src/routes/post/method-store-di-controller-laravel-5-part-4.md"),
	() => import("../../../src/routes/post/membersihkan-disk-usage-pada-ubuntu-server.md"),
	() => import("../../../src/routes/post/method-edit-di-controller-laravel-5-part-6.md"),
	() => import("../../../src/routes/post/method-show-di-controller-laravel-5-part-5.md"),
	() => import("../../../src/routes/post/cara-mudah-mengurus-atau-membuat-passport.md"),
	() => import("../../../src/routes/post/react-native-state-management-dengan-remx.md"),
	() => import("../../../src/routes/post/fokus-sangat-membantu-kita-saat-ngoding.md"),
	() => import("../../../src/routes/post/install-dan-akses-remote-mariadb-di-vps.md"),
	() => import("../../../src/routes/post/jangan-dibuka-nanti-jadi-lemot-44440000.md"),
	() => import("../../../src/routes/post/memajukan-komunitas-di-webunconfid-2018.md"),
	() => import("../../../src/routes/post/docker-compose-postgresql-dan-pgadmin4.md"),
	() => import("../../../src/routes/post/dasar-controller-di-laravel-5-part-1.md"),
	() => import("../../../src/routes/post/migrasi-dari-dynamic-ke-static-blog.md"),
	() => import("../../../src/routes/post/programmer-adalah-pembelajar-sejati.md"),
	() => import("../../../src/routes/post/tips-dan-trik-array-pada-javascript.md"),
	() => import("../../../src/routes/post/membuat-rbac-sendiri-konsep-part-1.md"),
	() => import("../../../src/routes/post/mengenal-route-di-laravel-5-part-1.md"),
	() => import("../../../src/routes/post/mengenal-route-di-laravel-5-part-2.md"),
	() => import("../../../src/routes/post/berkenalan-lebih-dekat-dengan-pwa.md"),
	() => import("../../../src/routes/post/manajemen-waktu-sebagai-developer.md"),
	() => import("../../../src/routes/post/menggunakan-knexjs-di-express-app.md"),
	() => import("../../../src/routes/post/mengenal-middleware-di-laravel-5.md"),
	() => import("../../../src/routes/post/jabber-xmpp-menggunakan-nodejs.md"),
	() => import("../../../src/routes/post/membangun-komunitas-surabayajs.md"),
	() => import("../../../src/routes/post/menyematkan-data-pada-vue-slot.md"),
	() => import("../../../src/routes/post/pengenalan-dasar-tentang-lumen.md"),
	() => import("../../../src/routes/post/groupby-array-pada-javascript.md"),
	() => import("../../../src/routes/post/manfaat-dari-berpikir-negatif.md"),
	() => import("../../../src/routes/post/how-to-setup-my-personal-vim.md"),
	() => import("../../../src/routes/post/konfigurasi-dasar-laravel-5.md"),
	() => import("../../../src/routes/post/struktur-folder-laravel-55.md"),
	() => import("../../../src/routes/post/goodbye-mobx-welcome-remx.md"),
	() => import("../../../src/routes/post/surabayajs-meetup-perdana.md"),
	() => import("../../../src/routes/post/surabayajs-meetup-ketiga.md"),
	() => import("../../../src/routes/post/berkenalan-dengan-pugjs.md"),
	() => import("../../../src/routes/post/berkenalan-dengan-vuejs.md"),
	() => import("../../../src/routes/post/manfaat-menggunakan-pwa.md"),
	() => import("../../../src/routes/post/surabayajs-meetup-kedua.md"),
	() => import("../../../src/routes/post/vim-keyboard-cheatsheet.md"),
	() => import("../../../src/routes/post/momentjs-dengan-nuxtjs.md"),
	() => import("../../../src/routes/post/setting-vhost-di-nginx.md"),
	() => import("../../../src/routes/post/auth-module-di-nuxtjs.md"),
	() => import("../../../src/routes/post/perubahan-jam-tidur.md"),
	() => import("../../../src/routes/post/migrasi-ke-vim.md"),
	() => import("../../../src/routes/post/spa-vs-mpa.md")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/posts.json.js
	[/^\/posts\.json$/],

	// src/routes/post/optimasi-aset-berbasis-teks-untuk-performa-web-dengan-gzip-nginx.md
	[/^\/post\/optimasi-aset-berbasis-teks-untuk-performa-web-dengan-gzip-nginx\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/post/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-1.md
	[/^\/post\/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-1\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/post/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-2.md
	[/^\/post\/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-2\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/post/mengorganisir-api-call-di-nuxtjs-dengan-repository-pattern.md
	[/^\/post\/mengorganisir-api-call-di-nuxtjs-dengan-repository-pattern\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/post/how-to-yank-or-copy-text-from-different-instances-of-vim.md
	[/^\/post\/how-to-yank-or-copy-text-from-different-instances-of-vim\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/post/terselamatkan-oleh-startup-script-di-google-cloud-engine.md
	[/^\/post\/terselamatkan-oleh-startup-script-di-google-cloud-engine\/?$/, [c[0], c[8]], [c[1]]],

	// src/routes/post/menentukan-teknologi-yang-tepat-sebelum-membuat-project.md
	[/^\/post\/menentukan-teknologi-yang-tepat-sebelum-membuat-project\/?$/, [c[0], c[9]], [c[1]]],

	// src/routes/post/react-native-057-images-is-not-showing-on-generated-apk.md
	[/^\/post\/react-native-057-images-is-not-showing-on-generated-apk\/?$/, [c[0], c[10]], [c[1]]],

	// src/routes/post/duplikasi-object-dan-array-dengan-benar-di-javascript.md
	[/^\/post\/duplikasi-object-dan-array-dengan-benar-di-javascript\/?$/, [c[0], c[11]], [c[1]]],

	// src/routes/post/membuat-rbac-sendiri-menu-rendering-di-nuxtjs-part-3.md
	[/^\/post\/membuat-rbac-sendiri-menu-rendering-di-nuxtjs-part-3\/?$/, [c[0], c[12]], [c[1]]],

	// src/routes/post/mini-workshop-speed-up-vuejs-development-with-nuxt.md
	[/^\/post\/mini-workshop-speed-up-vuejs-development-with-nuxt\/?$/, [c[0], c[13]], [c[1]]],

	// src/routes/post/setup-https-ssl-di-nuxtjs-dan-laravel-dengan-nginx.md
	[/^\/post\/setup-https-ssl-di-nuxtjs-dan-laravel-dengan-nginx\/?$/, [c[0], c[14]], [c[1]]],

	// src/routes/post/workshop-vuejs-basic-bersama-komunitas-surabayadev.md
	[/^\/post\/workshop-vuejs-basic-bersama-komunitas-surabayadev\/?$/, [c[0], c[15]], [c[1]]],

	// src/routes/post/redirect-http-ke-https-dengan-htaccess-di-laravel.md
	[/^\/post\/redirect-http-ke-https-dengan-htaccess-di-laravel\/?$/, [c[0], c[16]], [c[1]]],

	// src/routes/post/download-private-video-youtube-dengan-youtube-dl.md
	[/^\/post\/download-private-video-youtube-dengan-youtube-dl\/?$/, [c[0], c[17]], [c[1]]],

	// src/routes/post/migrasi-blog-dari-vue-gridsome-ke-svelte-sapper.md
	[/^\/post\/migrasi-blog-dari-vue-gridsome-ke-svelte-sapper\/?$/, [c[0], c[18]], [c[1]]],

	// src/routes/post/tdd-menggunakan-mocha-dan-chai-di-nodejs-part-1.md
	[/^\/post\/tdd-menggunakan-mocha-dan-chai-di-nodejs-part-1\/?$/, [c[0], c[19]], [c[1]]],

	// src/routes/post/tdd-menggunakan-mocha-dan-chai-di-nodejs-part-2.md
	[/^\/post\/tdd-menggunakan-mocha-dan-chai-di-nodejs-part-2\/?$/, [c[0], c[20]], [c[1]]],

	// src/routes/post/memproteksi-laravel-web-app-dari-serangan-csrf.md
	[/^\/post\/memproteksi-laravel-web-app-dari-serangan-csrf\/?$/, [c[0], c[21]], [c[1]]],

	// src/routes/post/berkomunitaslah-dapatkan-dan-sebarkan-manfaat.md
	[/^\/post\/berkomunitaslah-dapatkan-dan-sebarkan-manfaat\/?$/, [c[0], c[22]], [c[1]]],

	// src/routes/post/method-destroy-di-controller-laravel-5-part-8.md
	[/^\/post\/method-destroy-di-controller-laravel-5-part-8\/?$/, [c[0], c[23]], [c[1]]],

	// src/routes/post/membuat-rbac-sendiri-backend-response-part-2.md
	[/^\/post\/membuat-rbac-sendiri-backend-response-part-2\/?$/, [c[0], c[24]], [c[1]]],

	// src/routes/post/method-create-di-controller-laravel-5-part-3.md
	[/^\/post\/method-create-di-controller-laravel-5-part-3\/?$/, [c[0], c[25]], [c[1]]],

	// src/routes/post/method-update-di-controller-laravel-5-part-7.md
	[/^\/post\/method-update-di-controller-laravel-5-part-7\/?$/, [c[0], c[26]], [c[1]]],

	// src/routes/post/rest-api-dengan-nodejs-dan-typescript-part-1.md
	[/^\/post\/rest-api-dengan-nodejs-dan-typescript-part-1\/?$/, [c[0], c[27]], [c[1]]],

	// src/routes/post/rest-api-dengan-nodejs-dan-typescript-part-2.md
	[/^\/post\/rest-api-dengan-nodejs-dan-typescript-part-2\/?$/, [c[0], c[28]], [c[1]]],

	// src/routes/post/rest-api-dengan-nodejs-dan-typescript-part-3.md
	[/^\/post\/rest-api-dengan-nodejs-dan-typescript-part-3\/?$/, [c[0], c[29]], [c[1]]],

	// src/routes/post/menampilkan-data-polymorphic-tanpa-eloquent.md
	[/^\/post\/menampilkan-data-polymorphic-tanpa-eloquent\/?$/, [c[0], c[30]], [c[1]]],

	// src/routes/post/method-index-di-controller-laravel-5-part-2.md
	[/^\/post\/method-index-di-controller-laravel-5-part-2\/?$/, [c[0], c[31]], [c[1]]],

	// src/routes/post/method-store-di-controller-laravel-5-part-4.md
	[/^\/post\/method-store-di-controller-laravel-5-part-4\/?$/, [c[0], c[32]], [c[1]]],

	// src/routes/post/membersihkan-disk-usage-pada-ubuntu-server.md
	[/^\/post\/membersihkan-disk-usage-pada-ubuntu-server\/?$/, [c[0], c[33]], [c[1]]],

	// src/routes/post/method-edit-di-controller-laravel-5-part-6.md
	[/^\/post\/method-edit-di-controller-laravel-5-part-6\/?$/, [c[0], c[34]], [c[1]]],

	// src/routes/post/method-show-di-controller-laravel-5-part-5.md
	[/^\/post\/method-show-di-controller-laravel-5-part-5\/?$/, [c[0], c[35]], [c[1]]],

	// src/routes/post/cara-mudah-mengurus-atau-membuat-passport.md
	[/^\/post\/cara-mudah-mengurus-atau-membuat-passport\/?$/, [c[0], c[36]], [c[1]]],

	// src/routes/post/react-native-state-management-dengan-remx.md
	[/^\/post\/react-native-state-management-dengan-remx\/?$/, [c[0], c[37]], [c[1]]],

	// src/routes/post/fokus-sangat-membantu-kita-saat-ngoding.md
	[/^\/post\/fokus-sangat-membantu-kita-saat-ngoding\/?$/, [c[0], c[38]], [c[1]]],

	// src/routes/post/install-dan-akses-remote-mariadb-di-vps.md
	[/^\/post\/install-dan-akses-remote-mariadb-di-vps\/?$/, [c[0], c[39]], [c[1]]],

	// src/routes/post/jangan-dibuka-nanti-jadi-lemot-44440000.md
	[/^\/post\/jangan-dibuka-nanti-jadi-lemot-44440000\/?$/, [c[0], c[40]], [c[1]]],

	// src/routes/post/memajukan-komunitas-di-webunconfid-2018.md
	[/^\/post\/memajukan-komunitas-di-webunconfid-2018\/?$/, [c[0], c[41]], [c[1]]],

	// src/routes/post/docker-compose-postgresql-dan-pgadmin4.md
	[/^\/post\/docker-compose-postgresql-dan-pgadmin4\/?$/, [c[0], c[42]], [c[1]]],

	// src/routes/post/dasar-controller-di-laravel-5-part-1.md
	[/^\/post\/dasar-controller-di-laravel-5-part-1\/?$/, [c[0], c[43]], [c[1]]],

	// src/routes/post/migrasi-dari-dynamic-ke-static-blog.md
	[/^\/post\/migrasi-dari-dynamic-ke-static-blog\/?$/, [c[0], c[44]], [c[1]]],

	// src/routes/post/programmer-adalah-pembelajar-sejati.md
	[/^\/post\/programmer-adalah-pembelajar-sejati\/?$/, [c[0], c[45]], [c[1]]],

	// src/routes/post/tips-dan-trik-array-pada-javascript.md
	[/^\/post\/tips-dan-trik-array-pada-javascript\/?$/, [c[0], c[46]], [c[1]]],

	// src/routes/post/membuat-rbac-sendiri-konsep-part-1.md
	[/^\/post\/membuat-rbac-sendiri-konsep-part-1\/?$/, [c[0], c[47]], [c[1]]],

	// src/routes/post/mengenal-route-di-laravel-5-part-1.md
	[/^\/post\/mengenal-route-di-laravel-5-part-1\/?$/, [c[0], c[48]], [c[1]]],

	// src/routes/post/mengenal-route-di-laravel-5-part-2.md
	[/^\/post\/mengenal-route-di-laravel-5-part-2\/?$/, [c[0], c[49]], [c[1]]],

	// src/routes/post/berkenalan-lebih-dekat-dengan-pwa.md
	[/^\/post\/berkenalan-lebih-dekat-dengan-pwa\/?$/, [c[0], c[50]], [c[1]]],

	// src/routes/post/manajemen-waktu-sebagai-developer.md
	[/^\/post\/manajemen-waktu-sebagai-developer\/?$/, [c[0], c[51]], [c[1]]],

	// src/routes/post/menggunakan-knexjs-di-express-app.md
	[/^\/post\/menggunakan-knexjs-di-express-app\/?$/, [c[0], c[52]], [c[1]]],

	// src/routes/post/mengenal-middleware-di-laravel-5.md
	[/^\/post\/mengenal-middleware-di-laravel-5\/?$/, [c[0], c[53]], [c[1]]],

	// src/routes/post/jabber-xmpp-menggunakan-nodejs.md
	[/^\/post\/jabber-xmpp-menggunakan-nodejs\/?$/, [c[0], c[54]], [c[1]]],

	// src/routes/post/membangun-komunitas-surabayajs.md
	[/^\/post\/membangun-komunitas-surabayajs\/?$/, [c[0], c[55]], [c[1]]],

	// src/routes/post/menyematkan-data-pada-vue-slot.md
	[/^\/post\/menyematkan-data-pada-vue-slot\/?$/, [c[0], c[56]], [c[1]]],

	// src/routes/post/pengenalan-dasar-tentang-lumen.md
	[/^\/post\/pengenalan-dasar-tentang-lumen\/?$/, [c[0], c[57]], [c[1]]],

	// src/routes/post/groupby-array-pada-javascript.md
	[/^\/post\/groupby-array-pada-javascript\/?$/, [c[0], c[58]], [c[1]]],

	// src/routes/post/manfaat-dari-berpikir-negatif.md
	[/^\/post\/manfaat-dari-berpikir-negatif\/?$/, [c[0], c[59]], [c[1]]],

	// src/routes/post/how-to-setup-my-personal-vim.md
	[/^\/post\/how-to-setup-my-personal-vim\/?$/, [c[0], c[60]], [c[1]]],

	// src/routes/post/konfigurasi-dasar-laravel-5.md
	[/^\/post\/konfigurasi-dasar-laravel-5\/?$/, [c[0], c[61]], [c[1]]],

	// src/routes/post/struktur-folder-laravel-55.md
	[/^\/post\/struktur-folder-laravel-55\/?$/, [c[0], c[62]], [c[1]]],

	// src/routes/post/goodbye-mobx-welcome-remx.md
	[/^\/post\/goodbye-mobx-welcome-remx\/?$/, [c[0], c[63]], [c[1]]],

	// src/routes/post/surabayajs-meetup-perdana.md
	[/^\/post\/surabayajs-meetup-perdana\/?$/, [c[0], c[64]], [c[1]]],

	// src/routes/post/surabayajs-meetup-ketiga.md
	[/^\/post\/surabayajs-meetup-ketiga\/?$/, [c[0], c[65]], [c[1]]],

	// src/routes/post/berkenalan-dengan-pugjs.md
	[/^\/post\/berkenalan-dengan-pugjs\/?$/, [c[0], c[66]], [c[1]]],

	// src/routes/post/berkenalan-dengan-vuejs.md
	[/^\/post\/berkenalan-dengan-vuejs\/?$/, [c[0], c[67]], [c[1]]],

	// src/routes/post/manfaat-menggunakan-pwa.md
	[/^\/post\/manfaat-menggunakan-pwa\/?$/, [c[0], c[68]], [c[1]]],

	// src/routes/post/surabayajs-meetup-kedua.md
	[/^\/post\/surabayajs-meetup-kedua\/?$/, [c[0], c[69]], [c[1]]],

	// src/routes/post/vim-keyboard-cheatsheet.md
	[/^\/post\/vim-keyboard-cheatsheet\/?$/, [c[0], c[70]], [c[1]]],

	// src/routes/post/momentjs-dengan-nuxtjs.md
	[/^\/post\/momentjs-dengan-nuxtjs\/?$/, [c[0], c[71]], [c[1]]],

	// src/routes/post/setting-vhost-di-nginx.md
	[/^\/post\/setting-vhost-di-nginx\/?$/, [c[0], c[72]], [c[1]]],

	// src/routes/post/auth-module-di-nuxtjs.md
	[/^\/post\/auth-module-di-nuxtjs\/?$/, [c[0], c[73]], [c[1]]],

	// src/routes/post/perubahan-jam-tidur.md
	[/^\/post\/perubahan-jam-tidur\/?$/, [c[0], c[74]], [c[1]]],

	// src/routes/post/migrasi-ke-vim.md
	[/^\/post\/migrasi-ke-vim\/?$/, [c[0], c[75]], [c[1]]],

	// src/routes/post/spa-vs-mpa.md
	[/^\/post\/spa-vs-mpa\/?$/, [c[0], c[76]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];