# Aplikasi Mobile Bekam balikpapan

## Development

### Requirements

- nodejs lts terbaru
- pnpm
- install aplikasi expo go di perangkat mobile
- expo-cli
- eas-cli & akun eas

### install dependencies

Aplikasi ini dijalankan mengggunakan pnpm, bila pnpm belum terinstall silakan install pnpm terlebih dahulu. Apabila pnpm sudah terinstall silakan jalankan perintah berikut untuk menginstall dependencies

- `pnpm install`

### run development

Untuk melakukan development, aplikasi ini membutuhkan aplikasi `expo go` yang telah diinstall di perangkat mobile. Silakan buka aplikasi expo go di perangkat mobile dan scan qr code yang ada di terminal. Lakukan tahapan berikut untuk melakukan development :

- buka folder project bekambalikpapan dengan VSCode
- buka terminal VSCode
- jalankan perintah `pnpm start`
- akan muncul qr code
- buka aplikasi expo go di perangkat mobile dan scan qr code

### bahasa yang digunakan

Aplikasi ini menggunakan react-native expo, dan typescript. Semua component yang digunakan adalah component yang dibuat sendiri. lokasi component tersebut berada di folder `src/components`. Semua screen yang ada di aplikasi ini berada di folder `src/screens`.

## Build aplikasi

Untuk membuat build aplikasi ke file apk, dibutuhkan akun eas. Silakan buat akun eas di [https://expo.dev/accounts](https://expo.dev/accounts) kemudian jalankan perintah berikut

- `eas-login`: untuk login ke akun eas
- `eas build -p android --profile=preview`: untuk membuat build apk
