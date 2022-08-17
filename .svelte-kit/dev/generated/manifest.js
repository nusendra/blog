const c = [
	() => import("../components/layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/work-log/0001-sub-blog-tentang-pekerjaan/+page.md"),
	() => import("../../../src/routes/work-log/+page.svelte"),
	() => import("../../../src/routes/+layout.svelte"),
	() => import("../../../src/routes/course/+page.svelte"),
	() => import("../../../src/routes/social/+page.svelte"),
	() => import("../../../src/routes/+page.svelte"),
	() => import("../../../src/routes/talks/+page.svelte"),
	() => import("../../../src/routes/blog/+page.svelte"),
	() => import("../../../src/routes/post/optimasi-aset-berbasis-teks-untuk-performa-web-dengan-gzip-nginx/+page.md"),
	() => import("../../../src/routes/post/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-1/+page.md"),
	() => import("../../../src/routes/post/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-2/+page.md"),
	() => import("../../../src/routes/post/mengorganisir-api-call-di-nuxtjs-dengan-repository-pattern/+page.md"),
	() => import("../../../src/routes/post/terselamatkan-oleh-startup-script-di-google-cloud-engine/+page.md"),
	() => import("../../../src/routes/post/menentukan-teknologi-yang-tepat-sebelum-membuat-project/+page.md"),
	() => import("../../../src/routes/post/react-native-057-images-is-not-showing-on-generated-apk/+page.md"),
	() => import("../../../src/routes/post/duplikasi-object-atau-array-dengan-benar-di-javascript/+page.md"),
	() => import("../../../src/routes/post/membuat-rbac-sendiri-menu-rendering-di-nuxtjs-part-3/+page.md"),
	() => import("../../../src/routes/post/setup-https-ssl-di-nuxtjs-dan-laravel-dengan-nginx/+page.md"),
	() => import("../../../src/routes/post/transforms-absolute-ke-relative-path-di-typescript/+page.md"),
	() => import("../../../src/routes/post/workshop-vuejs-basic-bersama-komunitas-surabayadev/+page.md"),
	() => import("../../../src/routes/post/redirect-http-ke-https-dengan-htaccess-di-laravel/+page.md"),
	() => import("../../../src/routes/post/yank-or-copy-text-from-different-instances-of-vim/+page.md"),
	() => import("../../../src/routes/post/download-private-video-youtube-dengan-youtube-dl/+page.md"),
	() => import("../../../src/routes/post/bagaimana-saya-mengatur-waktu-sebagai-developer/+page.md"),
	() => import("../../../src/routes/post/migrasi-blog-dari-vue-gridsome-ke-svelte-sapper/+page.md"),
	() => import("../../../src/routes/post/tdd-menggunakan-mocha-dan-chai-di-nodejs-part-1/+page.md"),
	() => import("../../../src/routes/post/tdd-menggunakan-mocha-dan-chai-di-nodejs-part-2/+page.md"),
	() => import("../../../src/routes/post/memproteksi-laravel-web-app-dari-serangan-csrf/+page.md"),
	() => import("../../../src/routes/post/mini-workshop-speed-up-development-with-nuxtjs/+page.md"),
	() => import("../../../src/routes/post/berkomunitaslah-dapatkan-dan-sebarkan-manfaat/+page.md"),
	() => import("../../../src/routes/post/method-destroy-di-controller-laravel-5-part-8/+page.md"),
	() => import("../../../src/routes/post/membuat-rbac-sendiri-backend-response-part-2/+page.md"),
	() => import("../../../src/routes/post/method-create-di-controller-laravel-5-part-3/+page.md"),
	() => import("../../../src/routes/post/method-update-di-controller-laravel-5-part-7/+page.md"),
	() => import("../../../src/routes/post/rest-api-dengan-nodejs-dan-typescript-part-1/+page.md"),
	() => import("../../../src/routes/post/rest-api-dengan-nodejs-dan-typescript-part-2/+page.md"),
	() => import("../../../src/routes/post/rest-api-dengan-nodejs-dan-typescript-part-3/+page.md"),
	() => import("../../../src/routes/post/menampilkan-data-polymorphic-tanpa-eloquent/+page.md"),
	() => import("../../../src/routes/post/method-index-di-controller-laravel-5-part-2/+page.md"),
	() => import("../../../src/routes/post/method-store-di-controller-laravel-5-part-4/+page.md"),
	() => import("../../../src/routes/post/install-nerdtree-dan-colorscheme-di-neovim/+page.md"),
	() => import("../../../src/routes/post/membersihkan-disk-usage-pada-ubuntu-server/+page.md"),
	() => import("../../../src/routes/post/method-edit-di-controller-laravel-5-part-6/+page.md"),
	() => import("../../../src/routes/post/method-show-di-controller-laravel-5-part-5/+page.md"),
	() => import("../../../src/routes/post/cara-mudah-mengurus-atau-membuat-passport/+page.md"),
	() => import("../../../src/routes/post/react-native-state-management-dengan-remx/+page.md"),
	() => import("../../../src/routes/post/fokus-sangat-membantu-kita-saat-ngoding/+page.md"),
	() => import("../../../src/routes/post/install-dan-akses-remote-mariadb-di-vps/+page.md"),
	() => import("../../../src/routes/post/jangan-dibuka-nanti-jadi-lemot-44440000/+page.md"),
	() => import("../../../src/routes/post/memajukan-komunitas-di-webunconfid-2018/+page.md"),
	() => import("../../../src/routes/post/docker-compose-postgresql-dan-pgadmin4/+page.md"),
	() => import("../../../src/routes/post/mencoba-archlinux-dengan-endeavouros/+page.md"),
	() => import("../../../src/routes/post/migrasi-dari-dynamic-ke-static-blog/+page.md"),
	() => import("../../../src/routes/post/programmer-adalah-pembelajar-sejati/+page.md"),
	() => import("../../../src/routes/post/tips-dan-trik-array-pada-javascript/+page.md"),
	() => import("../../../src/routes/post/membuat-rbac-sendiri-konsep-part-1/+page.md"),
	() => import("../../../src/routes/post/mengenal-route-di-laravel-5-part-1/+page.md"),
	() => import("../../../src/routes/post/mengenal-route-di-laravel-5-part-2/+page.md"),
	() => import("../../../src/routes/post/berkenalan-lebih-dekat-dengan-pwa/+page.md"),
	() => import("../../../src/routes/post/menggunakan-knexjs-di-express-app/+page.md"),
	() => import("../../../src/routes/post/mengenal-middleware-di-laravel-5/+page.md"),
	() => import("../../../src/routes/post/jabber-xmpp-menggunakan-nodejs/+page.md"),
	() => import("../../../src/routes/post/membangun-komunitas-surabayajs/+page.md"),
	() => import("../../../src/routes/post/menyematkan-data-pada-vue-slot/+page.md"),
	() => import("../../../src/routes/post/pengenalan-dasar-tentang-lumen/+page.md"),
	() => import("../../../src/routes/post/groupby-array-pada-javascript/+page.md"),
	() => import("../../../src/routes/post/manfaat-dari-berpikir-negatif/+page.md"),
	() => import("../../../src/routes/post/how-to-setup-my-personal-vim/+page.md"),
	() => import("../../../src/routes/post/setup-vim-devicons-di-neovim/+page.md"),
	() => import("../../../src/routes/post/konfigurasi-dasar-laravel-5/+page.md"),
	() => import("../../../src/routes/post/struktur-folder-laravel-55/+page.md"),
	() => import("../../../src/routes/post/goodbye-mobx-welcome-remx/+page.md"),
	() => import("../../../src/routes/post/surabayajs-meetup-perdana/+page.md"),
	() => import("../../../src/routes/post/setup-vim-plug-di-neovim/+page.md"),
	() => import("../../../src/routes/post/surabayajs-meetup-ketiga/+page.md"),
	() => import("../../../src/routes/post/berkenalan-dengan-pugjs/+page.md"),
	() => import("../../../src/routes/post/berkenalan-dengan-vuejs/+page.md"),
	() => import("../../../src/routes/post/manfaat-menggunakan-pwa/+page.md"),
	() => import("../../../src/routes/post/surabayajs-meetup-kedua/+page.md"),
	() => import("../../../src/routes/post/vim-keyboard-cheatsheet/+page.md"),
	() => import("../../../src/routes/post/momentjs-dengan-nuxtjs/+page.md"),
	() => import("../../../src/routes/post/setting-vhost-di-nginx/+page.md"),
	() => import("../../../src/routes/post/auth-module-di-nuxtjs/+page.md"),
	() => import("../../../src/routes/post/perubahan-jam-tidur/+page.md"),
	() => import("../../../src/routes/post/migrasi-ke-vim/+page.md"),
	() => import("../../../src/routes/post/spa-vs-mpa/+page.md")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/work-log.json/+server.js
	[/^\/work-log\.json\/%2Bserver\/?$/],

	// src/routes/posts.json/+server.js
	[/^\/posts\.json\/%2Bserver\/?$/],

	// src/routes/work-log/0001-sub-blog-tentang-pekerjaan/+page.md
	[/^\/work-log\/0001-sub-blog-tentang-pekerjaan\/%2Bpage\/?$/, [c[0], c[2]], [c[1]]],

	// src/routes/work-log/+page.js
	[/^\/work-log\/%2Bpage\/?$/],

	// src/routes/work-log/+page.svelte
	[/^\/work-log\/%2Bpage\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/+layout.svelte
	[/^\/%2Blayout\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/course/+page.svelte
	[/^\/course\/%2Bpage\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/social/+page.svelte
	[/^\/social\/%2Bpage\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/+page.js
	[/^\/%2Bpage\/?$/],

	// src/routes/+page.svelte
	[/^\/%2Bpage\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/talks/+page.svelte
	[/^\/talks\/%2Bpage\/?$/, [c[0], c[8]], [c[1]]],

	// src/routes/blog/+page.js
	[/^\/blog\/%2Bpage\/?$/],

	// src/routes/blog/+page.svelte
	[/^\/blog\/%2Bpage\/?$/, [c[0], c[9]], [c[1]]],

	// src/routes/post/optimasi-aset-berbasis-teks-untuk-performa-web-dengan-gzip-nginx/+page.md
	[/^\/post\/optimasi-aset-berbasis-teks-untuk-performa-web-dengan-gzip-nginx\/%2Bpage\/?$/, [c[0], c[10]], [c[1]]],

	// src/routes/post/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-1/+page.md
	[/^\/post\/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-1\/%2Bpage\/?$/, [c[0], c[11]], [c[1]]],

	// src/routes/post/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-2/+page.md
	[/^\/post\/laravel-realtime-notification-dengan-socketio-dan-nuxtjs-part-2\/%2Bpage\/?$/, [c[0], c[12]], [c[1]]],

	// src/routes/post/mengorganisir-api-call-di-nuxtjs-dengan-repository-pattern/+page.md
	[/^\/post\/mengorganisir-api-call-di-nuxtjs-dengan-repository-pattern\/%2Bpage\/?$/, [c[0], c[13]], [c[1]]],

	// src/routes/post/terselamatkan-oleh-startup-script-di-google-cloud-engine/+page.md
	[/^\/post\/terselamatkan-oleh-startup-script-di-google-cloud-engine\/%2Bpage\/?$/, [c[0], c[14]], [c[1]]],

	// src/routes/post/menentukan-teknologi-yang-tepat-sebelum-membuat-project/+page.md
	[/^\/post\/menentukan-teknologi-yang-tepat-sebelum-membuat-project\/%2Bpage\/?$/, [c[0], c[15]], [c[1]]],

	// src/routes/post/react-native-057-images-is-not-showing-on-generated-apk/+page.md
	[/^\/post\/react-native-057-images-is-not-showing-on-generated-apk\/%2Bpage\/?$/, [c[0], c[16]], [c[1]]],

	// src/routes/post/duplikasi-object-atau-array-dengan-benar-di-javascript/+page.md
	[/^\/post\/duplikasi-object-atau-array-dengan-benar-di-javascript\/%2Bpage\/?$/, [c[0], c[17]], [c[1]]],

	// src/routes/post/membuat-rbac-sendiri-menu-rendering-di-nuxtjs-part-3/+page.md
	[/^\/post\/membuat-rbac-sendiri-menu-rendering-di-nuxtjs-part-3\/%2Bpage\/?$/, [c[0], c[18]], [c[1]]],

	// src/routes/post/setup-https-ssl-di-nuxtjs-dan-laravel-dengan-nginx/+page.md
	[/^\/post\/setup-https-ssl-di-nuxtjs-dan-laravel-dengan-nginx\/%2Bpage\/?$/, [c[0], c[19]], [c[1]]],

	// src/routes/post/transforms-absolute-ke-relative-path-di-typescript/+page.md
	[/^\/post\/transforms-absolute-ke-relative-path-di-typescript\/%2Bpage\/?$/, [c[0], c[20]], [c[1]]],

	// src/routes/post/workshop-vuejs-basic-bersama-komunitas-surabayadev/+page.md
	[/^\/post\/workshop-vuejs-basic-bersama-komunitas-surabayadev\/%2Bpage\/?$/, [c[0], c[21]], [c[1]]],

	// src/routes/post/redirect-http-ke-https-dengan-htaccess-di-laravel/+page.md
	[/^\/post\/redirect-http-ke-https-dengan-htaccess-di-laravel\/%2Bpage\/?$/, [c[0], c[22]], [c[1]]],

	// src/routes/post/yank-or-copy-text-from-different-instances-of-vim/+page.md
	[/^\/post\/yank-or-copy-text-from-different-instances-of-vim\/%2Bpage\/?$/, [c[0], c[23]], [c[1]]],

	// src/routes/post/download-private-video-youtube-dengan-youtube-dl/+page.md
	[/^\/post\/download-private-video-youtube-dengan-youtube-dl\/%2Bpage\/?$/, [c[0], c[24]], [c[1]]],

	// src/routes/post/bagaimana-saya-mengatur-waktu-sebagai-developer/+page.md
	[/^\/post\/bagaimana-saya-mengatur-waktu-sebagai-developer\/%2Bpage\/?$/, [c[0], c[25]], [c[1]]],

	// src/routes/post/migrasi-blog-dari-vue-gridsome-ke-svelte-sapper/+page.md
	[/^\/post\/migrasi-blog-dari-vue-gridsome-ke-svelte-sapper\/%2Bpage\/?$/, [c[0], c[26]], [c[1]]],

	// src/routes/post/tdd-menggunakan-mocha-dan-chai-di-nodejs-part-1/+page.md
	[/^\/post\/tdd-menggunakan-mocha-dan-chai-di-nodejs-part-1\/%2Bpage\/?$/, [c[0], c[27]], [c[1]]],

	// src/routes/post/tdd-menggunakan-mocha-dan-chai-di-nodejs-part-2/+page.md
	[/^\/post\/tdd-menggunakan-mocha-dan-chai-di-nodejs-part-2\/%2Bpage\/?$/, [c[0], c[28]], [c[1]]],

	// src/routes/post/memproteksi-laravel-web-app-dari-serangan-csrf/+page.md
	[/^\/post\/memproteksi-laravel-web-app-dari-serangan-csrf\/%2Bpage\/?$/, [c[0], c[29]], [c[1]]],

	// src/routes/post/mini-workshop-speed-up-development-with-nuxtjs/+page.md
	[/^\/post\/mini-workshop-speed-up-development-with-nuxtjs\/%2Bpage\/?$/, [c[0], c[30]], [c[1]]],

	// src/routes/post/berkomunitaslah-dapatkan-dan-sebarkan-manfaat/+page.md
	[/^\/post\/berkomunitaslah-dapatkan-dan-sebarkan-manfaat\/%2Bpage\/?$/, [c[0], c[31]], [c[1]]],

	// src/routes/post/method-destroy-di-controller-laravel-5-part-8/+page.md
	[/^\/post\/method-destroy-di-controller-laravel-5-part-8\/%2Bpage\/?$/, [c[0], c[32]], [c[1]]],

	// src/routes/post/membuat-rbac-sendiri-backend-response-part-2/+page.md
	[/^\/post\/membuat-rbac-sendiri-backend-response-part-2\/%2Bpage\/?$/, [c[0], c[33]], [c[1]]],

	// src/routes/post/method-create-di-controller-laravel-5-part-3/+page.md
	[/^\/post\/method-create-di-controller-laravel-5-part-3\/%2Bpage\/?$/, [c[0], c[34]], [c[1]]],

	// src/routes/post/method-update-di-controller-laravel-5-part-7/+page.md
	[/^\/post\/method-update-di-controller-laravel-5-part-7\/%2Bpage\/?$/, [c[0], c[35]], [c[1]]],

	// src/routes/post/rest-api-dengan-nodejs-dan-typescript-part-1/+page.md
	[/^\/post\/rest-api-dengan-nodejs-dan-typescript-part-1\/%2Bpage\/?$/, [c[0], c[36]], [c[1]]],

	// src/routes/post/rest-api-dengan-nodejs-dan-typescript-part-2/+page.md
	[/^\/post\/rest-api-dengan-nodejs-dan-typescript-part-2\/%2Bpage\/?$/, [c[0], c[37]], [c[1]]],

	// src/routes/post/rest-api-dengan-nodejs-dan-typescript-part-3/+page.md
	[/^\/post\/rest-api-dengan-nodejs-dan-typescript-part-3\/%2Bpage\/?$/, [c[0], c[38]], [c[1]]],

	// src/routes/post/menampilkan-data-polymorphic-tanpa-eloquent/+page.md
	[/^\/post\/menampilkan-data-polymorphic-tanpa-eloquent\/%2Bpage\/?$/, [c[0], c[39]], [c[1]]],

	// src/routes/post/method-index-di-controller-laravel-5-part-2/+page.md
	[/^\/post\/method-index-di-controller-laravel-5-part-2\/%2Bpage\/?$/, [c[0], c[40]], [c[1]]],

	// src/routes/post/method-store-di-controller-laravel-5-part-4/+page.md
	[/^\/post\/method-store-di-controller-laravel-5-part-4\/%2Bpage\/?$/, [c[0], c[41]], [c[1]]],

	// src/routes/post/install-nerdtree-dan-colorscheme-di-neovim/+page.md
	[/^\/post\/install-nerdtree-dan-colorscheme-di-neovim\/%2Bpage\/?$/, [c[0], c[42]], [c[1]]],

	// src/routes/post/membersihkan-disk-usage-pada-ubuntu-server/+page.md
	[/^\/post\/membersihkan-disk-usage-pada-ubuntu-server\/%2Bpage\/?$/, [c[0], c[43]], [c[1]]],

	// src/routes/post/method-edit-di-controller-laravel-5-part-6/+page.md
	[/^\/post\/method-edit-di-controller-laravel-5-part-6\/%2Bpage\/?$/, [c[0], c[44]], [c[1]]],

	// src/routes/post/method-show-di-controller-laravel-5-part-5/+page.md
	[/^\/post\/method-show-di-controller-laravel-5-part-5\/%2Bpage\/?$/, [c[0], c[45]], [c[1]]],

	// src/routes/post/cara-mudah-mengurus-atau-membuat-passport/+page.md
	[/^\/post\/cara-mudah-mengurus-atau-membuat-passport\/%2Bpage\/?$/, [c[0], c[46]], [c[1]]],

	// src/routes/post/react-native-state-management-dengan-remx/+page.md
	[/^\/post\/react-native-state-management-dengan-remx\/%2Bpage\/?$/, [c[0], c[47]], [c[1]]],

	// src/routes/post/fokus-sangat-membantu-kita-saat-ngoding/+page.md
	[/^\/post\/fokus-sangat-membantu-kita-saat-ngoding\/%2Bpage\/?$/, [c[0], c[48]], [c[1]]],

	// src/routes/post/install-dan-akses-remote-mariadb-di-vps/+page.md
	[/^\/post\/install-dan-akses-remote-mariadb-di-vps\/%2Bpage\/?$/, [c[0], c[49]], [c[1]]],

	// src/routes/post/jangan-dibuka-nanti-jadi-lemot-44440000/+page.md
	[/^\/post\/jangan-dibuka-nanti-jadi-lemot-44440000\/%2Bpage\/?$/, [c[0], c[50]], [c[1]]],

	// src/routes/post/memajukan-komunitas-di-webunconfid-2018/+page.md
	[/^\/post\/memajukan-komunitas-di-webunconfid-2018\/%2Bpage\/?$/, [c[0], c[51]], [c[1]]],

	// src/routes/post/docker-compose-postgresql-dan-pgadmin4/+page.md
	[/^\/post\/docker-compose-postgresql-dan-pgadmin4\/%2Bpage\/?$/, [c[0], c[52]], [c[1]]],

	// src/routes/post/mencoba-archlinux-dengan-endeavouros/+page.md
	[/^\/post\/mencoba-archlinux-dengan-endeavouros\/%2Bpage\/?$/, [c[0], c[53]], [c[1]]],

	// src/routes/post/migrasi-dari-dynamic-ke-static-blog/+page.md
	[/^\/post\/migrasi-dari-dynamic-ke-static-blog\/%2Bpage\/?$/, [c[0], c[54]], [c[1]]],

	// src/routes/post/programmer-adalah-pembelajar-sejati/+page.md
	[/^\/post\/programmer-adalah-pembelajar-sejati\/%2Bpage\/?$/, [c[0], c[55]], [c[1]]],

	// src/routes/post/tips-dan-trik-array-pada-javascript/+page.md
	[/^\/post\/tips-dan-trik-array-pada-javascript\/%2Bpage\/?$/, [c[0], c[56]], [c[1]]],

	// src/routes/post/membuat-rbac-sendiri-konsep-part-1/+page.md
	[/^\/post\/membuat-rbac-sendiri-konsep-part-1\/%2Bpage\/?$/, [c[0], c[57]], [c[1]]],

	// src/routes/post/mengenal-route-di-laravel-5-part-1/+page.md
	[/^\/post\/mengenal-route-di-laravel-5-part-1\/%2Bpage\/?$/, [c[0], c[58]], [c[1]]],

	// src/routes/post/mengenal-route-di-laravel-5-part-2/+page.md
	[/^\/post\/mengenal-route-di-laravel-5-part-2\/%2Bpage\/?$/, [c[0], c[59]], [c[1]]],

	// src/routes/post/berkenalan-lebih-dekat-dengan-pwa/+page.md
	[/^\/post\/berkenalan-lebih-dekat-dengan-pwa\/%2Bpage\/?$/, [c[0], c[60]], [c[1]]],

	// src/routes/post/menggunakan-knexjs-di-express-app/+page.md
	[/^\/post\/menggunakan-knexjs-di-express-app\/%2Bpage\/?$/, [c[0], c[61]], [c[1]]],

	// src/routes/post/mengenal-middleware-di-laravel-5/+page.md
	[/^\/post\/mengenal-middleware-di-laravel-5\/%2Bpage\/?$/, [c[0], c[62]], [c[1]]],

	// src/routes/post/jabber-xmpp-menggunakan-nodejs/+page.md
	[/^\/post\/jabber-xmpp-menggunakan-nodejs\/%2Bpage\/?$/, [c[0], c[63]], [c[1]]],

	// src/routes/post/membangun-komunitas-surabayajs/+page.md
	[/^\/post\/membangun-komunitas-surabayajs\/%2Bpage\/?$/, [c[0], c[64]], [c[1]]],

	// src/routes/post/menyematkan-data-pada-vue-slot/+page.md
	[/^\/post\/menyematkan-data-pada-vue-slot\/%2Bpage\/?$/, [c[0], c[65]], [c[1]]],

	// src/routes/post/pengenalan-dasar-tentang-lumen/+page.md
	[/^\/post\/pengenalan-dasar-tentang-lumen\/%2Bpage\/?$/, [c[0], c[66]], [c[1]]],

	// src/routes/post/groupby-array-pada-javascript/+page.md
	[/^\/post\/groupby-array-pada-javascript\/%2Bpage\/?$/, [c[0], c[67]], [c[1]]],

	// src/routes/post/manfaat-dari-berpikir-negatif/+page.md
	[/^\/post\/manfaat-dari-berpikir-negatif\/%2Bpage\/?$/, [c[0], c[68]], [c[1]]],

	// src/routes/post/how-to-setup-my-personal-vim/+page.md
	[/^\/post\/how-to-setup-my-personal-vim\/%2Bpage\/?$/, [c[0], c[69]], [c[1]]],

	// src/routes/post/setup-vim-devicons-di-neovim/+page.md
	[/^\/post\/setup-vim-devicons-di-neovim\/%2Bpage\/?$/, [c[0], c[70]], [c[1]]],

	// src/routes/post/konfigurasi-dasar-laravel-5/+page.md
	[/^\/post\/konfigurasi-dasar-laravel-5\/%2Bpage\/?$/, [c[0], c[71]], [c[1]]],

	// src/routes/post/struktur-folder-laravel-55/+page.md
	[/^\/post\/struktur-folder-laravel-55\/%2Bpage\/?$/, [c[0], c[72]], [c[1]]],

	// src/routes/post/goodbye-mobx-welcome-remx/+page.md
	[/^\/post\/goodbye-mobx-welcome-remx\/%2Bpage\/?$/, [c[0], c[73]], [c[1]]],

	// src/routes/post/surabayajs-meetup-perdana/+page.md
	[/^\/post\/surabayajs-meetup-perdana\/%2Bpage\/?$/, [c[0], c[74]], [c[1]]],

	// src/routes/post/setup-vim-plug-di-neovim/+page.md
	[/^\/post\/setup-vim-plug-di-neovim\/%2Bpage\/?$/, [c[0], c[75]], [c[1]]],

	// src/routes/post/surabayajs-meetup-ketiga/+page.md
	[/^\/post\/surabayajs-meetup-ketiga\/%2Bpage\/?$/, [c[0], c[76]], [c[1]]],

	// src/routes/post/berkenalan-dengan-pugjs/+page.md
	[/^\/post\/berkenalan-dengan-pugjs\/%2Bpage\/?$/, [c[0], c[77]], [c[1]]],

	// src/routes/post/berkenalan-dengan-vuejs/+page.md
	[/^\/post\/berkenalan-dengan-vuejs\/%2Bpage\/?$/, [c[0], c[78]], [c[1]]],

	// src/routes/post/manfaat-menggunakan-pwa/+page.md
	[/^\/post\/manfaat-menggunakan-pwa\/%2Bpage\/?$/, [c[0], c[79]], [c[1]]],

	// src/routes/post/surabayajs-meetup-kedua/+page.md
	[/^\/post\/surabayajs-meetup-kedua\/%2Bpage\/?$/, [c[0], c[80]], [c[1]]],

	// src/routes/post/vim-keyboard-cheatsheet/+page.md
	[/^\/post\/vim-keyboard-cheatsheet\/%2Bpage\/?$/, [c[0], c[81]], [c[1]]],

	// src/routes/post/momentjs-dengan-nuxtjs/+page.md
	[/^\/post\/momentjs-dengan-nuxtjs\/%2Bpage\/?$/, [c[0], c[82]], [c[1]]],

	// src/routes/post/setting-vhost-di-nginx/+page.md
	[/^\/post\/setting-vhost-di-nginx\/%2Bpage\/?$/, [c[0], c[83]], [c[1]]],

	// src/routes/post/auth-module-di-nuxtjs/+page.md
	[/^\/post\/auth-module-di-nuxtjs\/%2Bpage\/?$/, [c[0], c[84]], [c[1]]],

	// src/routes/post/perubahan-jam-tidur/+page.md
	[/^\/post\/perubahan-jam-tidur\/%2Bpage\/?$/, [c[0], c[85]], [c[1]]],

	// src/routes/post/migrasi-ke-vim/+page.md
	[/^\/post\/migrasi-ke-vim\/%2Bpage\/?$/, [c[0], c[86]], [c[1]]],

	// src/routes/post/spa-vs-mpa/+page.md
	[/^\/post\/spa-vs-mpa\/%2Bpage\/?$/, [c[0], c[87]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];