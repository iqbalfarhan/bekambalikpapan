# Aplikasi Mobile Bekam balikpapan

## Development

### 1. Requirements

- node.js lts terbaru
- pnpm
- install aplikasi expo go di perangkat mobile
- expo-cli
- eas-cli & akun eas

### 2. Menginstall dependencies

Aplikasi ini dijalankan mengggunakan pnpm, bila pnpm belum terinstall silakan install pnpm terlebih dahulu. Apabila pnpm sudah terinstall silakan jalankan perintah berikut untuk menginstall dependencies

- `pnpm install`

### 3. Menjalankan development

Untuk melakukan development, aplikasi ini membutuhkan aplikasi `expo go` yang telah diinstall di perangkat mobile. Silakan buka aplikasi expo go di perangkat mobile dan scan qr code yang ada di terminal. Lakukan tahapan berikut untuk melakukan development :

- buka folder project bekambalikpapan dengan VSCode
- buka terminal VSCode
- jalankan perintah `pnpm start`
- akan muncul qr code
- buka aplikasi expo go di perangkat mobile dan scan qr code

### 4. Bahasa yang digunakan

Aplikasi ini menggunakan react-native expo, dan typescript. Semua component yang digunakan adalah component yang dibuat sendiri. lokasi component tersebut berada di folder `src/components`. Semua screen yang ada di aplikasi ini berada di folder `src/screens`.

## Build Aplikasi

## 1. Sebelum Build Aplikasi

Lakukan langkah berikut ini untuk memastikan aplikasi siap untuk di build:

- `pnpx expo install --check`: mengecek apakah ada dependensi yang belum terinstall dan butuh untuk di update. apabila ada peringatan, silakan ikuti perintah yang diberikan. biasanya ketik `Y` untuk melanjutkan install dependency yang dibutuhkan.
- `pnpx expo-doctor`: untuk mengecek dependensi yang dibutuhkan untuk build aplikasi.

## 2. Memulai Build Aplikasi

Untuk membuat build aplikasi ke file apk, dibutuhkan akun eas. Silakan buat akun eas di [https://expo.dev/accounts](https://expo.dev/accounts) kemudian jalankan perintah berikut

- `eas-login`: untuk login ke akun eas
- `eas build -p android --profile=preview`: untuk membuat build apk

## 3. Setelah Build Aplikasi

eas akan memberikan link untuk download apk yang telah dibuat. Silakan download apk tersebut dan install di perangkat mobile.
